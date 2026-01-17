import React from "react";
import Header from "./header";
import Category from "./category";
import Footer from "./footer";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../apiServices/home/homeHttpService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../productComponents/productCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BannerSlider from "./homeSlider";
import SubCategory from "./subCategory";

function Home() {
  const {
    data: response,
    isLoading,
    refetch: refetch1,
  } = useQuery({
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

  const {
    data: response2,
    isLoading: isLoading2,
    refetch: refetch2,
  } = useQuery({
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

  return (
    <>
      <Header />
      <BannerSlider />
      <div className="mt-5"></div>
      <Category />
      <SubCategory />
      <section className="most-popular">
        <div className="container comman-spacing-top-bottom">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="heading">Most Popular</h2>
            {!isLoading && popularProducts?.length > 0 && (
              <div className="d-flex gap-3">
                <button className="swiper-button-prev-popular slide  active">
                  <img src="assets/image/icons/CaretLeft.svg" alt="" />
                </button>
                <button className="swiper-button-next-popular slide  active">
                  <img src="assets/image/icons/CaretRight.svg" alt="" />
                </button>
              </div>
            )}
          </div>
          {isLoading ? (
            <div className="row g-4">
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
            </div>
          ) : popularProducts?.length ? (
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              navigation={{
                nextEl: ".swiper-button-next-popular",
                prevEl: ".swiper-button-prev-popular",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {popularProducts?.map((item) => (
                <SwiperSlide key={item._id}>
                  <ProductCard item={item} refetch2={refetch1} home={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
      </section>
      <section className="newly-added">
        <div className="container comman-spacing-top-bottom">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="heading">Newly Added</h2>
            {!isLoading2 && newProducts?.length > 0 && (
              <div className="d-flex gap-3">
                <button className="swiper-button-prev-new slide  active">
                  <img src="assets/image/icons/CaretLeft.svg" alt="" />
                </button>
                <button className="swiper-button-next-new slide  active">
                  <img src="assets/image/icons/CaretRight.svg" alt="" />
                </button>
              </div>
            )}
          </div>
          {isLoading2 ? (
            <div className="row g-4">
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
            </div>
          ) : newProducts?.length ? (
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              navigation={{
                nextEl: ".swiper-button-next-new",
                prevEl: ".swiper-button-prev-new",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {newProducts?.map((item) => (
                <SwiperSlide key={item._id}>
                  <ProductCard item={item} refetch2={refetch2} home={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
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
              Let's find out if we can bring the food to you{" "}
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
              Not in your area yet, but we'll be there soon 🚀
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
