import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  addToCart,
  updateCartQuantity,
} from "../apiServices/home/homeHttpService";
import { RotatingLines } from "react-loader-spinner";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";

function ProductCard({ item, refetch, home }) {
  const [variantId, setVariantId] = useState("");
  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem("token-bit-user");

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
        showGlobalAlert(response.message, "success");
        refetch();
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

    const newQuantity = item.quantity + change;

    if (newQuantity < 1) return;

    const formData = {
      productId: item._id,
      variantId: item.variant._id,
      quantity: newQuantity,
    };

    try {
      const response = await updateCartQuantity(formData);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        refetch();
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    }
  };

  return (
    <>
      <div
        key={item?._id}
        className={home ? "me-4" : "col-md-4 col-lg-4 col-xl-4"}
      >
        <Link to={`/product-details/${item?._id}`}>
          <div
            className="custom-card wow animate__animated animate__fadeInUp"
            data-wow-delay="0.2s"
          >
            <div className="custom-card-header">
              <img src={item?.images?.[0]} alt="" />
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
                    item?.isAddedInCart && item.quantity > 0 ? (
                      <div className="d-flex align-items-center">
                        <div className="add-btn">
                          <button
                            onClick={(e) => updateQuantity(item, -1, e)}
                            disabled={item?.quantity <= 0}
                          >
                            -
                          </button>
                          <button>{item?.quantity}</button>
                          <button onClick={(e) => updateQuantity(item, 1, e)}>
                            +
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
                      data-bs-target="#login"
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
        </Link>
      </div>

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
                        name={itm._id}
                        onChange={() => setVariantId(itm._id)}
                        checked={variantId === itm._id}
                      />
                      {itm?.combination?.[0]?.attributeId?.name_en} (
                      {itm?.combination?.[0]?.valueId?.name_en})
                    </div>
                    <span className="fw-bold">₹{itm.price}</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(ProductCard);
