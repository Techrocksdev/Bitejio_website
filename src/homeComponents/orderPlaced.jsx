import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Link, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../apiServices/home/homeHttpService";

function OrderPlaced() {
  let { id } = useParams();
  const { data: details } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: () => getOrderDetails(id),
    onError: (error) => {
      console.log(error);
    },
    select: (data) => data.results.order,
  });
  console.log(details);
  const totalPrice = details?.products?.reduce((sum, item) => {
    return sum + item.variantId.price * item.quantity;
  }, 0);

  const discountPrice = details?.products?.reduce((sum, item) => {
    return (
      sum +
      (item.variantId.discountPrice || item.variantId.price) * item.quantity
    );
  }, 0);

  const totalDiscount = details?.products?.reduce((sum, item) => {
    const regularPrice = item.variantId.price * item.quantity;
    const discountedPrice =
      (item.variantId.discountPrice || item.variantId.price) * item.quantity;
    return sum + (regularPrice - discountedPrice);
  }, 0);

  return (
    <>
      <Header />
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        colors={["#e46a15", "#f46b45", "#eea849"]}
        gravity={0.1}
        initialVelocityX={2}
        initialVelocityY={2}
        numberOfPieces={200}
        opacity={1}
        recycle={false}
        run
        wind={0}
      />

      <section className="order-confirmed-bg">
        <div className="container comman-spacing-top-bottom pb-0">
          <div className="order-confirmed-bg-wrapper">
            <div className="confirm-message">
              <img
                src="../../assets/image/icons/icons8-verified-account.gif"
                alt=""
              />
              <h2 className="confirmed-heading">Order Confirmed</h2>
              <p className="text">Your food is on its way</p>
              <div className="order-id-box text">
                Order Id : <b>{details?.orderId}</b>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <a
              href={details?.invoice}
              target="_blank"
              rel="noopener noreferrer"
              className="text text-white comman-btn-main w-auto"
            >
              Download Invoice
            </a>
            <Link to="/" className="text text-white comman-btn-main ms-3">
              Go Back
            </Link>
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
                    Estimated Delivery: <b className="text-dark">30 Minutes</b>
                  </div>
                </div>
                <div className="mt-4">
                  {details?.products?.[0]?.tracking?.map((item) => (
                    <div
                      key={item._id}
                      className={
                        item.is_active
                          ? "items-check-points active-points active"
                          : "items-check-points"
                      }
                    >
                      <div className="icon">
                        <img
                          src={
                            item.status === "Placed"
                              ? "../../assets/image/icons/Check.svg"
                              : item.status === "Preparing"
                                ? "../../assets/image/icons/restaurant.png"
                                : item.status === "Out for Delivery"
                                  ? "../../assets/image/icons/truck.svg"
                                  : item.status === "Delivered"
                                    ? "../../assets/image/icons/home.svg"
                                    : ""
                          }
                          alt=""
                          style={{ width: "22px" }}
                        />
                      </div>
                      <h2>{item.status}</h2>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <div className="rounded-3 px-3 py-3 bg-white">
                  <h2 className="heading">Your Delivery Partner</h2>
                  <div className="mt-4 d-flex align-items-center justify-content-between">
                    <div className="d-flex gap-3 align-items-center delivery-partner">
                      <div className="user">
                        <img
                          src="../../assets/image/icons/delivery-man.png"
                          className="w-100 h-100"
                          alt=""
                        />
                      </div>
                      <div>
                        <h2>
                          {details?.products[0]?.deliveryBoyId?.firstName ? (
                            <>
                              {details?.products[0]?.deliveryBoyId?.firstName}{" "}
                              {details?.products[0]?.deliveryBoyId?.lastName}
                            </>
                          ) : (
                            <div style={{ lineHeight: "24px" }}>
                              Your delivery partner will be assigned soon!{" "}
                              <br /> Keep Checking!
                            </div>
                          )}
                        </h2>
                        {details?.products[0]?.deliveryBoyId?.firstName ? (
                          <p>Delivery Partner</p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {details?.products[0]?.deliveryBoyId?.countryCode ? (
                      <div className="icon">
                        <a
                          href={`tel:${details?.products[0]?.deliveryBoyId?.countryCode}${details?.products[0]?.deliveryBoyId?.phoneNumber}`}
                        >
                          <img
                            src="../../assets/image/icons/phone-white.svg"
                            alt="Call Delivery Boy"
                          />
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="rounded-3 px-3 py-3 bg-white">
                <h2 className="heading fs-5">Order summary</h2>
                <div className="mt-4">
                  {details?.products?.map((item) => (
                    <div
                      key={item.productId._id}
                      className="cart-item d-flex align-items-center justify-content-between"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          className="cart-img"
                          to={`/product-details/${item?.productId?._id}`}
                        >
                          <img
                            src={item?.productId?.images?.[0]}
                            className="rounded"
                            alt={item?.productId?.images?.[0]}
                          />
                        </Link>
                        <div>
                          <h6 className="product-heading">
                            {" "}
                            {item.productId.name_en}
                          </h6>
                          <small className="text-muted">
                            {" "}
                            {item.productId.userId.shopName}
                          </small>
                          <p className="fw-bold mb-0 mt-2">
                            ₹{item?.variantId?.price}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="text">Qty: {item?.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  {/* Bill Details */}
                  <div className="bill-details border-top pt-3 mt-3">
                    <p className="d-flex justify-content-between mb-1">
                      <span>Subtotal</span>
                      <span>
                        <del className="text-muted">₹{totalPrice || 0}</del>
                        <strong className="ms-2">₹{discountPrice || 0}</strong>
                      </span>
                    </p>
                    <p className="d-flex justify-content-between mb-3 text-success">
                      <span>Discount</span>
                      <span>-₹{totalDiscount || 0}</span>
                    </p>
                    <p className="d-flex justify-content-between mb-3">
                      <span>Delivery Charges</span> <span>₹30</span>
                    </p>
                    <p className="d-flex justify-content-between mb-1">
                      <span>Platform Fees</span> <span>₹5</span>
                    </p>

                    <h6 className="d-flex justify-content-between fw-bold">
                      <span>Total Payable</span>
                      <span>₹{discountPrice + 35}</span>
                    </h6>
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
                        <span className="text-success fw-semibold">
                          ₹{details?.paidAmount}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-danger fw-normal">
                          Pay on Delivery
                        </span>
                        <span className="text-danger fw-semibold">
                          ₹{details?.pendingPayment + 35}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="heading fs-6 font-medium">Delivery Address</h2>
                  <p className="text">
                    {details?.address?.address_line2},{" "}
                    {details?.address?.address_line1}
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
