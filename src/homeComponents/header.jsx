import React, { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  sendOtpSignup,
  userLogin,
  verifyOTP,
} from "../apiServices/home/homeHttpService";
import OTPTimer from "../commonComponents/OTPTimer";
import { RotatingLines } from "react-loader-spinner";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../commonComponents/authContext";

function Header() {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    formState: { errors: errors1 },
  } = useForm({
    mode: "onChange",
  });
  const {
    handleSubmit: handleSubmit2,
    reset: reset2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm({
    mode: "onChange",
  });

  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem("token-bit-user");
  const navigate = useNavigate();
  const { refetch, profile } = useUserAuth();

  const onSubmit = async (data) => {
    setLoader(true);
    data.countryCode = data.phoneNumber.countryCode;
    data.phoneNumber = data.phoneNumber.phoneNumber;

    try {
      const response = await sendOtpSignup(data);
      console.log(response);
      if (!response.error) {
        showGlobalAlert(`Your OTP is: ${response.results.otp}`, "success");
        document.getElementById("closeModal").click();
        document.getElementById("otpModalOpen").click();
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred", error);
    } finally {
      setLoader(false);
    }
  };

  const onSubmit1 = async (data) => {
    setLoader(true);
    let otp = Object.values(data);
    otp = otp.join("");

    const formData = {
      otp: otp,
      countryCode: watch("phoneNumber").countryCode,
      phoneNumber: watch("phoneNumber").phoneNumber,
    };

    try {
      const response = await verifyOTP(formData);

      if (!response.error) {
        localStorage.setItem("token-bit-user", response.results.token);
        showGlobalAlert(response.message, "success");
        document.getElementById("closeOtpModal").click();
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
  const onSubmit2 = async (data) => {
    setLoader(true);
    data.countryCode = data.phoneNumber.countryCode;
    data.phoneNumber = data.phoneNumber.phoneNumber;
    data.fcmToken = localStorage.getItem("fcmTokenBit");
    data.deviceId = localStorage.getItem("uid-bit-user");
    data.deviceOS = "web";

    try {
      const response = await userLogin(data);
      console.log(response);
      if (!response.error) {
        localStorage.setItem("token-bit-user", response.results.token);
        showGlobalAlert(response.message, "success");
        document.getElementById("closeLoginModal").click();
        refetch();
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred", error);
    } finally {
      setLoader(false);
    }
  };

  const moveOnMax = (event, field, nextField, preField) => {
    if (event.keyCode !== 9) {
      if (event.key === "ArrowLeft" || event.key === "Backspace") {
        preField?.focus();
      } else {
        if (field?.value?.length >= field.maxLength) {
          nextField?.focus();
        }
      }
    }
  };

  const resend = async () => {
    const formData = {
      countryCode: watch("phoneNumber").countryCode,
      phoneNumber: watch("phoneNumber").phoneNumber,
    };
    try {
      const response = await sendOtpSignup(formData);
      if (!response.error) {
        showGlobalAlert(`Your OTP is: ${response.results.otp}`, "success");
      } else {
        showGlobalAlert(response.message, "error");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An error occurred");
    }
  };
  const logout = useCallback(() => {
    localStorage.removeItem("token-bit-user");
    navigate("/");
  }, [navigate]);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-wrapper">
            <div className="row g-3 align-items-center">
              <div className="col-3 mb-md-4 mb-lg-0 col-md-6 col-lg-2 col-xl-1">
                {/* Logo */}
                <div className="logo">
                  <img src="assets/image/project/logo.svg" alt="Bitezio Logo" />
                </div>
              </div>
              <div className="col-12 order-3 order-md-3 order-xl-2 col-md-6 col-lg-3 col-xl-3">
                {/* Location */}
                <div className="location dropdown">
                  <button
                    className="btn btn-light dropdown-toggle d-flex gap-2 align-items-center justify-content-between"
                    type="button"
                    id="locationDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <span className="icon">
                        <img src="assets/image/icons/MapPin.svg" alt="" />
                      </span>
                      B block Street no. 10, Surajmal
                    </div>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="locationDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        B block Street no. 10, Surajmal
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Sector 21, Noida
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Connaught Place, Delhi
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 order-4 order-md-4 order-xl-3 col-md-6 col-lg-3 col-xl-4">
                {/* Search */}
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Discover restaurants, cuisines, or dishes"
                    id="search"
                  />
                  <span className="search-icon">
                    <img src="assets/image/icons/MagnifyingGlass.svg" alt="" />
                  </span>
                  <div
                    className="search-dropdown-content d-none"
                    id="search-dropdown"
                  >
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-9 text-end mb-md-4 mb-lg-0 order-2 order-md-2 order-xl-4 col-md-6 col-lg-3 col-xl-4">
                {token ? (
                  <div className="auth">
                    <div className="dropdown">
                      <Link
                        to=""
                        className=" signup btn-comman pb-0 d-flex align-items-center text-decoration-none dropdown-toggle profile-dropdown"
                        id="accountMenu"
                        data-bs-toggle="dropdown"
                      >
                        <i className="fa fa-user me-2"></i>
                        <span className="fw-semibold">
                          {profile?.name || "User"}
                        </span>
                      </Link>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="accountMenu"
                      >
                        <li>
                          <Link
                            className="dropdown-item"
                            to=""
                            onClick={(e) => {
                              e.preventDefault();
                              logout();
                            }}
                          >
                            <i className="fa fa-sign-out me-2" />
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="auth">
                    <button
                      className="border-0 bg-transparent text-white"
                      data-bs-toggle="modal"
                      data-bs-target="#login"
                    >
                      Login
                    </button>
                    <a
                      href="#"
                      className="signup btn-comman"
                      data-bs-toggle="modal"
                      data-bs-target="#addressModal"
                    >
                      Sign up
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sign up Modal */}
      <div
        className="modal fade"
        id="addressModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-width">
          <button
            type="button"
            className="d-none"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeModal"
          ></button>
          <form
            className="modal-content  p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <img
              src="assets/image/icons/bike.svg"
              alt="Delivery"
              width={100}
              className="mx-auto mb-3"
            />
            <h5 className="mb-3 modal-heading">Sign Up</h5>
            <label className="form-label fw-semibold">
              Phone Number <span className="text-danger">*</span>
            </label>
            <Controller
              className={`form-control border border-2 mb-3 ${
                errors.phoneNumber ? "input-error" : ""
              }`}
              name="phoneNumber"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <PhoneInput
                  placeholder="Enter Mobile No."
                  country={"us"}
                  inputClass={`form-control ${
                    errors.phoneNumber ? "input-error" : ""
                  }`}
                  inputStyle={{
                    padding: "unset",
                    paddingLeft: "48px",
                  }}
                  inputProps={{
                    placeholder: "Enter Mobile No.",
                  }}
                  value={
                    field?.value?.phoneNumber
                      ? `${field?.value?.countryCode}${field?.value?.phoneNumber}`
                      : ""
                  }
                  onChange={(value, countryData) => {
                    const phoneNumberWithoutCountry = value.slice(
                      countryData.dialCode.length
                    );

                    field.onChange({
                      phoneNumber: phoneNumberWithoutCountry,
                      countryCode: `+${countryData.dialCode}`,
                    });
                  }}
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="form-error">{errors.phoneNumber.message}</p>
            )}
            <button
              type="submit"
              className="comman-btn-main rounded-pill mx-auto mt-3"
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
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
      <div
        className="modal fade"
        id="otpModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-width">
          <button
            type="button"
            className="d-none"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeOtpModal"
            onClick={() => {
              reset(), reset1();
            }}
          ></button>

          <form
            className="modal-content  p-4"
            onSubmit={handleSubmit1(onSubmit1)}
          >
            <img
              src="assets/image/icons/bike.svg"
              alt="Delivery"
              width={100}
              className="mx-auto mb-3"
            />
            <h5 className="mb-3 modal-heading">
              {" "}
              Enter the 6-digit OTP sent to your email.
            </h5>
            <div className="d-flex justify-content-center mb-4">
              <input
                type="number"
                maxLength={1}
                className={`form-control text-center mx-1 ${
                  errors1.otp1 ? "input-error" : ""
                }`}
                style={{ width: "50px", height: "50px" }}
                {...register1("otp1", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp1"),
                    document.getElementById("otp2")
                  );
                }}
                onInput={(e) => {
                  if (e.target.value.length > 1)
                    e.target.value = e.target.value.slice(0, 1);
                }}
                id="otp1"
              />
              <input
                type="number"
                maxLength={1}
                className={`form-control text-center mx-1 ${
                  errors1.otp2 ? "input-error" : ""
                }`}
                style={{ width: "50px", height: "50px" }}
                {...register1("otp2", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp2"),
                    document.getElementById("otp3"),
                    document.getElementById("otp1")
                  );
                }}
                onInput={(e) => {
                  if (e.target.value.length > 1)
                    e.target.value = e.target.value.slice(0, 1);
                }}
                id="otp2"
              />
              <input
                type="number"
                maxLength={1}
                className={`form-control text-center mx-1 ${
                  errors1.otp3 ? "input-error" : ""
                }`}
                style={{ width: "50px", height: "50px" }}
                {...register1("otp3", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp3"),
                    document.getElementById("otp4"),
                    document.getElementById("otp2")
                  );
                }}
                onInput={(e) => {
                  if (e.target.value.length > 1)
                    e.target.value = e.target.value.slice(0, 1);
                }}
                id="otp3"
              />
              <input
                type="number"
                maxLength={1}
                className={`form-control text-center mx-1 ${
                  errors1.otp4 ? "input-error" : ""
                }`}
                style={{ width: "50px", height: "50px" }}
                {...register1("otp4", { required: true })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("otp4"),
                    document.getElementById("otp5"),
                    document.getElementById("otp3")
                  );
                }}
                onInput={(e) => {
                  if (e.target.value.length > 1)
                    e.target.value = e.target.value.slice(0, 1);
                }}
                id="otp4"
              />
              {/* <input
              type="number"
              maxLength={1}
              className={`form-control text-center mx-1 ${
                errors1.otp5 ? "input-error" : ""
              }`}
              style={{ width: "50px", height: "50px" }}
              {...register1("otp5", { required: true })}
              onKeyUp={(event) => {
                moveOnMax(
                  event,
                  document.getElementById("otp5"),
                  document.getElementById("otp6"),
                  document.getElementById("otp4")
                );
              }}
              onInput={(e) => {
                if (e.target.value.length > 1)
                  e.target.value = e.target.value.slice(0, 1);
              }}
              id="otp5"
            />
            <input
              type="number"
              maxLength={1}
              className={`form-control text-center mx-1 ${
                errors1.otp6 ? "input-error" : ""
              }`}
              style={{ width: "50px", height: "50px" }}
              {...register1("otp6", { required: true })}
              onKeyUp={(event) => {
                moveOnMax(
                  event,
                  document.getElementById("otp6"),
                  "",
                  document.getElementById("otp5")
                );
              }}
              onInput={(e) => {
                if (e.target.value.length > 1)
                  e.target.value = e.target.value.slice(0, 1);
              }}
              id="otp6"
            /> */}
            </div>

            <div className=" text">
              <OTPTimer
                seconds={30}
                onResendClick={resend}
                resendButtonText="Resend OTP"
                text="Time Left: "
                style={{ fontSize: "14px", textAlign: "center" }}
              />
            </div>

            <button
              type="submit"
              className="comman-btn-main rounded-pill mx-auto mt-3"
              disabled={loader}
            >
              {loader ? (
                <>
                  <span className="me-2">Verifying...</span>
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        </div>
      </div>
      {/* Login Modal  */}
      <div className="modal fade" id="login" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-width">
          <button
            type="button"
            className="d-none"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeLoginModal"
            onClick={() => {
              reset2();
            }}
          ></button>
          <form
            className="modal-content  p-4"
            onSubmit={handleSubmit2(onSubmit2)}
          >
            <img
              src="assets/image/icons/bike.svg"
              alt="Delivery"
              width={100}
              className="mx-auto mb-3"
            />
            <h5 className="mb-3 modal-heading">Login</h5>
            <label className="form-label fw-semibold">
              Phone Number <span className="text-danger">*</span>
            </label>
            <Controller
              className={`form-control border border-2 mb-3 ${
                errors2.phoneNumber ? "input-error" : ""
              }`}
              name="phoneNumber"
              control={control2}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <PhoneInput
                  placeholder="Enter Mobile No."
                  country={"us"}
                  inputClass={`form-control ${
                    errors2.phoneNumber ? "input-error" : ""
                  }`}
                  inputStyle={{
                    padding: "unset",
                    paddingLeft: "48px",
                  }}
                  inputProps={{
                    placeholder: "Enter Mobile No.",
                  }}
                  value={
                    field?.value?.phoneNumber
                      ? `${field?.value?.countryCode}${field?.value?.phoneNumber}`
                      : ""
                  }
                  onChange={(value, countryData) => {
                    const phoneNumberWithoutCountry = value.slice(
                      countryData.dialCode.length
                    );

                    field.onChange({
                      phoneNumber: phoneNumberWithoutCountry,
                      countryCode: `+${countryData.dialCode}`,
                    });
                  }}
                />
              )}
            />
            {errors2.phoneNumber && (
              <p className="form-error">{errors2.phoneNumber.message}</p>
            )}
            <button
              type="submit"
              className="comman-btn-main rounded-pill mx-auto mt-3"
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
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
      <div
        className="d-none"
        id="otpModalOpen"
        data-bs-toggle="modal"
        data-bs-target="#otpModal"
      ></div>
    </>
  );
}

export default React.memo(Header);
