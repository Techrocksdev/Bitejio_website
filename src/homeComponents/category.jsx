import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../apiServices/home/homeHttpService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

function Category() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["categoryList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        categoryId: "",
        allSubcategory: false,
        search: "",
      };
      return getCategory(formData);
    },
  });

  const categories = [
    { name: "Pizza", image: "assets/image/products/pizza.svg" },
    { name: "Burger", image: "assets/image/products/burger.svg" },
    { name: "Paratha", image: "assets/image/products/paratha.svg" },
    { name: "North Indian", image: "assets/image/products/north-indian.svg" },
    { name: "Cake", image: "assets/image/products/cake.svg" },
    { name: "Ice Cream", image: "assets/image/products/ice-creame.svg" },
    { name: "Biryani", image: "assets/image/products/biryani.svg" },
    { name: "Chinese", image: "assets/image/products/chinese.svg" },
    { name: "Kulcha", image: "assets/image/products/kulcha.svg" },
    { name: "Noodles", image: "assets/image/products/noodles.svg" },
    { name: "Shake", image: "assets/image/products/shake.svg" },
    { name: "Shawarma", image: "assets/image/products/shawarma.svg" },
    { name: "Non Veg", image: "assets/image/products/non-veg.svg" },
    { name: "Soup", image: "assets/image/products/soup.svg" },
  ];

  const groupedCategories = [];
  for (let i = 0; i < categories.length; i += 12) {
    groupedCategories.push(categories.slice(i, i + 12));
  }
  console.log(groupedCategories);

  const NextArrow = ({ onClick, currentSlide, slideCount }) => {
    const isDisabled = currentSlide === slideCount - 1;
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
  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <section className="top-category position-relative">
      <div className="container comman-spacing-top-bottom">
        <h2 className="heading mb-3">Top Categories</h2>
        <div className="row justify-content-center g-5">
          {isLoading ? (
            <>
              {[...Array(12)].map((_, colIndex) => (
                <div key={colIndex} className="col-2">
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
                    {group.map((category, index) => (
                      <div key={index} className="col-2">
                        <Link to="/product">
                          <div className="category-img m-auto">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="img-fluid"
                            />
                          </div>
                          <h3 className="category-text mt-3">
                            {category.name}
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

export default React.memo(Category);
