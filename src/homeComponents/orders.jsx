import React from "react";
import Footer from "./footer";
import Header from "./header";
import { useUserAuth } from "../commonComponents/authContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../apiServices/home/homeHttpService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";

function Orders() {
  const { profile } = useUserAuth();
  const { data: response, isLoading } = useQuery({
    queryKey: ["ordersListCurrent"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        search: "",
        userId: "",
        year: 0,
        month: 0,
        startDate: "",
        endDate: "",
        status: "Active",
      };
      return getOrders(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const results = response?.results?.orders || [];

  const { data: response2 } = useQuery({
    queryKey: ["ordersListOlder"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        search: "",
        userId: "",
        year: 0,
        month: 0,
        startDate: "",
        endDate: "",
        status: "Delivered",
      };
      return getOrders(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const results2 = response2?.results?.orders || [];
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
              <div className="bg-white border shadow rounded-3 px-2 px-md-4 py-3">
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

                      {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                          <div className="mt-4" key={i}>
                            <div className="mt-4 border rounded-3 px-2 py-2 px-md-3 py-md-3">
                              <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <div className="d-flex gap-3 align-items-center flex-wrap w-100">
                                  <h2 className="fs-6 fw-medium m-0 w-100">
                                    <Skeleton style={{ width: "70%" }} />
                                  </h2>
                                </div>
                                <div className="d-flex gap-2 mt-2 flex-wrap w-100">
                                  <h2 className="fs-6 fw-semibold w-100">
                                    <Skeleton style={{ width: "40%" }} />
                                  </h2>
                                </div>
                              </div>
                              <div className="mt-2">
                                <div className="row">
                                  {Array.from({ length: 2 }).map((_, n) => (
                                    <div className="col-md-6" key={n}>
                                      <div className="cart-item d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-2 w-100">
                                          <div className="cart-img">
                                            <Skeleton />
                                          </div>
                                          <div className="w-100">
                                            <h6 className="product-heading">
                                              <Skeleton />
                                            </h6>
                                            <small className="text-muted">
                                              <Skeleton />
                                            </small>
                                            <p className="text m-0">
                                              <Skeleton />
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : results?.length || results2?.length ? (
                        <>
                          <div className="mt-4">
                            <h2 className="fs-6 fw-bold text-center">
                              Current Order
                            </h2>
                            {results?.map((item) => (
                              <div
                                key={item?._id}
                                className="mt-4 border rounded-3 px-2 py-2 px-md-3 py-md-3"
                              >
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  <div>
                                    <div className="d-flex gap-3 align-items-center flex-wrap">
                                      <h2 className="fs-6 fw-medium m-0">
                                        Order Ongoing,
                                      </h2>
                                      <p className="fs-6 fw-normal text-main m-0">
                                        Estimated Delivery:{" "}
                                        <span className="fw-semibold text-center">
                                          30 Minutes
                                        </span>
                                      </p>
                                    </div>
                                    <div className="d-flex gap-2 mt-1 flex-wrap">
                                      <h2 className="fs-6 fw-semibold ">
                                        {item?.products?.length}{" "}
                                        {item?.products?.length === 1
                                          ? "item"
                                          : "items"}
                                      </h2>
                                      <h2 className="fs-6 fw-semibold dot text text-dark">
                                        Rs. {item.amount}
                                      </h2>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-end gap-2 align-items-center">
                                    <Link
                                      to={`/order-details/${item?._id}`}
                                      className="text-main fs-6 fw-semibold d-flex align-items-center gap-2"
                                    >
                                      View Order Details
                                      <img
                                        src="assets/image/icons/ArrowRightMain.svg"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <div className="row">
                                    {item?.products?.slice(0, 2)?.map((i) => (
                                      <div
                                        className="col-md-6"
                                        key={i?.productId?._id}
                                      >
                                        <div className="cart-item d-flex align-items-center justify-content-between mb-3">
                                          <div className="d-flex align-items-center gap-2">
                                            <div className="cart-img">
                                              <img
                                                src={i?.productId?.images?.[0]}
                                                className="rounded"
                                                alt={i?.productId?.images?.[0]}
                                              />
                                            </div>
                                            <div>
                                              <h6 className="product-heading">
                                                {i.productId?.name_en}
                                              </h6>
                                              <small className="text-muted">
                                                {item?.merchant?.shopName}
                                              </small>
                                              <p className="text m-0">
                                                Qty: {i?.quantity}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {results2?.length ? (
                            <div className="mt-4">
                              <h2 className="fs-6 fw-bold text-center">
                                Order History
                              </h2>
                              {results2?.map((item) => (
                                <div
                                  key={item?._id}
                                  className="mt-4 border rounded-3 px-2 py-2 px-md-3 py-md-3"
                                >
                                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div>
                                      <div className="d-flex gap-3 align-items-center flex-wrap">
                                        <h2 className="fs-6 fw-medium m-0">
                                          Order Ongoing,
                                        </h2>
                                        <p className="text m-0">
                                          {moment(
                                            item?.tracking?.[3]?.date
                                          ).format("DD MMM YYYY, hh:mm A")}
                                        </p>
                                      </div>
                                      <div className="d-flex gap-2 mt-1 flex-wrap">
                                        <h2 className="fs-6 fw-semibold ">
                                          {item?.products?.length}{" "}
                                          {item?.products?.length === 1
                                            ? "item"
                                            : "items"}
                                        </h2>
                                        <h2 className="fs-6 fw-semibold dot text text-dark">
                                          Rs. {item.amount}
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-end gap-2 align-items-center">
                                      <Link
                                        to={`/order-details/${item?._id}`}
                                        className="text-main fs-6 fw-semibold d-flex align-items-center gap-2"
                                      >
                                        View Order Details
                                        <img
                                          src="assets/image/icons/ArrowRightMain.svg"
                                          alt=""
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="mt-2">
                                    <div className="row">
                                      {item?.products?.slice(0, 2)?.map((i) => (
                                        <div
                                          className="col-md-6"
                                          key={i.productId?._id}
                                        >
                                          <div className="cart-item d-flex align-items-center justify-content-between mb-3">
                                            <div className="d-flex align-items-center gap-2">
                                              <div className="cart-img">
                                                <img
                                                  src={
                                                    i?.productId?.images?.[0]
                                                  }
                                                  className="rounded"
                                                  alt={
                                                    i?.productId?.images?.[0]
                                                  }
                                                />
                                              </div>
                                              <div>
                                                <h6 className="product-heading">
                                                  {i.productId?.name_en}
                                                </h6>
                                                <small className="text-muted">
                                                  {item?.merchant?.shopName}
                                                </small>
                                                <p className="text m-0">
                                                  Qty: {i?.quantity}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            ""
                          )}{" "}
                        </>
                      ) : (
                        <div className="mt-5 no-data mx-auto d-flex flex-column justify-content-center align-items-center">
                          <img
                            src="../assets/image/products/noData.avif"
                            alt="nodata"
                            loading="lazy"
                          />
                          <p>
                            No Results Found!
                            <br />
                            We couldn’t find any matches.
                          </p>
                        </div>
                      )}
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
