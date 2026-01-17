import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useQuery } from "@tanstack/react-query";
import {
  createOrder,
  getMyCart,
  removeFromCart,
  updateCartQuantity,
} from "../apiServices/home/homeHttpService";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddressCart from "./addressCart";
import { RotatingLines } from "react-loader-spinner";
import { useUserAuth } from "../commonComponents/authContext";

function Cart() {
  const [addDetail, setAddDetail] = useState({});
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { refetch } = useUserAuth();

  const {
    data: cart,
    isLoading,
    refetch: refetch2,
  } = useQuery({
    queryKey: ["cartList"],
    queryFn: getMyCart,
    select: (data) => data.results.carts[0],
  });

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
        refetch2();
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
        refetch2();
        refetch();
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    }
  };
  const handlePaymentChange = (e) => {
    setSelectedPayment(Number(e.target.value));
  };
  const totalPrice = cart?.products?.reduce((sum, item) => {
    return sum + item.variantId.price * item.quantity;
  }, 0);

  const totalDiscount = cart?.products?.reduce((sum, item) => {
    return sum + (item.variantId.discountPrice || 0) * item.quantity;
  }, 0);
  const onSubmit = async () => {
    if (!addDetail?.address_line1) {
      showGlobalAlert("Please select address", "error");
      return;
    }
    setLoader(true);
    const address = {
      address_line1: addDetail?.address_line1,
      address_line2: addDetail?.address_line2,
      postal_code: addDetail?.postal_code,
      city: addDetail?.city,
      country: addDetail?.country,
      latitude: addDetail?.latitude,
      longitude: addDetail?.longitude,
      type: addDetail?.type,
    };
    const products = cart?.products?.map((item) => ({
      cartId: item?._id,
      productId: item.productId._id,
      variantId: item.variantId._id,
      merchantId: item.productId.userId._id,
      quantity: item.quantity,
      amount: item.variantId.price,
      paidAmount: 0,
      discount: item.variantId.discountPrice,
      advancePayment: 0,
    }));

    const formData = {
      products: products,
      address: address,
      amount: totalPrice,
      paidAmount: selectedPayment,
      discount: totalDiscount,
    };

    try {
      const response = await createOrder(formData);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        navigate(`/order-confirmed/${response.results.order._id}`);
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
                            className="cart-item d-flex align-items-center justify-content-between"
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
                            key={item?.productId?._id}
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
                                  {item.productId.userId.shopName}
                                </small>
                                <p className="fw-bold mb-0 mt-2">
                                  ₹{item?.variantId?.price}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 col-md-5 col-lg-6 d-flex align-items-center justify-content-end gap-2">
                              <div className="add-btn add-btn2">
                                <button
                                  onClick={() => updateQuantity(item, -1)}
                                  disabled={item?.quantity <= 1}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                                <button>{item?.quantity}</button>
                                <button onClick={() => updateQuantity(item, 1)}>
                                  <i className="fa fa-plus"></i>
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
                          {/* <div className="coupon-card">
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
                          </div> */}
                        </div>
                        {/* Bill Details */}
                        <div className="bill-details mt-3">
                          <h2 className="heading">Bill details</h2>
                          <p className="d-flex justify-content-between mb-1">
                            <span>Subtotal</span>{" "}
                            <span>₹{totalPrice || 0}</span>
                          </p>
                          <p className="d-flex justify-content-between mb-3">
                            <span>Delivery Charges</span> <span>₹30</span>
                          </p>
                          <p className="d-flex justify-content-between mb-1">
                            <span>Platform Fees</span> <span>₹15</span>
                          </p>
                          <p className="d-flex justify-content-between mb-3">
                            <span>Discount</span>{" "}
                            <span>₹{totalDiscount || 0}</span>
                          </p>
                          <h6 className="d-flex justify-content-between fw-bold">
                            <span>Total Payable</span>{" "}
                            <span>₹{totalPrice + 15 + 30 - totalDiscount}</span>
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

                        <AddressCart
                          setAddDetail={setAddDetail}
                          addDetail={addDetail}
                        />
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
                      {/* <div className="payment-option mt-4">
                        <label
                          className="d-flex gap-3 align-items-center"
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            type="radio"
                            name="payment-method"
                            value={20}
                            checked={selectedPayment === 20}
                            onChange={handlePaymentChange}
                            className="custom-radio"
                          />
                          <div>Pay 20% Now, Rest on Delivery</div>
                        </label>
                      </div>

                      <div className="payment-option mt-4">
                        <label
                          className="d-flex gap-3 align-items-center"
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            type="radio"
                            name="payment-method"
                            value={100}
                            checked={selectedPayment === 100}
                            onChange={handlePaymentChange}
                            className="custom-radio"
                          />
                          <div>Pay 100% Online</div>
                        </label>
                      </div> */}

                      <div className="payment-option mt-4">
                        <label
                          className="d-flex gap-3 align-items-center"
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            type="radio"
                            name="payment-method"
                            value={0}
                            checked={selectedPayment === 0}
                            onChange={handlePaymentChange}
                            className="custom-radio"
                          />
                          <div>Cash on Delivery</div>
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="comman-btn-main w-100"
                          disabled={loader}
                          onClick={() => onSubmit()}
                        >
                          {loader ? (
                            <>
                              <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="20"
                                visible={true}
                              />
                              <span className="ms-2"> Wait..</span>
                            </>
                          ) : selectedPayment === 0 ? (
                            "Place Order"
                          ) : (
                            "Pay Now"
                          )}
                        </button>
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
    </>
  );
}

export default React.memo(Cart);
