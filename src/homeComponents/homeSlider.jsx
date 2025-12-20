import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    customPaging: () => <div className="custom-dot" />,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <section className="banner">
      <div className="container comman-spacing-top-bottom">
        <Slider {...settings}>
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
          </div>{" "}
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
          </div>{" "}
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
          </div>
        </Slider>
      </div>
      <style jsx>{`
        .custom-dots {
          bottom: -50px;
        }
        .custom-dots li {
          width: 8px;
          height: 8px;
        }
        .custom-dots li.slick-active .custom-dot {
          background-color: var(--main);
        }

        .custom-dot {
          width: 8px;
          height: 8px;
          border-radius: 100px;
          transition: all 0.3s ease-in-out;
          background-color: var(--text-light);
        }
      `}</style>
    </section>
  );
};

const CustomPrevArrow = ({ onClick }) => (
  <button className="slide-btn prevv" onClick={onClick}>
    <img src="assets/image/icons/angle-left.svg" alt="" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="slide-btn nextt" onClick={onClick}>
    <img src="assets/image/icons/angle-right.svg" alt="" />
  </button>
);

export default BannerSlider;
