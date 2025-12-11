import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useUserAuth } from "../commonComponents/authContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { editProfile } from "../apiServices/home/homeHttpService";
import { RotatingLines } from "react-loader-spinner";

function Profile() {
  const { profile, refetch } = useUserAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (profile?.firstName) {
      setValue("firstName", profile?.firstName);
      setValue("lastName", profile?.lastName);
      setValue("email", profile?.email);
      if (profile?.dob) {
        const formattedDate = new Date(profile.dob).toISOString().split("T")[0];
        setValue("dob", formattedDate);
      }
    }
  }, [profile]);

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const response = await editProfile(data);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        await refetch();
        document.getElementById("closeAddMerchantModal").click();
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
                      <Link to="/my-orders" className="link-item ">
                        <img src="assets/image/icons/Cart.svg" alt="" />
                        <span>My Orders</span>
                      </Link>
                      <Link to="/my-profile" className="link-item active">
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
                  <div className="col-lg-9 border-md-start">
                    <div className="px-1 py-3 px-md-4 py-md-4">
                      <h2 className="heading">My Profile</h2>
                      <div className="mt-4">
                        <h2 className="fs-6 fw-normal">Personal Details</h2>
                        <div className="mt-4">
                          <form
                            className="row g-4"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <div className="col-md-6">
                              <label htmlFor className="form-label">
                                First Name
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.firstName ? "input-error" : ""
                                }`}
                                placeholder="Enter first name"
                                {...register("firstName", {
                                  required: "First name is required",
                                  minLength: {
                                    value: 2,
                                    message:
                                      "First name must be at least 2 characters",
                                  },
                                  maxLength: {
                                    value: 50,
                                    message:
                                      "First name must be less than 50 characters",
                                  },
                                  pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message:
                                      "First name can only contain letters and spaces",
                                  },
                                })}
                              />
                              {errors.firstName && (
                                <p className="form-error">
                                  {errors.firstName.message}
                                </p>
                              )}
                            </div>
                            <div className="col-md-6">
                              <label htmlFor className="form-label">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.lastName ? "input-error" : ""
                                }`}
                                placeholder="Enter last name"
                                {...register("lastName", {
                                  required: "Last name is required",
                                  minLength: {
                                    value: 2,
                                    message:
                                      "Last name must be at least 2 characters",
                                  },
                                  maxLength: {
                                    value: 50,
                                    message:
                                      "Last name must be less than 50 characters",
                                  },
                                  pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message:
                                      "Last name can only contain letters and spaces",
                                  },
                                })}
                              />
                              {errors.lastName && (
                                <p className="form-error">
                                  {errors.lastName.message}
                                </p>
                              )}
                            </div>
                            <div className="col-md-6">
                              <label htmlFor className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                className={`form-control ${
                                  errors.email ? "input-error" : ""
                                }`}
                                placeholder="Enter email address"
                                {...register("email", {
                                  required: "Email is required",
                                  pattern: {
                                    value:
                                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                  },
                                })}
                              />
                              {errors.email && (
                                <p className="form-error">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                            <div className="col-md-6">
                              <label htmlFor className="form-label">
                                Birth Date
                              </label>
                              <input
                                type="date"
                                className={`form-control ${
                                  errors.dob ? "input-error" : ""
                                }`}
                                {...register("dob", {
                                  required: false,
                                })}
                                max={new Date().toISOString().split("T")[0]}
                              />
                              {errors.dob && (
                                <p className="form-error">
                                  {errors.dob.message}
                                </p>
                              )}
                            </div>
                            <div className="col-12 mt-3">
                              <button
                                type="submit"
                                className="comman-btn-main "
                                disabled={loader}
                              >
                                {loader ? (
                                  <>
                                    <span className="me-2">Saving...</span>
                                    <RotatingLines
                                      strokeColor="white"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      width="20"
                                      visible={true}
                                    />
                                  </>
                                ) : (
                                  "Save"
                                )}
                              </button>
                            </div>
                          </form>
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
