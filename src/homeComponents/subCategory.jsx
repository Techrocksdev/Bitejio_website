import React, { useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../apiServices/home/homeHttpService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

function SubCategory() {
  const [itemsPerSlide, setItemsPerSlide] = useState(12);
  const { data: response, isLoading } = useQuery({
    queryKey: ["subCategoryListHome"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        categoryId: "",
        allSubcategory: true,
        search: "",
      };
      return getCategory(formData);
    },
  });

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setItemsPerSlide(4); // 2x2 grid on mobile
      } else if (width < 768) {
        setItemsPerSlide(6); // 2x3 grid on small tablets
      } else if (width < 992) {
        setItemsPerSlide(8); // 2x4 grid on tablets
      } else if (width < 1200) {
        setItemsPerSlide(10); // 2x5 grid on small desktops
      } else {
        setItemsPerSlide(12); // 2x6 grid on large screens
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const categories = response?.results?.categories;

  const groupedCategories = useMemo(() => {
    if (!categories) return [];
    const groups = [];
    for (let i = 0; i < categories.length; i += itemsPerSlide) {
      groups.push(categories.slice(i, i + itemsPerSlide));
    }
    return groups;
  }, [categories, itemsPerSlide]);

  const NextArrow = ({ onClick, currentSlide, slideCount }) => {
    const isDisabled = currentSlide === slideCount - 1;
    return (
      <button
        className={`slide nex active ${isDisabled ? "slick-disabled" : ""}`}
        onClick={!isDisabled ? onClick : undefined}
        disabled={isDisabled}
        aria-label="Next slide"
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
        aria-label="Previous slide"
      >
        <img src="assets/image/icons/CaretLeft.svg" alt="" />
      </button>
    );
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };

  return (
    <section className="top-category">
      <div className="container comman-spacing-top-bottom">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="heading">Top Sub Categories</h2>
        </div>
        <div className="row justify-content-center g-5">
          {isLoading ? (
            <>
              {[...Array(12)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="col-6 col-sm-4 col-md-3 col-lg-2"
                >
                  <Link to="">
                    <div
                      className="category-img m-auto wow animate__animated animate__zoomIn"
                      data-wow-delay="0.2s"
                    >
                      <Skeleton />
                    </div>
                    <h2 className="category-text mt-3">
                      <Skeleton />
                    </h2>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <Slider {...settings}>
              {groupedCategories.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <div className="row justify-content-center g-5">
                    {group.map((category) => (
                      <div
                        key={category._id}
                        className="col-6 col-sm-4 col-md-3 col-lg-2"
                      >
                        <Link to={`/products/${category?.parentCategoryId}`}>
                          <div className="category-img m-auto">
                            <img
                              src={category.image}
                              alt={category.name_en}
                              className="img-fluid"
                            />
                          </div>
                          <h3 className="category-text mt-3">
                            {category.name_en}
                          </h3>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}

export default React.memo(SubCategory);
