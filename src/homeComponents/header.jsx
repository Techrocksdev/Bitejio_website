import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  getMySearchHistory,
  searchLocation,
  sendOtpSignup,
  verifyOTP,
} from "../apiServices/home/homeHttpService";
import OTPTimer from "../commonComponents/OTPTimer";
import { RotatingLines } from "react-loader-spinner";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../commonComponents/authContext";
import { useQuery } from "@tanstack/react-query";

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

  const [loader, setLoader] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [type, setType] = useState("");
  const { refetch, token, logout, login } = useUserAuth();
  const savedLocation = sessionStorage.getItem("userLocation");
  const navigate = useNavigate();

  useEffect(() => {
    if (savedLocation) {
      const parsedLocation = JSON.parse(savedLocation);
      setLocationData(parsedLocation);
    }
  }, [savedLocation]);

  const { data: response, refetch: refetch2 } = useQuery({
    queryKey: ["recentLocList"],
    enabled: !!token,
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        type: "Location",
      };
      return getMySearchHistory(formData);
    },
  });

  const recentLocation = response?.results?.history;

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("GEOLOCATION_NOT_SUPPORTED"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    });
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            "User-Agent": "YourAppName/1.0",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch address");

      const data = await response.json();
      const address = data.address || {};

      return {
        fullAddress: data.display_name || "Address not found",
        locality:
          address.suburb || address.neighbourhood || address.village || "",
        city: address.city || address.town || address.state_district || "",
        state: address.state || "",
        country: address.country || "",
        postcode: address.postcode || "",
        formattedShort: formatShortAddress(address),
        coordinates: { lat, lng },
      };
    } catch (error) {
      console.error("Address fetch error:", error);
      throw error;
    }
  };

  const formatShortAddress = (address) => {
    const parts = [];

    if (address.suburb || address.neighbourhood) {
      parts.push(address.suburb || address.neighbourhood);
    }
    if (address.city || address.town) {
      parts.push(address.city || address.town);
    } else if (address.state_district) {
      parts.push(address.state_district);
    }

    return parts.join(", ") || "Current Location";
  };

  const handleDetectLocation = async () => {
    setIsLoading(true);
    try {
      const coords = await getCurrentLocation();
      const { latitude, longitude } = coords;

      const addressData = await getAddressFromCoords(latitude, longitude);
      setLocationData(addressData);
      sessionStorage.setItem("userLocation", JSON.stringify(addressData));
      token ? searchLoc(addressData) : "";
      return addressData;
    } catch (error) {
      console.error("❌ Location error:", error);

      if (error.message === "GEOLOCATION_NOT_SUPPORTED") {
        showGlobalAlert(
          "Your browser doesn't support location services",
          "error"
        );
      } else if (error.code === 1) {
        showGlobalAlert(
          "Location access denied. Please enable location permission in your browser settings.",
          "error"
        );
      } else if (error.code === 2) {
        showGlobalAlert(
          "Unable to determine your location. Please check your device settings.",
          "error"
        );
      } else if (error.code === 3) {
        showGlobalAlert(
          "Location request timed out. Please try again.",
          "error"
        );
      } else {
        showGlobalAlert(
          "Unable to detect your location. Please try again or enter manually.",
          "error"
        );
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  };

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
        login(response.results.token);
        showGlobalAlert(response.message, "success");
        document.getElementById("closeOtpModal").click();
        refetch();
        locationData ? searchLoc(locationData) : "";
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
  const searchLoc = async (add) => {
    const formData = {
      address: add,
    };
    try {
      const response = await searchLocation(formData);
      if (!response.error) {
        refetch2();
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
      <header className="header">
        <div className="container">
          <div className="header-wrapper">
            <div className="row g-3 align-items-center">
              <div className="col-3 mb-md-4 mb-lg-0 col-md-6 col-lg-2 col-xl-1">
                {/* Logo */}
                <Link to="/" className="logo">
                  <img
                    src="../../assets/image/project/logo.svg"
                    alt="Bitezio Logo"
                  />
                </Link>
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
                      {isloading ? (
                        <i
                          class="fas fa-circle-notch fa-spin"
                          style={{ color: "#e46a15" }}
                        ></i>
                      ) : (
                        <span className="icon">
                          <img
                            src="../../assets/image/icons/MapPin.svg"
                            alt=""
                          />
                        </span>
                      )}

                      {locationData?.formattedShort
                        ? locationData?.formattedShort
                        : isloading
                        ? "Fetching your location..."
                        : "Enter your delivery location"}
                    </div>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="locationDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item current-loc pb-2"
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleDetectLocation();
                        }}
                      >
                        <div className="row">
                          <div className="col-auto pe-0">
                            {isloading ? (
                              <i class="fas fa-circle-notch fa-spin"></i>
                            ) : (
                              <i class="fas fa-location"></i>
                            )}
                          </div>

                          <div className="col">
                            Detech current location <br />{" "}
                            <span>Using GPS</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    {token && recentLocation?.length ? (
                      <>
                        <li>
                          <a
                            className="dropdown-item my-2 "
                            style={{ fontWeight: "500" }}
                          >
                            Recent Locations
                          </a>
                        </li>
                        {recentLocation?.map((item) => (
                          <li>
                            <Link
                              className="dropdown-item"
                              to=""
                              key={item._id}
                              onClick={() => {
                                setLocationData(item.address);
                                sessionStorage.setItem(
                                  "userLocation",
                                  JSON.stringify(item.address)
                                );
                              }}
                            >
                              <i class="fas fa-clock me-2"></i>
                              {item?.address?.formattedShort}{" "}
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                    <li>
                      <Link
                        className="dropdown-item"
                        to=""
                        onClick={() => {
                          setLocationData({
                            fullAddress:
                              "123 Demo Street, Sample Nagar, Test City, Test State, 123456",
                            locality: "Sample Nagar",
                            city: "Test City",
                            state: "Test State",
                            country: "Testland",
                            postcode: "123456",
                            formattedShort:
                              "Sample Nagar, Test City, Test State",
                            coordinates: { lat: 28.6139, lng: 77.209 },
                          });
                          sessionStorage.setItem(
                            "userLocation",
                            JSON.stringify({
                              fullAddress:
                                "123 Demo Street, Sample Nagar, Test City, Test State, 123456",
                              locality: "Sample Nagar",
                              city: "Test City",
                              state: "Test State",
                              country: "Testland",
                              postcode: "123456",
                              formattedShort:
                                "Sample Nagar, Test City, Test State",
                              coordinates: { lat: 28.6139, lng: 77.209 },
                            })
                          );
                        }}
                      >
                        <i class="fas fa-clock me-2"></i>
                        Sample Nagar, Test City, Test State
                      </Link>
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
                    <img
                      src="../../assets/image/icons/MagnifyingGlass.svg"
                      alt=""
                    />
                  </span>
                  <div
                    className="search-dropdown-content d-none"
                    id="search-dropdown"
                  >
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="../../assets/image/products/p-1.png"
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
                          src="../../assets/image/products/p-1.png"
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
                          src="../../assets/image/products/p-1.png"
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
                          src="../../assets/image/products/p-1.png"
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
                          src="../../assets/image/products/p-1.png"
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
                    <div className="dropdown auth-profile">
                      <Link
                        to=""
                        role="button"
                        id="profileDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div
                          className="d-flex gap-2 align-items-center text-white fs-6 fw-semibold
                                        text-underline-none"
                        >
                          <img
                            src="../../assets/image/icons/UserCircle.svg"
                            alt=""
                          />
                          Profile
                        </div>
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="profileDropdown"
                      >
                        <li>
                          <Link className="dropdown-item" to="/my-orders">
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/my-profile">
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              setLocationData(null);
                              logout();
                              navigate("/");
                            }}
                          >
                            Log Out
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <Link to="/cart" className="addToCart btn-comman">
                      <div className="d-flex gap-2">
                        <img
                          src="../../assets/image/icons/ShoppingCart.svg"
                          alt=""
                        />
                        <span className="d-none d-md-block"> 2 items</span>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="auth">
                    <button
                      className="border-0 bg-transparent text-white"
                      data-bs-toggle="modal"
                      data-bs-target="#addressModal"
                      onClick={() => setType(1)}
                    >
                      Login
                    </button>
                    <a
                      href="#"
                      className="signup btn-comman"
                      data-bs-toggle="modal"
                      data-bs-target="#addressModal"
                      onClick={() => setType(2)}
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
              src="../../assets/image/icons/bike.svg"
              alt="Delivery"
              width={100}
              className="mx-auto mb-3"
            />
            <h5 className="mb-3 modal-heading">
              {type === 2 ? "Sign Up" : "Login"}
            </h5>
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
              src="../../assets/image/icons/bike.svg"
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
