import React, { useState } from "react";
import Header from "../homeComponents/header";
import Footer from "../homeComponents/footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  addToCart,
  getSimilarProduct,
  updateCartQuantity,
  viewProduct,
} from "../apiServices/home/homeHttpService";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { showGlobalAlert } from "../commonComponents/useGlobalAlert";
import { RotatingLines } from "react-loader-spinner";
import ProductCard from "./productCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useUserAuth } from "../commonComponents/authContext";

function ProductDetails() {
  let { id } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [variantId, setVariantId] = useState("");
  const [loader, setLoader] = useState(false);
  const { token, refetch } = useUserAuth();

  const {
    data: details,
    isLoading,
    refetch: refetch1,
  } = useQuery({
    queryKey: ["proDetails", id],
    queryFn: () => viewProduct(id),
    onError: (error) => {
      console.log(error);
    },
    select: (data) => data.results.product[0],
  });
  console.log(details);

  const images = details?.images?.map((img) => ({ src: img })) || [];
  const thumbnailImages = details?.images?.slice(0, 4) || [];
  const remainingCount = (details?.images?.length || 0) - 4;

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const addCart = async () => {
    if (!variantId) {
      showGlobalAlert("Please select combination", "error");
      return;
    }
    setLoader(true);
    const formData = {
      productId: id,
      variantId: variantId,
      quantity: 1,
    };

    try {
      const response = await addToCart(formData);
      if (!response.error) {
        document.querySelector(`#cartModal [data-bs-dismiss="modal"]`).click();
        showGlobalAlert(response.message, "success");
        refetch1();
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

  const {
    data: response2,
    isLoading: isLoading2,
    refetch: refetch2,
  } = useQuery({
    queryKey: ["similarProductList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        search: "",
      };
      return getSimilarProduct(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const similarProducts = response2?.results?.products || [];
  const NextArrow2 = ({ onClick, currentSlide, slideCount }) => {
    const isDisabled =
      currentSlide + sliderSettings2.slidesToShow >= slideCount;
    return (
      <button
        className={`slide nex active ${isDisabled ? "slick-disabled" : ""}`}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
      >
        <img src="../../assets/image/icons/CaretRight.svg" alt="" />
      </button>
    );
  };

  const PrevArrow2 = ({ onClick, currentSlide }) => {
    const isDisabled = currentSlide === 0;
    return (
      <button
        className={`slide pre active ${isDisabled ? "slick-disabled" : ""}`}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
      >
        <img src="../../assets/image/icons/CaretLeft.svg" alt="" />
      </button>
    );
  };

  const sliderSettings2 = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <NextArrow2 />,
    prevArrow: <PrevArrow2 />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const updateQuantity = async (item, change, e) => {
    e.preventDefault();

    const newQuantity = item.cartQuantity + change;

    if (newQuantity < 0) return;

    const formData = {
      productId: id,
      variantId: item.variant._id,
      quantity: newQuantity,
    };

    try {
      const response = await updateCartQuantity(formData);
      if (!response.error) {
        showGlobalAlert(response.message, "success");
        refetch1();
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
      <Header />
      <section className="product-details">
        <div className="container comman-spacing-top-bottom">
          <div className="row g-3">
            {isLoading ? (
              <>
                <div className="col-md-8">
                  <div className="product-details-main-img-wrapper position-relative">
                    <div className="product-details-main-img">
                      <Skeleton />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row g-3">
                    <div className="col-3 col-md-6">
                      <div className="product-details-img">
                        <Skeleton />
                      </div>
                    </div>
                    <div className="col-3 col-md-6">
                      <div className="product-details-img">
                        <Skeleton />
                      </div>
                    </div>
                    <div className="col-3 col-md-6">
                      <div className="product-details-img">
                        <Skeleton />
                      </div>
                    </div>
                    <div className="col-3 col-md-6">
                      <div className="product-details-img last">
                        <Skeleton />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-8">
                  <div className="product-details-main-img-wrapper position-relative">
                    <div
                      className="product-details-main-img"
                      onClick={() => openLightbox(0)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={details?.images?.[0]}
                        className="w-100 h-100"
                        alt={details?.name_en || "Product"}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="row g-3">
                    {thumbnailImages.map((img, index) => (
                      <div className="col-3 col-md-6" key={index}>
                        <div
                          className="product-details-img 
                      position-relative"
                          onClick={() => openLightbox(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={img}
                            className="w-100 h-100"
                            alt={`${details?.name_en || "Product"} ${
                              index + 1
                            }`}
                          />

                          {index === 3 && remainingCount > 0 && (
                            <div
                              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                              style={{
                                background: "rgba(0, 0, 0, 0.6)",
                                color: "white",
                                fontSize: "1.3rem",
                                fontWeight: "600",
                              }}
                            >
                              + {remainingCount} more
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={images}
            index={lightboxIndex}
            on={{
              view: ({ index }) => setLightboxIndex(index),
            }}
          />
          {isLoading ? (
            ""
          ) : (
            <>
              <div className="row g-4 mt-1">
                <div className="col-12 col-md-6">
                  <div className="d-flex gap-2 flex-wrap align-items-center ">
                    <p className="text text-dark m-0">
                      <span className="text-danger">Open Now</span> - 10:00 am -
                      11:00 pm
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="d-flex gap-4 flex-wrap align-items-center justify-content-md-end">
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/ShareNetwork.svg"
                        alt=""
                      />
                      <p className="text text-dark m-0">Share</p>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      <img src="../assets/image/icons/Heart.svg" alt="" />
                      <p className="text text-dark m-0">Favorite</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="row justify-content-md-between">
                  <div className="col-md-5">
                    <div className="d-flex gap-2 align-items-center mb-3">
                      <h2 className="heading m-0">{details?.name_en}</h2>
                      <div className="d-flex gap-2 align-items-center">
                        <img src="../assets/image/icons/veg-tag.svg" alt="" />
                        <p className="text m-0">460 Calorie</p>
                      </div>
                    </div>
                    <p className="text mt-1 fs-4 fw-semibold m-0">
                      {details?.userId?.shopName}
                    </p>
                    <p className="text mt-1 fw-medium ">
                      D 102, B block, Connaught Place, New Delhi{" "}
                    </p>
                    <div className="d-flex gap-2 align-items-center ">
                      <img src="../assets/image/icons/Star.svg" alt="" />
                      <span className="text-dark">4.8</span>{" "}
                      <span className="text">(120 Reviews)</span>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="d-flex justify-content-md-end align-items-center gap-3 w-100">
                      <h2 className="heading m-0">
                        ₹{details?.variant?.discountPrice}{" "}
                        <del className="text">₹{details?.variant?.price}</del>
                      </h2>
                      {details?.variant?.price &&
                        details?.variant?.discountPrice && (
                          <div className="badge">
                            {Math.round(
                              ((details.variant.price -
                                details.variant.discountPrice) /
                                details.variant.price) *
                                100
                            )}
                            % OFF
                          </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-md-end mt-4 w-100">
                      <div>
                        {token ? (
                          details?.isAddedInCart && details.cartQuantity > 0 ? (
                            <div className="d-flex align-detailss-center">
                              <div className="add-btn w-100 text-center">
                                <button
                                  onClick={(e) =>
                                    updateQuantity(details, -1, e)
                                  }
                                  disabled={details?.cartQuantity <= 0}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                                <button>{details?.cartQuantity}</button>
                                <button
                                  onClick={(e) => updateQuantity(details, 1, e)}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              className="comman-btn-main w-100"
                              data-bs-toggle="modal"
                              data-bs-target="#cartModal"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              Add to Cart
                            </button>
                          )
                        ) : (
                          <button
                            className="comman-btn-main w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#addressModal"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            Add to Cart
                          </button>
                        )}
                        <div className="d-flex gap-2 align-items-center mt-3 justify-content-center">
                          <img
                            src="../assets/image/icons/bike-gray.svg"
                            className="pb-1"
                            alt=""
                          />
                          <img src="../assets/image/icons/Timer.svg" alt="" />
                          <span className="text m-0">20-25 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      {isLoading ? (
        ""
      ) : (
        <section className="review-overview">
          <div className="container comman-spacing-top-bottom">
            <ul className="nav nav-tabs comman-tabs" id="myTab" role="tablist">
              <li className="nav-item border-0" role="presentation">
                <button
                  className="nav-link active"
                  id="overview-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#overview"
                  type="button"
                  role="tab"
                >
                  Overview
                </button>
              </li>
              <li className="nav-item border-0" role="presentation">
                <button
                  className="nav-link"
                  id="review-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#review"
                  type="button"
                  role="tab"
                >
                  Review
                </button>
              </li>
            </ul>
            <div className="mt-4">
              <div className="tab-content mt-3" id="myTabContent">
                {/* Overview Tab */}
                <div
                  className="tab-pane fade show active text-center"
                  id="overview"
                  role="tabpanel"
                >
                  <p className="text text-start">{details?.description_en}</p>
                </div>
                {/* Review Tab */}
                <div className="tab-pane fade" id="review" role="tabpanel">
                  <h5 className="heading mb-3">Customer Reviews</h5>
                  <div className="list-group">
                    <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <div>
                        <strong>John D.</strong>
                        <br />
                        Great service, delivery was quick!
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <img src="../assets/image/icons/Star.svg" alt="" />
                        <img src="../assets/image/icons/Star.svg" alt="" />
                        <img src="../assets/image/icons/Star.svg" alt="" />
                        <img src="../assets/image/icons/Star.svg" alt="" />
                        <img src="../assets/image/icons/Star.svg" alt="" />
                      </div>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <div>
                        <strong>Sarah K.</strong>
                        <br />
                        Loved the food quality, highly recommend.
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <img src="../assets/image/icons/Star.svg" alt="" />
                        <img src="../assets/image/icons/Star.svg" alt="" />
                        <img src="../assets/image/icons/Star.svg" alt="" />
                        <img src="../assets/image/icons/Star.svg" alt="" />
                        <img src="../assets/image/icons/Star.svg" alt="" />
                      </div>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <div>
                        <strong>Amit R.</strong>
                        <br />
                        Food was good but delivery took longer than expected.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="related-products">
        <div className="container comman-spacing-top-bottom">
          <div className="d-flex align-items-center gap-2 flex-wrap mb-4">
            <h2 className="m-0 heading">You may also like</h2>
          </div>
          <div className="row g-4 ">
            {isLoading2 || isLoading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
                    <a>
                      <div
                        className="custom-card wow animate__animated animate__fadeInUp"
                        data-wow-delay="0.2s"
                      >
                        <div className="custom-card-header">
                          <Skeleton />
                        </div>
                        <div className="custom-card-body">
                          <h2>
                            <Skeleton />
                          </h2>
                          <div>
                            <Skeleton style={{ width: "70%" }} />
                          </div>
                          <div className="mt-4">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center gap-2 w-100 ">
                                <p className="text w-100">
                                  <Skeleton style={{ width: "100%" }} />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </>
            ) : similarProducts?.length ? (
              <Slider {...sliderSettings2}>
                {similarProducts?.map((item) => (
                  <ProductCard item={item} home={true} refetch2={refetch2} />
                ))}
              </Slider>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <Footer />
      <div
        className="modal fade"
        id="cartModal"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-heading m-0">Customise as per your taste</h2>
            </div>

            <div className="modal-body">
              <div className="list-group">
                {details?.variants?.map((itm) => (
                  <label
                    key={itm._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <input
                        className="form-check-input me-2"
                        type="radio"
                        name={itm._id}
                        onChange={() => setVariantId(itm._id)}
                        checked={variantId === itm._id}
                      />
                      {itm?.combination?.[0]?.attributeId?.name_en} (
                      {itm?.combination?.[0]?.valueId?.name_en})
                    </div>
                    <span className="fw-bold">₹{itm.price}</span>
                  </label>
                ))}
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  className="btn btn-light border"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="comman-btn-main"
                  onClick={() => addCart()}
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
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(ProductDetails);
