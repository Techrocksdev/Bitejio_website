import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useQuery } from "@tanstack/react-query";
import {
  getMyCart,
  removeFromCart,
  updateCartQuantity,
} from "../apiServices/home/homeHttpService";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Cart() {
  const {
    data: cart,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cartList"],
    queryFn: getMyCart,
    select: (data) => data.results.carts[0],
  });
  console.log(cart);

  const removeProduct = async (productId, variantId) => {
    const formData = {
      productId: productId,
      variantId: variantId,
    };
    console.log(formData);
    try {
      const response = await removeFromCart(formData);
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

  const updateQuantity = async (item, change) => {
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) return;

    const formData = {
      productId: item.productId._id,
      variantId: item.variantId._id,
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
      <Header />

      <section className="checkout">
        <div className="container comman-spacing-top-bottom">
          <h2 className="heading">Checkout</h2>
          <div className="comman-spacing-top-bottom">
            {cart?.products?.length || isLoading ? (
              <div className="row">
                <div className="col-md-7 col-lg-8">
                  <div className="rounded-3 bg-white overflow-hidden px-2 py-2">
                    {isLoading
                      ? [...Array(5)].map((_, index) => (
                          <div
                            key={index}
                            className="cart-item d-flex align-items-center justify-content-between mb-3"
                          >
                            <div className="col-12 col-md-7 col-lg-6 d-flex align-items-center gap-2">
                              <div className="cart-img">
                                <Skeleton />
                              </div>
                              <div className="w-100">
                                <h6 className="product-heading">
                                  <Skeleton style={{ width: "100%" }} />
                                </h6>
                                <small className="text-muted">
                                  <Skeleton style={{ width: "100%" }} />
                                </small>
                                <p className="fw-bold mb-0 mt-2">
                                  {" "}
                                  <Skeleton style={{ width: "100%" }} />
                                </p>
                              </div>
                            </div>
                            <div className="col-12 col-md-5 col-lg-6 d-flex align-items-center justify-content-end gap-2">
                              <div className="w-100 text-end">
                                {" "}
                                <Skeleton
                                  height={40}
                                  style={{ width: "30%" }}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : cart?.products?.map((item) => (
                          <div
                            key={item?.productId?.productId}
                            className="cart-item d-flex align-items-center justify-content-between mb-3"
                          >
                            <div className="col-12 col-md-7 col-lg-6 d-flex align-items-center gap-2">
                              <div className="cart-img">
                                <img
                                  src={item?.productId?.images?.[0]}
                                  className="rounded"
                                  alt={item?.productId?.images?.[0]}
                                />
                              </div>
                              <div>
                                <h6 className="product-heading">
                                  {item.productId.name_en}
                                </h6>
                                <small className="text-muted">
                                  Royal Kitchen
                                </small>
                                <p className="fw-bold mb-0 mt-2">₹110</p>
                              </div>
                            </div>
                            <div className="col-12 col-md-5 col-lg-6 d-flex align-items-center justify-content-end gap-2">
                              <div className="add-btn">
                                <button
                                  onClick={() => updateQuantity(item, -1)}
                                  disabled={item?.quantity <= 1}
                                >
                                  -
                                </button>
                                <button>{item?.quantity}</button>
                                <button onClick={() => updateQuantity(item, 1)}>
                                  +
                                </button>
                              </div>
                              <div
                                onClick={() =>
                                  removeProduct(
                                    item.productId._id,
                                    item.variantId._id
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src="assets/image/icons/Trash.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    {isLoading ? (
                      ""
                    ) : (
                      <div className="mt-4">
                        <div className="border-top pt-3">
                          {/* Coupon */}
                          <div className="coupon-card">
                            <div className="row g-3">
                              <di className="col-9">
                                <div className="coupon-input">
                                  <input type="text" className="form-control" />
                                  <img
                                    src="assets/image/icons/percentage.svg"
                                    className="icon"
                                    alt=""
                                  />
                                </div>
                              </di>
                              <di className="col-3">
                                <button className="comman-btn-main">
                                  Apply
                                </button>
                              </di>
                            </div>
                            <Link
                              to=""
                              className="view-all gap-2 mt-3 d-flex justify-content-center align-items-center"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#couponOffcanvas"
                              aria-controls="couponOffcanvas"
                            >
                              View all coupon
                              <img
                                src="assets/image/icons/CaretRight-main.svg"
                                alt=""
                              />
                            </Link>
                          </div>
                        </div>
                        {/* Bill Details */}
                        <div className="bill-details mt-3">
                          <h2 className="heading">Bill details</h2>
                          <p className="d-flex justify-content-between mb-1">
                            <span>Subtotal</span> <span>₹220</span>
                          </p>
                          <p className="d-flex justify-content-between mb-1">
                            <span>Taxes &amp; Charges</span> <span>₹15</span>
                          </p>
                          <p className="d-flex justify-content-between mb-3">
                            <span>Delivery Charges</span> <span>₹20</span>
                          </p>
                          <h6 className="d-flex justify-content-between fw-bold">
                            <span>Total Payable</span> <span>₹235</span>
                          </h6>
                        </div>
                      </div>
                    )}
                  </div>
                  {isLoading ? (
                    ""
                  ) : (
                    <div className="mt-3">
                      <div className="rounded-3 bg-white overflow-hidden px-3 py-3">
                        <h2 className="heading">Delivery Address</h2>
                        <div className="address">
                          <div className="d-flex gap-2">
                            <input
                              type="radio"
                              defaultChecked
                              className="custom-radio"
                            />
                            <div className>
                              <div className="d-flex gap-2 align-items-center">
                                Home
                                <img
                                  src="assets/image/icons/HouseLine.svg"
                                  alt=""
                                />
                              </div>
                              B block Street no. 10, Surajmal vihar, delhi
                              110092
                            </div>
                          </div>
                          <div className="edit">
                            Edit
                            <img src="assets/image/icons/bxs_edit.svg" alt="" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="add-new-address">
                            <img
                              src="assets/image/icons/Plus-gray.svg"
                              alt=""
                            />
                            Add New Address
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {isLoading ? (
                  <div className="col-md-5 col-lg-4">
                    <div className="rounded-3 bg-white overflow-hidden px-3 py-4">
                      <h2>
                        <Skeleton />
                      </h2>
                      <h2 className="mt-3">
                        <Skeleton />
                      </h2>
                      <h2 className="mt-3">
                        <Skeleton />
                      </h2>
                      <h2 className="mt-3">
                        <Skeleton />
                      </h2>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-5 col-lg-4">
                    <div className="rounded-3 bg-white overflow-hidden px-3 py-4">
                      <h2>Payment Option</h2>
                      <div className="payment-option active mt-4">
                        <div className="d-flex gap-3">
                          <input
                            type="radio"
                            defaultChecked
                            className="custom-radio"
                          />
                          <div className>Pay 20% Now, Rest on Delivery</div>
                        </div>
                      </div>
                      <div className="payment-option mt-4">
                        <div className="d-flex gap-3">
                          <input type="radio" className="custom-radio" />
                          <div className>Pay 100% Online</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <a
                          href="order-confirmed.html"
                          className="d-block comman-btn-main w-100"
                        >
                          Pay now
                        </a>
                      </div>
                      <div className="mt-3">
                        <div className="secure-payment-card">
                          <div className="d-flex gap-2">
                            <img
                              src="assets/image/icons/sheild-green.svg"
                              alt=""
                            />
                            <div>
                              <p className="m-0 fw-semibold">Secure Payment</p>
                              <p className="m-0">
                                Your payment information is encrypted and secure
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-3 no-data mx-auto d-flex flex-column justify-content-center align-items-center">
                <img
                  src="../assets/image/products/noData.avif"
                  alt="nodata"
                  loading="lazy"
                />
                <h1>Your cart is empty</h1>
                <p>You can go to home page to view more products</p>
                <Link className="comman-btn-main" to="/">
                  Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="couponOffcanvas"
        aria-labelledby="couponOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 id="couponOffcanvasLabel">All Coupons</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="coupon-list">
            {/* Example Coupon */}
            <div className="coupon-item">
              <div className="coupon-card p-0 bg-transparent">
                <div className="row g-3">
                  <di className="col-8">
                    <div className="coupon-input">
                      <input type="text" className="form-control" />
                      <img
                        src="assets/image/icons/percentage.svg"
                        className="icon"
                        alt=""
                      />
                    </div>
                  </di>
                  <di className="col-4">
                    <button className="comman-btn-main">Apply</button>
                  </di>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="heading">Available offers</h2>
                <div className="mt-4">
                  <div className="coupon-card-items">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 align-items-center">
                        <img src="assets/image/icons/percentage.svg" alt="" />
                        <div className="offer">SAVE20</div>
                      </div>
                      <p className="apply">Apply</p>
                    </div>
                    <div className="mt-3">
                      <p className="save">You save ₹50</p>
                      <p className="percentage-offer-dis">
                        5% off entire order on minimum of ₹200
                      </p>
                    </div>
                  </div>
                  <div className="coupon-card-items">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 align-items-center">
                        <img src="assets/image/icons/percentage.svg" alt="" />
                        <div className="offer">SAVE20</div>
                      </div>
                      <p className="apply">Apply</p>
                    </div>
                    <div className="mt-3">
                      <p className="save">You save ₹50</p>
                      <p className="percentage-offer-dis">
                        5% off entire order on minimum of ₹200
                      </p>
                    </div>
                  </div>
                  <div className="coupon-card-items">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2 align-items-center">
                        <img src="assets/image/icons/percentage.svg" alt="" />
                        <div className="offer">SAVE20</div>
                      </div>
                      <p className="apply">Apply</p>
                    </div>
                    <div className="mt-3">
                      <p className="save">You save ₹50</p>
                      <p className="percentage-offer-dis">
                        5% off entire order on minimum of ₹200
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="addressModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5 fw-semibold">
                Enter Delivery Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                {/* Left Side Form */}
                <div className="col-md-6">
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="House No, Flat, Building Name"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Area, Sector, Locality"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nearby Landmark"
                      />
                    </div>
                    <h6>Your Details</h6>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <h6>Save Address As</h6>
                    <div className="save-btns mb-3">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm btn-active"
                      >
                        Home
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Work
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Other
                      </button>
                    </div>
                    <a
                      href="checkout.html"
                      className="comman-btn-main w-100 mt-4 d-block"
                    >
                      Continue
                    </a>
                  </form>
                </div>
                {/* Right Side Map */}
                <div className="col-md-6">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control mb-2 ps-4"
                      placeholder="B block Street no. 10, Surajmal vihar"
                    />
                    <img
                      src="assets/image/icons/MagnifyingGlass.svg"
                      className="position-absolute top-50 translate-y-middle start-0 ms-1"
                      alt=""
                    />
                  </div>
                  <div className>
                    <img
                      src="assets/image/bg/map.png"
                      className="w-100 h-100"
                      alt=""
                    />
                  </div>
                  <div className="bg-light-main px-2 py-1 rounded mt-4">
                    <div className="d-flex gap-2">
                      <img
                        src="assets/image/icons/MapPinSimpleArea.svg"
                        alt=""
                      />
                      <div>
                        <small className="text-dark fw-semibold">
                          B block Street no. 10, Surajmal vi...
                        </small>
                        <br />
                        <small className="text-light fw-normal">
                          Surajmal vihar
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Cart);
