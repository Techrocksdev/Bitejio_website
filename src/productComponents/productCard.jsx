import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  addToCart,
  updateCartQuantity,
} from "../apiServices/home/homeHttpService";
import { RotatingLines } from "react-loader-spinner";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { useUserAuth } from "../commonComponents/authContext";
import { createPortal } from "react-dom";

function ProductCard({ item, refetch2, home }) {
  const [variantId, setVariantId] = useState("");
  const [loader, setLoader] = useState(false);
  const { token, refetch } = useUserAuth();

  // const flyToCart = (imageUrl) => {
  //   const productImg = document.querySelector(`#product-img-${item._id}`);
  //   const cartIcon = document.querySelector(".addToCart");

  //   if (!productImg || !cartIcon) {
  //     console.log("Product image or cart icon not found");
  //     return;
  //   }

  //   const productRect = productImg.getBoundingClientRect();
  //   const cartRect = cartIcon.getBoundingClientRect();
  //   const flyingImg = document.createElement("img");
  //   flyingImg.src = imageUrl;
  //   flyingImg.style.cssText = `
  //     position: fixed;
  //     width: 80px;
  //     height: 80px;
  //     object-fit: cover;
  //     border-radius: 8px;
  //     z-index: 9999;
  //     left: ${productRect.left}px;
  //     top: ${productRect.top}px;
  //     transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  //     pointer-events: none;
  //     box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  //   `;

  //   document.body.appendChild(flyingImg);

  //   setTimeout(() => {
  //     flyingImg.style.left = `${cartRect.left}px`;
  //     flyingImg.style.top = `${cartRect.top}px`;
  //     flyingImg.style.width = "40px";
  //     flyingImg.style.height = "40px";
  //     flyingImg.style.opacity = "0";
  //   }, 50);
  //   setTimeout(() => {
  //     if (document.body.contains(flyingImg)) {
  //       document.body.removeChild(flyingImg);
  //     }
  //   }, 900);
  // };

  const addCart = async () => {
    if (!variantId) {
      showGlobalAlert("Please select combination", "error");
      return;
    }
    setLoader(true);
    const formData = {
      productId: item._id,
      variantId: variantId,
      quantity: 1,
    };
    try {
      const response = await addToCart(formData);
      if (!response.error) {
        document
          .querySelector(`#cartModal${item._id} [data-bs-dismiss="modal"]`)
          .click();
        document.getElementById(`closeWarn${item._id}`)?.click();
        setVariantId("");
        showGlobalAlert(response.message, "success");
        Promise.all([refetch(), refetch2()]);
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    } finally {
      setLoader(false);
    }
  };

  const updateQuantity = async (item, change, e) => {
    e.preventDefault();

    const newQuantity = item.cartQuantity + change;

    if (newQuantity < 0) return;

    const formData = {
      productId: item._id,
      variantId: item.variant._id,
      quantity: newQuantity,
    };

    try {
      const response = await updateCartQuantity(formData);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        await Promise.all([refetch(), refetch2()]);
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    }
  };

  const cartModalContent = (
    <div
      className="modal fade"
      id={`cartModal${item?._id}`}
      tabIndex={-1}
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-heading m-0">Customise as per your taste</h2>
          </div>

          <div className="modal-body">
            <div className="list-group">
              {item?.variants?.map((itm) => (
                <label
                  key={itm._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <input
                      className="form-check-input me-2"
                      type="radio"
                      name={`variant-${item._id}`}
                      onChange={() => setVariantId(itm._id)}
                      checked={variantId === itm._id}
                    />
                    {itm?.combination?.[0]?.attributeId?.name_en} (
                    {itm?.combination?.[0]?.valueId?.name_en})
                  </div>
                  <span>
                    <del>₹{itm.price}</del>{" "}
                    <strong className="fw-bold ms-1">
                      ₹{itm.discountPrice}
                    </strong>
                  </span>
                </label>
              ))}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                className="btn btn-light border"
                data-bs-dismiss="modal"
                onClick={() => setVariantId("")}
              >
                Cancel
              </button>
              {item.hasDifferentMerchantInCart ? (
                <button
                  className="comman-btn-main"
                  onClick={() => {
                    if (!variantId) {
                      showGlobalAlert("Please select combination", "error");
                      return;
                    }
                    document.getElementById(`warnClick${item._id}`).click();
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  className="comman-btn-main"
                  onClick={() => addCart()}
                  disabled={loader}
                >
                  {loader ? (
                    <>
                      <span className="me-2">Wait...</span>
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                      />
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const warnModalContent = (
    <div
      className="modal fade logoutmodal"
      id={`Warn${item._id}`}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="paymentmodal_main text-center">
              <div className="payment_head mb-3 mt-1">
                <h2>Oops!</h2>
                <p>
                  Your cart already contains items from a different merchant. To
                  add this item, you'll need to clear your existing cart.
                </p>
              </div>
              <div className="row justify-content-center mb-2">
                <div className="col-auto">
                  <button className="comman-btn-main" onClick={() => addCart()}>
                    Add to Cart
                  </button>
                </div>
                <div className="col-auto">
                  <Link
                    id={`closeWarn${item._id}`}
                    className="comman-btn-main white"
                    data-bs-dismiss="modal"
                    to=""
                    onClick={() => {
                      const cartModalEl = document.getElementById(
                        `cartModal${item._id}`,
                      );
                      const cartModal =
                        window.bootstrap?.Modal?.getInstance(cartModalEl);
                      if (cartModal) cartModal.hide();
                      setVariantId("");
                    }}
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div key={item?._id} className={home ? "" : "col-md-4 col-lg-4 col-xl-4"}>
        <div>
          <div
            className="custom-card wow animate__animated animate__fadeInUp"
            data-wow-delay="0.2s"
          >
            <div className="custom-card-header">
              <Link to={`/product-details/${item?._id}`}>
                <img
                  id={`product-img-${item._id}`}
                  src={item?.images?.[0]}
                  alt=""
                />
              </Link>
            </div>
            <div className="custom-card-body">
              <h2>{item?.name_en}</h2>
              <div className="d-flex gap-2 align-items-center">
                <img
                  src="../assets/image/icons/Star.svg"
                  className="star"
                  alt=""
                />
                <p className="text">4.8</p>
                <p className="text">{item.userId?.shopName}</p>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <img src="../assets/image/icons/watch.svg" alt="" />
                    <p className="text">30-40 min</p>
                  </div>
                  {token ? (
                    item?.isAddedInCart && item.cartQuantity > 0 ? (
                      <div className="d-flex align-items-center">
                        <div className="add-btn">
                          <button
                            onClick={(e) => updateQuantity(item, -1, e)}
                            disabled={item?.cartQuantity <= 0}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <button>{item?.cartQuantity}</button>
                          <button onClick={(e) => updateQuantity(item, 1, e)}>
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="comman-btn-main w-fit"
                        data-bs-toggle="modal"
                        data-bs-target={`#cartModal${item?._id}`}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="d-flex gap-2 align-items-center h-100">
                          <img src="../assets/image/icons/plus.svg" alt="" />
                          Add
                        </div>
                      </button>
                    )
                  ) : (
                    <button
                      className="comman-btn-main w-fit"
                      data-bs-toggle="modal"
                      data-bs-target="#addressModal"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="d-flex gap-2 align-items-center h-100">
                        <img src="../assets/image/icons/plus.svg" alt="" />
                        Add
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {createPortal(cartModalContent, document.body)}
      {createPortal(warnModalContent, document.body)}

      <div
        className="d-none"
        id={`warnClick${item._id}`}
        data-bs-toggle="modal"
        data-bs-target={`#Warn${item._id}`}
      ></div>
    </>
  );
}

export default React.memo(ProductCard);
