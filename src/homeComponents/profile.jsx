import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useUserAuth } from "../commonComponents/authContext";
import { Link } from "react-router-dom";

function Profile() {
  const { profile } = useUserAuth();
  return (
    <>
      <Header />

      <section className="my-order">
        <div className="container">
          <div className="comman-spacing-top-bottom">
            <h2 className="heading fw-medium">
              Welcome {profile?.firstName ? "," : ""}{" "}
              <span className="fw-semibold">
                {profile?.firstName} {profile?.lastName}
              </span>
            </h2>
            <div className="mt-4">
              <div className="bg-white border shadow rounded-3 px-4 py-3">
                <div className="row">
                  <div className="col-md-3 vh-100 d-none d-lg-block">
                    <div className="my-link-wrapper">
                      <Link to="/my-orders" className="link-item ">
                        <img src="assets/image/icons/Cart.svg" alt="" />
                        <span>My Orders</span>
                      </Link>
                      <Link to="/my-profile" className="link-item active">
                        <img src="assets/image/icons/UserCircle.svg" alt="" />
                        <span>My Profile</span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-9 border-md-start">
                    <div className="px-1 py-3 px-md-4 py-md-4">
                      <h2 className="heading">My Profile</h2>
                      <div className="mt-4">
                        <h2 className="fs-6 fw-normal">Personal Details</h2>
                        <div className="mt-4">
                          <div className="row g-4">
                            <div className="col-md-6">
                              <label htmlFor className="form-label">
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor className="form-label">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor className="form-label">
                                Email
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                              />
                            </div>
                            <div className="col-md-6">
                              <label htmlFor className="form-label">
                                Birth Date
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="DD-MM-YYYY"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <h2 className="fs-6 fw-normal">Saved Address</h2>
                          <div className="border rounded px-3 py-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex gap-2 align-items-center">
                                Home
                                <img
                                  src="assets/image/icons/HouseLine.svg"
                                  alt=""
                                />
                              </div>
                              <div className="d-flex gap-2 align-items-center">
                                <p className="mb-0 gs-6 fw-normal text-main">
                                  Edit
                                </p>
                                <img
                                  src="assets/image/icons/bxs_edit.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <p className="mb-0 fw-medium">
                              B block Street no. 10, Surajmal vihar, delhi
                              110092
                            </p>
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

export default React.memo(Profile);
