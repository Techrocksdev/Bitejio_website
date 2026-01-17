import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerSlider = () => {
  return (
    <section className="banner">
      <div className="container comman-spacing-top-bottom">
        <div style={{ position: "relative" }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".slide-btn.nextt",
              prevEl: ".slide-btn.prevv",
            }}
            pagination={{
              clickable: true,
              el: ".custom-dots",
              bulletClass: "custom-dot",
              bulletActiveClass: "custom-dot-active",
            }}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={500}
          >
            <SwiperSlide>
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
            </SwiperSlide>

            <SwiperSlide>
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
            </SwiperSlide>

            <SwiperSlide>
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
            </SwiperSlide>
          </Swiper>
          <button className="slide-btn prevv d-none d-md-block">
            <img src="assets/image/icons/angle-left.svg" alt="" />
          </button>
          <button className="slide-btn nextt d-none d-md-block">
            <img src="assets/image/icons/angle-right.svg" alt="" />
          </button>

          <div className="custom-dots"></div>
        </div>
      </div>
      <style jsx>{`
        .custom-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
        }

        .custom-dot {
          width: 8px;
          height: 8px;
          border-radius: 100px;
          transition: all 0.3s ease-in-out;
          background-color: var(--text-light);
          cursor: pointer;
        }

        .custom-dot-active {
          background-color: var(--main);
        }
      `}</style>
    </section>
  );
};

export default BannerSlider;
