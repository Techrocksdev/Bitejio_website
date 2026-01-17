import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategory, getProduct } from "../apiServices/home/homeHttpService";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../homeComponents/header";
import Footer from "../homeComponents/footer";
import ProductCard from "./productCard";

function Products() {
  const [subCat, setSubCat] = useState("");

  let { id } = useParams();
  const { data: response, isLoading } = useQuery({
    queryKey: ["subCategoryList", id],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        categoryId: id,
        search: "",
      };
      return getCategory(formData);
    },
  });
  const results = response?.results?.categories;

  const {
    data: response2,
    isLoading: isLoading2,
    isFetching,
    refetch: refetch2,
  } = useQuery({
    queryKey: ["productList", id, subCat],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        categoryId: subCat ? subCat : id,
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
    const isDisabled = currentSlide >= slideCount - 1;
    return (
      <button
        className={`slide-btn next ${isDisabled ? "slick-disabled" : ""}`}
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
    speed: 500,
    arrows: true,
    variableWidth: true,
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
      <Header />
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
                  {results?.map((item) => (
                    <Link
                      to=""
                      onClick={() =>
                        setSubCat(
                          subCat
                            ? subCat === item._id
                              ? ""
                              : item._id
                            : item._id
                        )
                      }
                      key={item._id}
                      className={
                        subCat === item._id
                          ? "category-items-tabs-items active"
                          : "category-items-tabs-items"
                      }
                    >
                      <div>{item.name_en}</div>
                    </Link>
                  ))}
                </Slider>
              )}
            </div>
          </div>
          <div className="row g-4 ">
            {isLoading2 || isLoading || (isFetching && !products.length) ? (
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
              products?.map((item) => (
                <ProductCard item={item} refetch2={refetch2} />
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
      <Footer />
    </>
  );
}

export default React.memo(Products);
