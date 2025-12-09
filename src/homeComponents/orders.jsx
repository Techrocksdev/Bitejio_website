import React from "react";
import Footer from "./footer";
import Header from "./header";
import { useUserAuth } from "../commonComponents/authContext";
import { Link } from "react-router-dom";

function Orders() {
  const { profile } = useUserAuth();
  return (
    <>
      <Header />
      <section className="my-order">
        <div className="container">
          <div className="comman-spacing-top-bottom">
            <h2 className="heading fw-medium">
              Welcome{profile?.firstName ? "," : ""}{" "}
              <span className="fw-semibold">
                {profile?.firstName} {profile?.lastName}
              </span>
            </h2>
            <div className="mt-4">
              <div className="bg-white border shadow rounded-3 px-4 py-3">
                <div className="row">
                  <div className="col-md-3 vh-100 d-none d-lg-block">
                    <div className="my-link-wrapper">
                      <Link to="/my-orders" className="link-item active">
                        <img src="assets/image/icons/Cart.svg" alt="" />
                        <span>My Orders</span>
                      </Link>
                      <Link to="/my-profile" className="link-item">
                        <img src="assets/image/icons/UserCircle.svg" alt="" />
                        <span>Profile</span>
                      </Link>
                      <Link to="/my-addresses" className="link-item ">
                        <i
                          class="fas fa-location me-3"
                          style={{ color: "#727272" }}
                        ></i>
                        <span>Addresses</span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-lg-9 border-lg-start">
                    <div className=" px-1 py-3 px-md-4 py-md-4">
                      <h2 className="heading">My Orders</h2>
                      <div className="mt-4">
                        <h2 className="fs-6 fw-normal">Current Order</h2>
                        <div className="mt-4 border rounded-3 px-1 py-2 px-md-3 py-md-3">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex gap-3 align-items-center flex-wrap">
                              <h2 className="fs-6 fw-medium m-0">
                                Order Ongoing
                              </h2>
                              <p className="fs-6 fw-normal text-main m-0">
                                Estimated Delivery:{" "}
                                <span className="fw-semibold">26 min 42</span>
                              </p>
                            </div>
                            <div className="d-flex justify-content-end gap-2 align-items-center">
                              <h2 className="fs-6 fw-semibold ">2 items </h2>
                              <h2 className="fs-6 fw-semibold dot text text-dark">
                                Rs. 235
                              </h2>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="cart-item d-flex align-items-center justify-content-between mb-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="cart-img">
                                      <img
                                        src="assets/image/products/muter-panner.jpg"
                                        className="rounded"
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <h6 className="product-heading">
                                        Matar Paneer
                                      </h6>
                                      <small className="text-muted">
                                        Vegetarian Delight
                                      </small>
                                      <p className="text m-0">Qty: 1</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="cart-item d-flex align-items-center justify-content-between mb-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="cart-img">
                                      <img
                                        src="assets/image/products/muter-panner.jpg"
                                        className="rounded"
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <h6 className="product-heading">
                                        Matar Paneer
                                      </h6>
                                      <small className="text-muted">
                                        Vegetarian Delight
                                      </small>
                                      <p className="text m-0">Qty: 1</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h2 className="fs-6 fw-normal">Order History</h2>
                        <div className="mt-4 border rounded-3 px-3 py-3">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div>
                              <div className="d-flex gap-3 align-items-center flex-wrap">
                                <h2 className="fs-6 fw-medium m-0">
                                  Order Delivered,
                                </h2>
                                <p className="text m-0">August 5, 2025</p>
                              </div>
                              <div className="d-flex gap-2 mt-1 flex-wrap">
                                <h2 className="fs-6 fw-semibold ">2 items </h2>
                                <h2 className="fs-6 fw-semibold dot text text-dark">
                                  Rs. 235
                                </h2>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end gap-2 align-items-center">
                              <a
                                href
                                className="text-main fs-6 fw-semibold d-flex align-items-center gap-2"
                              >
                                View Order Details
                                <img
                                  src="assets/image/icons/ArrowRightMain.svg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="cart-item d-flex align-items-center justify-content-between mb-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="cart-img">
                                      <img
                                        src="assets/image/products/muter-panner.jpg"
                                        className="rounded"
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <h6 className="product-heading">
                                        Matar Paneer
                                      </h6>
                                      <small className="text-muted">
                                        Vegetarian Delight
                                      </small>
                                      <p className="text m-0">Qty: 1</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="cart-item d-flex align-items-center justify-content-between mb-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="cart-img">
                                      <img
                                        src="assets/image/products/muter-panner.jpg"
                                        className="rounded"
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <h6 className="product-heading">
                                        Matar Paneer
                                      </h6>
                                      <small className="text-muted">
                                        Vegetarian Delight
                                      </small>
                                      <p className="text m-0">Qty: 1</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 border rounded-3 px-3 py-3">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div>
                              <div className="d-flex gap-3 align-items-center flex-wrap">
                                <h2 className="fs-6 fw-medium m-0">
                                  Order Delivered,
                                </h2>
                                <p className="text m-0">August 5, 2025</p>
                              </div>
                              <div className="d-flex gap-2 mt-1 flex-wrap">
                                <h2 className="fs-6 fw-semibold ">2 items </h2>
                                <h2 className="fs-6 fw-semibold dot text text-dark">
                                  Rs. 235
                                </h2>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end gap-2 align-items-center">
                              <a
                                href
                                className="text-main fs-6 fw-semibold d-flex align-items-center gap-2"
                              >
                                View Order Details
                                <img
                                  src="assets/image/icons/ArrowRightMain.svg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="cart-item d-flex align-items-center justify-content-between mb-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="cart-img">
                                      <img
                                        src="assets/image/products/muter-panner.jpg"
                                        className="rounded"
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <h6 className="product-heading">
                                        Matar Paneer
                                      </h6>
                                      <small className="text-muted">
                                        Vegetarian Delight
                                      </small>
                                      <p className="text m-0">Qty: 1</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="cart-item d-flex align-items-center justify-content-between mb-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="cart-img">
                                      <img
                                        src="assets/image/products/muter-panner.jpg"
                                        className="rounded"
                                        alt=""
                                      />
                                    </div>
                                    <div>
                                      <h6 className="product-heading">
                                        Matar Paneer
                                      </h6>
                                      <small className="text-muted">
                                        Vegetarian Delight
                                      </small>
                                      <p className="text m-0">Qty: 1</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default React.memo(Orders);
