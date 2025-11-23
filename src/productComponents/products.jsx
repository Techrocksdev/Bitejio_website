import React from "react";
import { Link, useParams } from "react-router-dom";
import { getCategory, getProduct } from "../apiServices/home/homeHttpService";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Products() {
  let { id } = useParams();
  const { data: response, isLoading } = useQuery({
    queryKey: ["subCategoryList", id],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        categoryId: "",
        search: "",
      };
      return getCategory(formData);
    },
  });
  const results = response?.results?.categories;

  const {
    data: response2,
    isLoading2,
    refetch,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        search: "",
      };
      return getProduct(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const products = response2?.results?.products || [];

  const SampleNextArrow = ({ onClick, currentSlide, slideCount }) => {
    const isDisabled = currentSlide === slideCount - 8;
    return (
      <button
        className={` slide-btn next ${isDisabled ? "slick-disabled" : ""}`}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
      >
        <img src="../assets/image/icons/angle-right.svg" alt="Next" />
      </button>
    );
  };

  const SamplePrevArrow = ({ onClick, currentSlide }) => {
    const isDisabled = currentSlide === 0;
    return (
      <button
        className={`slide-btn prev ${isDisabled ? "slick-disabled" : ""}`}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
      >
        <img src="../assets/image/icons/angle-left.svg" alt="Previous" />
      </button>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 8,
    slidesToScroll: 4,
    arrows: true,
    centerPadding: "20px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="product-details">
        <div className="container comman-spacing-top-bottom">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {isLoading ? (
              <div className="w-100">
                <Skeleton height={24} style={{ width: "100%" }} />
              </div>
            ) : (
              <>
                <h2 className="m-0 heading">
                  {results?.[0]?.parentCategory?.name_en}
                </h2>
                <p className="m-0 text dot"> 50+ restaurants</p>
              </>
            )}
          </div>
          <div className="position-relative">
            <div
              className={
                isLoading
                  ? "category-items-tabs d-flex gap-4 px-0"
                  : "category-items-tabs"
              }
            >
              {isLoading ? (
                [...Array(20)].map((_, index) => (
                  <div key={index}>
                    <Skeleton height={42} width={100} />
                  </div>
                ))
              ) : (
                <Slider {...sliderSettings}>
                  {results?.map((item, index) => (
                    <div key={index} className="category-items-tabs-items ">
                      <Link to="">{item.name_en}</Link>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
          <div className="row g-4 ">
            {isLoading2 || isLoading ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <div className="col-md-4 col-lg-4 col-xl-4" key={index}>
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
            ) : products?.length ? (
              products?.map((item, index) => (
                <div key={item._id} className="col-md-4 col-lg-4 col-xl-4">
                  <Link to="">
                    <div
                      className="custom-card wow animate__animated animate__fadeInUp"
                      data-wow-delay="0.2s"
                    >
                      <div className="custom-card-header">
                        <img src={item?.images?.[0]} alt="" />
                      </div>
                      <div className="custom-card-body">
                        <h2>{item.name_en}</h2>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src="../assets/image/icons/Star.svg"
                            className="star"
                            alt=""
                          />
                          <p className="text">4.8</p>
                          <p className="text">Mario’s Kitchen</p>
                        </div>
                        <div className="mt-4">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src="../assets/image/icons/watch.svg"
                                alt=""
                              />
                              <p className="text">30-40 min</p>
                            </div>
                            <button className="comman-btn-main w-fit">
                              <div className="d-flex gap-2 align-items-center h-100">
                                <img
                                  src="../assets/image/icons/plus.svg"
                                  alt=""
                                />
                                Add
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="mt-5 no-data mx-auto d-flex flex-column justify-content-center align-items-center">
                <img
                  src="../assets/image/products/noData.avif"
                  alt="nodata"
                  loading="lazy"
                />
                <p>
                  Uh-oh! Looks like the product you are trying to access,
                  <br />
                  doesn't exist. Please start afresh.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default React.memo(Products);
