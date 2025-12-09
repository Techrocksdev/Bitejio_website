import React from "react";
import Header from "./header";
import Footer from "./footer";

function OrderPlaced() {
  return (
    <>
      <Header />

      <section className="order-confirmed-bg">
        <div className="container comman-spacing-top-bottom">
          <div className="order-confirmed-bg-wrapper">
            <div className="confirm-message">
              <img src="assets/image/icons/CheckCircle.svg" alt="" />
              <h2 className="confirmed-heading">Order Confirmed</h2>
              <p className="text">Your food is on its way</p>
              <div className="order-id-box text">
                Order Id : <b>ORD5420</b>
              </div>
            </div>
          </div>
          <div className>
            <a href="index.html" className="text text-white comman-btn-main">
              Go Back
            </a>
          </div>
        </div>
      </section>
      <section className="order-confirmed-list">
        <div className="container comman-spacing-top-bottom">
          <div className="row">
            <div className="col-md-5 col-lg-6">
              <div className="rounded-3 px-3 py-3 bg-white">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <h2 className="heading fs-6">Order Progress</h2>
                  <div className="text estimated-delivery-card">
                    Estimated Delivery: <b className="text-dark">26 min 42</b>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="items-check-points active-points active">
                    <div className="icon">
                      <img src="assets/image/icons/Check.svg" alt="" />
                    </div>
                    <h2>Order Placed</h2>
                  </div>
                  <div className="items-check-points active">
                    <div className="icon">
                      <img src="assets/image/icons/ForkKnife.svg" alt="" />
                    </div>
                    <h2>Restaurant Preparing</h2>
                  </div>
                  <div className="items-check-points">
                    <div className="icon">
                      <img src="assets/image/icons/truck.svg" alt="" />
                    </div>
                    <h2>Out for Delivery</h2>
                  </div>
                  <div className="items-check-points">
                    <div className="icon">
                      <img src="assets/image/icons/home.svg" alt="" />
                    </div>
                    <h2>Delivered</h2>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="rounded-3 px-3 py-3 bg-white">
                  <h2 className="heading">Your Delivery Partner</h2>
                  <div className="mt-4 d-flex align-items-center justify-content-between">
                    <div className="d-flex gap-3 align-items-center delivery-partner">
                      <div className="user">
                        <img
                          src="assets/image/users/user.png"
                          className="w-100 h-100"
                          alt=""
                        />
                      </div>
                      <div>
                        <h2>Rajesh Kumar</h2>
                        <p>Delivery Partner</p>
                      </div>
                    </div>
                    <div className="icon">
                      <img src="assets/image/icons/phone-white.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="rounded-3 px-3 py-3 bg-white">
                <h2 className="heading fs-5">Order summary</h2>
                <div className="mt-4">
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
                        <h6 className="product-heading">Matar Paneer</h6>
                        <small className="text-muted">Royal Kitchen</small>
                        <p className="fw-bold mb-0 mt-2">₹110</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="text">Qty: 1</p>
                    </div>
                  </div>
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
                        <h6 className="product-heading">Matar Paneer</h6>
                        <small className="text-muted">Vegetarian Delight</small>
                        <p className="fw-bold mb-0 mt-2">₹110</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="text">Qty: 1</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  {/* Bill Details */}
                  <div className="bill-details border-top pt-3 mt-3">
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
                    <div className="d-flex justify-content-between mt-3 border-top pt-3">
                      <h2 className="heading fs-6 font-medium">
                        Total Payable
                      </h2>
                      <h2 className="heading fs-6 font-medium">₹235</h2>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <h2 className="heading fs-6 font-medium">Payment Details</h2>
                  <div className="mt-3">
                    <div className="paid-card">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-success fw-normal">
                          Paid Online
                        </span>
                        <span className="text-success fw-semibold">₹47</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-danger fw-normal">
                          Pay on Delivery
                        </span>
                        <span className="text-danger fw-semibold">₹188</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="heading fs-6 font-medium">Delivery Address</h2>
                  <p className="text">
                    B block Street no. 10, Surajmal vihar, delhi 110092
                  </p>
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

export default React.memo(OrderPlaced);
