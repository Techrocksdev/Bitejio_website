import React from "react";

function Home() {
  return (
    <div className="overflow-x-hidden">
      <header className="header">
        <div className="container">
          <div className="header-wrapper">
            <div className="row g-3 align-items-center">
              <div className="col-3 mb-md-4 mb-lg-0 col-md-6 col-lg-2 col-xl-1">
                {/* Logo */}
                <div className="logo">
                  <img src="assets/image/project/logo.svg" alt="Bitezio Logo" />
                </div>
              </div>
              <div className="col-12 order-3 order-md-3 order-xl-2 col-md-6 col-lg-3 col-xl-3">
                {/* Location */}
                <div className="location dropdown">
                  <button
                    className="btn btn-light dropdown-toggle d-flex gap-2 align-items-center justify-content-between"
                    type="button"
                    id="locationDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <span className="icon">
                        <img src="assets/image/icons/MapPin.svg" alt="" />
                      </span>
                      B block Street no. 10, Surajmal
                    </div>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="locationDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        B block Street no. 10, Surajmal
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Sector 21, Noida
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Connaught Place, Delhi
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 order-4 order-md-4 order-xl-3 col-md-6 col-lg-3 col-xl-4">
                {/* Search */}
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Discover restaurants, cuisines, or dishes"
                    id="search"
                  />
                  <span className="search-icon">
                    <img src="assets/image/icons/MagnifyingGlass.svg" alt="" />
                  </span>
                  <div
                    className="search-dropdown-content d-none"
                    id="search-dropdown"
                  >
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                    <div className="search-dropdown-content-item">
                      <div className="img">
                        <img
                          src="assets/image/products/p-1.png"
                          className="w-100 h-100 object-fit-cover"
                          alt=""
                        />
                      </div>
                      <div className="text-area">
                        <h2>Matar Paneer</h2>
                        <p>Royal Kitchen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-9 text-end mb-md-4 mb-lg-0 order-2 order-md-2 order-xl-4 col-md-6 col-lg-3 col-xl-4">
                {/* Auth Buttons */}
                <div className="auth">
                  <a href="#" className="login">
                    Login
                  </a>
                  <a href="#" className="signup btn-comman">
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
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
      <section
        className="top-category wow animate__animated animate__fadeInUp"
        data-wow-delay="0.2s"
      >
        <div className="container comman-spacing-top-bottom">
          <h2 className="heading">Top Categories</h2>
          <div className="row justify-content-center g-5">
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/pizza.svg" alt="" />
              </div>
              <h2 className="category-text">Pizza</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/burger.svg" alt="" />
              </div>
              <h2 className="category-text">Burger</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/paratha.svg" alt="" />
              </div>
              <h2 className="category-text">Paratha</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/north-indian.svg" alt="" />
              </div>
              <h2 className="category-text">North Indian</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/cake.svg" alt="" />
              </div>
              <h2 className="category-text">Cake</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/ice-creame.svg" alt="" />
              </div>
              <h2 className="category-text">Ice Cream</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/biryani.svg" alt="" />
              </div>
              <h2 className="category-text">Biryani</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/chinese.svg" alt="" />
              </div>
              <h2 className="category-text">Chinese</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/kulcha.svg" alt="" />
              </div>
              <h2 className="category-text">Kulcha</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/noodles.svg" alt="" />
              </div>
              <h2 className="category-text">Noodles</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/shake.svg" alt="" />
              </div>
              <h2 className="category-text">Shake</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/shawarma.svg" alt="" />
              </div>
              <h2 className="category-text">Shawarma</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/non-veg.svg" alt="" />
              </div>
              <h2 className="category-text">Non Veg</h2>
            </div>
            <div className="col-auto">
              <div
                className="category-img wow animate__animated animate__zoomIn"
                data-wow-delay="0.2s"
              >
                <img src="assets/image/products/soup.svg" alt="" />
              </div>
              <h2 className="category-text">Soup</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="most-popular">
        <div className="container comman-spacing-top-bottom">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h2 className="heading">Most Popular</h2>
            <div className="d-flex align-items-center gap-3">
              <button className="slide prev">
                <img src="assets/image/icons/CaretLeft.svg" alt="" />
              </button>
              <button className="slide next active">
                <img src="assets/image/icons/CaretRight.svg" alt="" />
              </button>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="custom-card wow animate__animated animate__fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="custom-card-header">
                  <img src="assets/image/products/pizza-p.svg" alt="" />
                </div>
                <div className="custom-card-body">
                  <h2>Margherita Pizza</h2>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src="assets/image/icons/Star.svg"
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
                        <img src="assets/image/icons/watch.svg" alt="" />
                        <p className="text">30-40 min</p>
                      </div>
                      <button className="comman-btn-main w-fit">
                        <div className="d-flex gap-2 align-items-center h-100">
                          <img src="assets/image/icons/plus.svg" alt="" />
                          Add
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="custom-card wow animate__animated animate__fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="custom-card-header">
                  <img
                    src="assets/image/products/Chicken-Biryani-p.svg"
                    alt=""
                  />
                </div>
                <div className="custom-card-body">
                  <h2>Chicken Biryani</h2>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src="assets/image/icons/Star.svg"
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
                        <img src="assets/image/icons/watch.svg" alt="" />
                        <p className="text">30-40 min</p>
                      </div>
                      <button className="comman-btn-main w-fit">
                        <div className="d-flex gap-2 align-items-center h-100">
                          <img src="assets/image/icons/plus.svg" alt="" />
                          Add
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="custom-card wow animate__animated animate__fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="custom-card-header">
                  <img src="assets/image/products/Shahi-Paneer-p.svg" alt="" />
                </div>
                <div className="custom-card-body">
                  <h2>Shahi Paneer</h2>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src="assets/image/icons/Star.svg"
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
                        <img src="assets/image/icons/watch.svg" alt="" />
                        <p className="text">30-40 min</p>
                      </div>
                      <button className="comman-btn-main w-fit">
                        <div className="d-flex gap-2 align-items-center h-100">
                          <img src="assets/image/icons/plus.svg" alt="" />
                          Add
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="custom-card wow animate__animated animate__fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="custom-card-header">
                  <img src="assets/image/products/Malai-Kofta-p.svg" alt="" />
                </div>
                <div className="custom-card-body">
                  <h2>Malai Kofta</h2>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src="assets/image/icons/Star.svg"
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
                        <img src="assets/image/icons/watch.svg" alt="" />
                        <p className="text">30-40 min</p>
                      </div>
                      <button className="comman-btn-main w-fit">
                        <div className="d-flex gap-2 align-items-center h-100">
                          <img src="assets/image/icons/plus.svg" alt="" />
                          Add
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="newly-added">
        <div className="container comman-spacing-top-bottom">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h2 className="heading">Newly Added</h2>
            <div className="d-flex align-items-center gap-3">
              <button className="slide prev">
                <img src="assets/image/icons/CaretLeft.svg" alt="" />
              </button>
              <button className="slide next active">
                <img src="assets/image/icons/CaretRight.svg" alt="" />
              </button>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="custom-card wow animate__animated animate__fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="custom-card-header">
                  <img src="assets/image/products/pizza-p.svg" alt="" />
                </div>
                <div className="custom-card-body">
                  <h2>Margherita Pizza</h2>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src="assets/image/icons/Star.svg"
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
                        <img src="assets/image/icons/watch.svg" alt="" />
                        <p className="text">30-40 min</p>
                      </div>
                      <button className="comman-btn-main w-fit">
                        <div className="d-flex gap-2 align-items-center h-100">
                          <img src="assets/image/icons/plus.svg" alt="" />
                          Add
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="custom-card wow animate__animated animate__fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="custom-card-header">
                  <img
                    src="assets/image/products/Chicken-Biryani-p.svg"
                    alt=""
                  />
                </div>
                <div className="custom-card-body">
                  <h2>Chicken Biryani</h2>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src="assets/image/icons/Star.svg"
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
                        <img src="assets/image/icons/watch.svg" alt="" />
                        <p className="text">30-40 min</p>
                      </div>
                      <button className="comman-btn-main w-fit">
                        <div className="d-flex gap-2 align-items-center h-100">
                          <img src="assets/image/icons/plus.svg" alt="" />
                          Add
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="custom-card wow animate__animated animate__fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="custom-card-header">
                  <img src="assets/image/products/Shahi-Paneer-p.svg" alt="" />
                </div>
                <div className="custom-card-body">
                  <h2>Shahi Paneer</h2>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src="assets/image/icons/Star.svg"
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
                        <img src="assets/image/icons/watch.svg" alt="" />
                        <p className="text">30-40 min</p>
                      </div>
                      <button className="comman-btn-main w-fit">
                        <div className="d-flex gap-2 align-items-center h-100">
                          <img src="assets/image/icons/plus.svg" alt="" />
                          Add
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="custom-card wow animate__animated animate__fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="custom-card-header">
                  <img src="assets/image/products/Malai-Kofta-p.svg" alt="" />
                </div>
                <div className="custom-card-body">
                  <h2>Malai Kofta</h2>
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      src="assets/image/icons/Star.svg"
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
                        <img src="assets/image/icons/watch.svg" alt="" />
                        <p className="text">30-40 min</p>
                      </div>
                      <button className="comman-btn-main w-fit">
                        <div className="d-flex gap-2 align-items-center h-100">
                          <img src="assets/image/icons/plus.svg" alt="" />
                          Add
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      <footer className="footer">
        <div className="container comman-spacing-top-bottom pb-0">
          <div className="footer-wrapper">
            <div className="row g-3">
              <div
                className="col-md-5 wow animate__animated animate__fadeInLeft"
                data-wow-delay="0.2s"
              >
                <div className="logo">
                  <img src="assets/image/project/logo-main.svg" alt="" />
                </div>
                <div className="mt-3">
                  <p className="text">Taste the Difference, Live the Moment</p>
                </div>
                <div className="mt-4">
                  <div className="social-link">
                    <div
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                    >
                      <img src="assets/image/icons/facebook.svg" alt="" />
                    </div>
                    <div
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                    >
                      <img src="assets/image/icons/linkedin.svg" alt="" />
                    </div>
                    <div
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                    >
                      <img src="assets/image/icons/instagram.svg" alt="" />
                    </div>
                    <div
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                    >
                      <img src="assets/image/icons/twitter.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-auto pe-5 wow animate__animated animate__fadeInUp"
                data-wow-delay="0.3s"
              >
                <ul className="footer-link-wrapper">
                  <li>
                    <h2 className="footer-link-heading">Company</h2>
                  </li>
                  <li>
                    <a href="about-us.html" className="footer-link">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Bitezio
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Team
                    </a>
                  </li>
                </ul>
              </div>
              <div
                className="col-md-3 col-lg-2 wow animate__animated animate__fadeInUp"
                data-wow-delay="0.4s"
              >
                <ul className="footer-link-wrapper">
                  <li>
                    <h2 className="footer-link-heading">Legal</h2>
                  </li>
                  <li>
                    <a href="tmc.html" className="footer-link">
                      Terms and Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href="privacy-policy.html" className="footer-link">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div
                className="col-md-12 col-lg-3 wow animate__animated animate__fadeInRight"
                data-wow-delay="0.6s"
              >
                <ul className="footer-link-wrapper">
                  <li>
                    <h2 className="footer-link-heading">Contact Us</h2>
                  </li>
                  <li>
                    <a href="tmc.html" className="footer-link">
                      <img src="assets/image/icons/call.svg" alt="" />
                      (908) 395-0111, (908) 395-0111.
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      <img src="assets/image/icons/email.svg" alt="" />
                      bitezio.brand@bitezio.com
                    </a>
                  </li>
                  <li>
                    <a href="privacy-policy.html" className="footer-link">
                      <img src="assets/image/icons/map.svg" alt="" />
                      175 Morristown Road, Ste. 103 Basking Ridge, NJ 07920
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copy-right">© 2025 Bitezio Pvt ltd</div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
