import React from "react";
import { Link, useParams } from "react-router-dom";
import { getCategory } from "../apiServices/home/homeHttpService";
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

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={`${className} slide-btn next`}
        style={{ ...style }}
        onClick={onClick}
      >
        <img src="../assets/image/icons/angle-right.svg" alt="" />
      </button>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={`${className}slide-btn prev`}
        style={{ ...style }}
        onClick={onClick}
      >
        <img src="../assets/image/icons/angle-left.svg" alt="" />
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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
            <div className="category-items-tabs px-0">
              {isLoading ? (
                [...Array(30)].map(() => (
                  <div>
                    <Skeleton height={42} width={100} />
                  </div>
                ))
              ) : (
                <Slider {...sliderSettings}>
                  {results?.map((item, index) => (
                    <div className="category-items-tabs-items">
                      <Link to="">{item.name_en}</Link>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img src="../assets/image/products/pizza-p.svg" alt="" />
                  </div>
                  <div className="custom-card-body">
                    <h2>Margherita Pizza</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Mario’s Kitchen</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img
                      src="../assets/image/products/Chicken-Biryani-p.svg"
                      alt=""
                    />
                  </div>
                  <div className="custom-card-body">
                    <h2>Chicken Biryani</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Spice Garden</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img
                      src="../assets/image/products/Shahi-Paneer-p.svg"
                      alt=""
                    />
                  </div>
                  <div className="custom-card-body">
                    <h2>Shahi Paneer</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Punjabi Shan</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img
                      src="../assets/image/products/Malai-Kofta-p.svg"
                      alt=""
                    />
                  </div>
                  <div className="custom-card-body">
                    <h2>Malai Kofta</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Punjabi Shan</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img src="../assets/image/products/pizza-p.svg" alt="" />
                  </div>
                  <div className="custom-card-body">
                    <h2>Margherita Pizza</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Mario’s Kitchen</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img
                      src="../assets/image/products/Chicken-Biryani-p.svg"
                      alt=""
                    />
                  </div>
                  <div className="custom-card-body">
                    <h2>Chicken Biryani</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Spice Garden</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img
                      src="../assets/image/products/Shahi-Paneer-p.svg"
                      alt=""
                    />
                  </div>
                  <div className="custom-card-body">
                    <h2>Shahi Paneer</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Punjabi Shan</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img
                      src="../assets/image/products/Malai-Kofta-p.svg"
                      alt=""
                    />
                  </div>
                  <div className="custom-card-body">
                    <h2>Malai Kofta</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Punjabi Shan</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img src="../assets/image/products/pizza-p.svg" alt="" />
                  </div>
                  <div className="custom-card-body">
                    <h2>Margherita Pizza</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Mario’s Kitchen</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img
                      src="../assets/image/products/Chicken-Biryani-p.svg"
                      alt=""
                    />
                  </div>
                  <div className="custom-card-body">
                    <h2>Chicken Biryani</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Spice Garden</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img
                      src="../assets/image/products/Shahi-Paneer-p.svg"
                      alt=""
                    />
                  </div>
                  <div className="custom-card-body">
                    <h2>Shahi Paneer</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Punjabi Shan</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4">
              <a href="product-details.html">
                <div
                  className="custom-card wow animate__animated animate__fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="custom-card-header">
                    <img
                      src="../assets/image/products/Malai-Kofta-p.svg"
                      alt=""
                    />
                  </div>
                  <div className="custom-card-body">
                    <h2>Malai Kofta</h2>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src="../assets/image/icons/Star.svg"
                        className="star"
                        alt=""
                      />
                      <p className="text">4.8</p>
                      <p className="text">.</p>
                      <p className="text">Punjabi Shan</p>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="../assets/image/icons/watch.svg" alt="" />
                          <p className="text">30-40 min</p>
                        </div>
                        <button className="comman-btn-main w-fit">
                          <div className="d-flex gap-2 align-items-center h-100">
                            <img src="../assets/image/icons/plus.svg" alt="" />
                            Add
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default React.memo(Products);
