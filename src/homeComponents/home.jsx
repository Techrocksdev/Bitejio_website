import React from "react";
import Header from "./header";
import Category from "./category";
import Footer from "./footer";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../apiServices/home/homeHttpService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../productComponents/productCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["mostPopularList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        search: "",
        type: "Popular",
      };
      return getProduct(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const popularProducts = response?.results?.products || [];

  const { data: response2, isLoading: isLoading2 } = useQuery({
    queryKey: ["newProductList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        search: "",
        type: "New",
      };
      return getProduct(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const newProducts = response2?.results?.products || [];

  const NextArrow = ({ onClick, currentSlide, slideCount }) => {
    const isDisabled = currentSlide + sliderSettings.slidesToShow >= slideCount;
    return (
      <button
        className={`slide nex active ${isDisabled ? "slick-disabled" : ""}`}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
      >
        <img src="assets/image/icons/CaretRight.svg" alt="" />
      </button>
    );
  };

  const PrevArrow = ({ onClick, currentSlide }) => {
    const isDisabled = currentSlide === 0;
    return (
      <button
        className={`slide pre active ${isDisabled ? "slick-disabled" : ""}`}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
      >
        <img src="assets/image/icons/CaretLeft.svg" alt="" />
      </button>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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

  const NextArrow2 = ({ onClick, currentSlide, slideCount }) => {
    const isDisabled =
      currentSlide + sliderSettings2.slidesToShow >= slideCount;
    return (
      <button
        className={`slide nex active ${isDisabled ? "slick-disabled" : ""}`}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
      >
        <img src="assets/image/icons/CaretRight.svg" alt="" />
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
        <img src="assets/image/icons/CaretLeft.svg" alt="" />
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

  return (
    <>
      <Header />
      <section
        className="banner wow animate__animated animate__zoomIn"
        data-wow-delay="0.3s"
      >
        <div className="container comman-spacing-top-bottom">
          <div className="banner-wrapper">
            <img src="assets/image/banner/banner-2.png" alt="" />
            <div className="content">
              <h1>
                Get up to <br />
                <span>50%</span>
                OFF
              </h1>
              <p>when you order food worth ₹599 or more</p>
              <button className="comman-btn-main">Grab the Offer</button>
            </div>
            <button className="slide-btn prev">
              <img src="assets/image/icons/angle-left.svg" alt="" />
            </button>
            <button className="slide-btn next">
              <img src="assets/image/icons/angle-right.svg" alt="" />
            </button>
          </div>
          <div className="dot-wrapper">
            <div className="dot active" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
      </section>
      <Category />
      <section className="most-popular">
        <div className="container comman-spacing-top-bottom">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h2 className="heading">Most Popular</h2>
          </div>
          <div className="row g-4 ">
            {isLoading ? (
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
            ) : popularProducts?.length ? (
              <Slider {...sliderSettings}>
                {popularProducts?.map((item) => (
                  <ProductCard item={item} home={true} />
                ))}
              </Slider>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <section className="newly-added">
        <div className="container comman-spacing-top-bottom">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h2 className="heading">Newly Added</h2>
          </div>
          <div className="row g-4 ">
            {isLoading2 ? (
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
            ) : newProducts?.length ? (
              <Slider {...sliderSettings2}>
                {newProducts?.map((item) => (
                  <ProductCard item={item} home={true} />
                ))}
              </Slider>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <section
        className="banner-2 wow animate__animated animate__fadeIn"
        data-wow-delay="0.2s"
      >
        <div className="comman-spacing-top-bottom">
          <div className="banner-2-wrapper">
            <div className="container">
              <div className="content">
                <h2>Craving Something Delicious?</h2>
                <p>
                  Fresh food at your doorstep in minutes! Order now and satisfy
                  your hunger with the best cuisines in town.
                </p>
                <button className="comman-btn-white">
                  <div className="d-flex gap-2 align-items-center">
                    <img src="assets/image/icons/knif-spoon.svg" alt="" />
                    Order Now
                  </div>
                </button>
                <div className="mt-5">
                  <div className="d-flex gap-5 align-items-center flex-wrap justify-content-center">
                    <div className="d-flex align-items-center gap-3 banner-icon-wrapper">
                      <div className="icon-box">
                        <img src="assets/image/icons/clock.svg" alt="" />
                      </div>
                      <div>
                        <h4>Doorstep Delivery</h4>
                        <p>Under 30 min</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 banner-icon-wrapper">
                      <div className="icon-box">
                        <img src="assets/image/icons/sheild.svg" alt="" />
                      </div>
                      <div>
                        <h4>Hygiene Guaranteed</h4>
                        <p>Strict cleanliness standards</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 banner-icon-wrapper">
                      <div className="icon-box">
                        <img src="assets/image/icons/Star-white.svg" alt="" />
                      </div>
                      <div>
                        <h4>Quality Food</h4>
                        <p>Fresh &amp; Hot heals</p>
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
      {/* Pincode Modal */}
      <div
        className="modal fade"
        id="areaModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-width">
          <div className="modal-content text-center p-4">
            <img
              src="assets/image/icons/bike.svg"
              alt="Delivery"
              width={100}
              className="mx-auto mb-3"
            />
            <h5 className="mb-3 modal-heading">
              Let’s find out if we can bring the food to you{" "}
            </h5>
            <input
              type="text"
              className="form-control border border-2 mb-3"
              placeholder="Enter Pin Code"
            />
            <button className="comman-btn-main rounded-pill mx-auto">
              Check My Area
            </button>
          </div>
        </div>
      </div>
      {/* Notify Me Modal  */}
      <div
        className="modal fade"
        id="notifyModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-width">
          <div className="modal-content text-center p-4">
            <img
              src="assets/image/icons/bike.svg"
              alt="Delivery"
              width={100}
              className="mx-auto mb-3"
            />
            <h5 className="mb-3 modal-heading">
              Not in your area yet, but we’ll be there soon 🚀
            </h5>
            <input
              type="text"
              className="form-control border border-2 mb-3"
              placeholder="Enter Pin Code"
            />
            <button className="comman-btn-main rounded-pill mx-auto">
              Notify Me
            </button>
            <a
              href
              className="text-center text-center text-dark text-decoration-underline"
            >
              Browse Menu
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Home);
