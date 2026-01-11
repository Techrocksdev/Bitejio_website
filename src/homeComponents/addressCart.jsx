import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { RotatingLines } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import {
  addAddress,
  changeDefaultAddress,
  deleteAddress,
  getMyAddresses,
  updateAddress,
} from "../apiServices/home/homeHttpService";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUserAuth } from "../commonComponents/authContext";

function AddressCart({ setAddDetail }) {
  const savedLocation = JSON.parse(sessionStorage.getItem("userLocation"));
  const [isloading, setIsLoading] = useState(false);
  const [type, setType] = useState("Home");
  const [loader, setLoader] = useState(false);
  const [details, setDetails] = useState({});
  const [editDetails, setEditDetails] = useState({});
  const { profile } = useUserAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (details?.address_line1) {
      setValue("address_line2", details?.address_line2);
      setType(details?.type);
      setEditDetails(details);
    } else {
      reset();
    }
  }, [details]);

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["addressList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
      };
      return getMyAddresses(formData);
    },
  });

  const address = response?.results?.addresses;
  useEffect(() => {
    if (address && address?.length > 0) {
      const defaultAddress = address.find((item) => item.isDefault === true);
      if (defaultAddress) {
        setAddDetail(defaultAddress);
      }
    }
  }, [address]);

  const onSubmit = async (data) => {
    setLoader(true);
    const formData = {
      address_line1: savedLocation?.fullAddress,
      address_line2: data.address_line2,
      postal_code: savedLocation?.postcode,
      city: savedLocation?.city,
      country: savedLocation?.country,
      latitude: savedLocation?.coordinates?.lat,
      longitude: savedLocation?.coordinates?.lng,
      type: type,
    };
    const formData1 = {
      addressId: details?._id,
      address_line1: editDetails?.address_line1
        ? editDetails?.address_line1
        : editDetails?.fullAddress,
      address_line2: data.address_line2,
      postal_code: editDetails?.postal_code
        ? editDetails?.postal_code
        : editDetails?.postcode,
      city: editDetails?.city,
      country: editDetails?.country,
      latitude: editDetails?.coordinates
        ? editDetails?.coordinates?.lat
        : editDetails?.latitude,
      longitude: editDetails?.coordinates
        ? editDetails?.coordinates?.lng
        : editDetails?.longitude,
      type: type,
    };
    try {
      const response = details?.address_line1
        ? await updateAddress(formData1)
        : await addAddress(formData);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        await refetch();
        document.getElementById("closeAddressModal").click();
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
      {
        details?.address_line1
          ? setEditDetails(addressData)
          : sessionStorage.setItem("userLocation", JSON.stringify(addressData));
      }

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

  const removeAdd = async (id) => {
    try {
      const response = await deleteAddress(id);
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
  const defaultAdd = async (id) => {
    try {
      const response = await changeDefaultAddress(id);
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
      <div className="mt-4">
        <div className="mt-3">
          <h2 className="fs-6 fw-normal">Saved Address</h2>
          {isLoading ? (
            <>
              <div className="border rounded px-3 py-3">
                <Skeleton style={{ width: "70%" }} />

                <p className="mb-0 fw-medium">
                  <Skeleton />
                </p>
              </div>
              <div className="border rounded px-3 py-3">
                <Skeleton style={{ width: "70%" }} />

                <p className="mb-0 fw-medium">
                  <Skeleton />
                </p>
              </div>
            </>
          ) : address?.length ? (
            address?.map((item) => (
              <div
                style={{ cursor: "pointer" }}
                key={item._id}
                className={
                  item.isDefault
                    ? "border rounded px-3 py-3 mb-3 d_active"
                    : "border rounded px-3 py-3 mb-3"
                }
                onClick={() => {
                  setAddDetail(item);
                  defaultAdd(item._id);
                }}
              >
                <div className="row align-items-center">
                  <div className="col-auto pe-0">
                    <input
                      key={item._id}
                      type="radio"
                      checked={item.isDefault}
                      className="custom-radio"
                    ></input>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        {item.type}
                        <img
                          src="assets/image/icons/HouseLine.svg"
                          alt=""
                          className="ms-2"
                        />
                      </div>
                      <div
                        className="col-auto pe-0"
                        data-bs-toggle="modal"
                        data-bs-target="#addAddressModal"
                        onClick={() => setDetails(item)}
                      >
                        <Link to="">
                          <img src="assets/image/icons/bxs_edit.svg" alt="" />
                        </Link>
                      </div>
                      <div
                        className="col-auto"
                        onClick={() => removeAdd(item._id)}
                      >
                        <Link>
                          <img src="assets/image/icons/Trash.svg" alt="" />
                        </Link>
                      </div>
                      <p className="mb-0 fw-medium">
                        {item.address_line2} <br />
                        {item.address_line1}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            ""
          )}
        </div>
        <div className="mt-4">
          <div
            className="add-new-address"
            data-bs-toggle="modal"
            data-bs-target="#addAddressModal"
          >
            <img src="assets/image/icons/Plus-gray.svg" alt="" />
            Add New Address
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addAddressModal"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
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
                id="closeAddressModal"
                onClick={() => {
                  setDetails({});
                  reset();
                  setEditDetails({});
                }}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="position-relative mb-3">
                    <input
                      type="text"
                      className="form-control mb-2 ps-5"
                      placeholder="Search for arae, street name..."
                    />
                    <img
                      src="assets/image/icons/MagnifyingGlass.svg"
                      className="position-absolute top-50 translate-y-middle start-0 ms-1"
                      alt=""
                    />
                  </div>
                  <Link
                    className="dropdown-item current-loc p-2 mb-3"
                    to=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleDetectLocation();
                    }}
                    style={{ border: "1px solid var(--border-light)" }}
                  >
                    <div className="row align-items-center">
                      <div className="col-auto pe-0">
                        {isloading ? (
                          <i class="fas fa-circle-notch fa-spin"></i>
                        ) : (
                          <i class="fas fa-location"></i>
                        )}
                      </div>

                      <div className="col">Using current location</div>
                    </div>
                  </Link>
                  <div>
                    <div className="border rounded overflow-hidden">
                      <iframe
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        loading="lazy"
                        src={`https://maps.google.com/maps?q=${
                          editDetails?.coordinates?.lat ||
                          editDetails?.latitude ||
                          savedLocation?.coordinates?.lat
                        },${
                          editDetails?.coordinates?.lng ||
                          editDetails?.longitude ||
                          savedLocation?.coordinates?.lng
                        }&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        title="Location Map"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {!profile?.firstName ? (
                      <>
                        <div className="mb-3">
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
                        <div className="mb-3">
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
                      </>
                    ) : (
                      ""
                    )}
                    <div className="mb-3">
                      <label className="form-label">Delivery details</label>
                      <input
                        type="text"
                        className="form-control"
                        readOnly
                        value={
                          editDetails?.address_line1
                            ? editDetails?.address_line1
                            : editDetails?.formattedShort
                            ? editDetails?.formattedShort
                            : savedLocation?.formattedShort
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.address_line2 ? "input-error" : ""
                        }`}
                        {...register("address_line2", {
                          required: "Address details is required",
                        })}
                        placeholder="Address details*"
                      />
                      {errors.address_line2 && (
                        <p className="form-error">
                          {errors.address_line2.message}
                        </p>
                      )}
                      <span style={{ color: "#6c757d", fontSize: "12px" }}>
                        E.g. Floor, House no.
                      </span>
                    </div>

                    <h6>Save Address As</h6>
                    <div className="save-btns mb-3">
                      <button
                        type="button"
                        onClick={() => setType("Home")}
                        className={
                          type === "Home"
                            ? "btn btn-outline-secondary btn-sm btn-active"
                            : "btn btn-outline-secondary btn-sm"
                        }
                      >
                        Home
                      </button>
                      <button
                        type="button"
                        onClick={() => setType("Work")}
                        className={
                          type === "Work"
                            ? "btn btn-outline-secondary btn-sm btn-active"
                            : "btn btn-outline-secondary btn-sm"
                        }
                      >
                        Work
                      </button>
                      <button
                        type="button"
                        onClick={() => setType("Other")}
                        className={
                          type === "Other"
                            ? "btn btn-outline-secondary btn-sm btn-active"
                            : "btn btn-outline-secondary btn-sm"
                        }
                      >
                        Other
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="comman-btn-main w-100 mt-4 d-block"
                      disabled={loader}
                    >
                      {loader ? (
                        <>
                          <span className="me-2">Wait..</span>
                          <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="20"
                            visible={true}
                          />
                        </>
                      ) : details?.address_line1 ? (
                        "Edit"
                      ) : (
                        "Save"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(AddressCart);
