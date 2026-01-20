import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../commonComponents/authContext";
import FixedCartStrip from "../commonComponents/strip";

function Footer() {
  const { profile, token } = useUserAuth();
  const location = useLocation();

  return (
    <>
      <footer className="footer">
        <div className="container comman-spacing-top-bottom pb-0">
          <div className="footer-wrapper">
            <div className="row g-3">
              <div
                className="col-md-5 wow animate__animated animate__fadeInLeft"
                data-wow-delay="0.2s"
              >
                <div className="logo">
                  <img src="../../assets/image/project/logo-main.svg" alt="" />
                </div>
                <div className="mt-3">
                  <p className="text">Taste the Difference, Live the Moment</p>
                </div>
                <div className="mt-4">
                  <div className="social-link">
                    <Link
                      to="https://www.instagram.com/bitezio2.o/#"
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                      target="_blank"
                    >
                      <img
                        src="../../assets/image/icons/instagram.svg"
                        alt=""
                      />
                    </Link>
                    <Link
                      to="https://www.facebook.com/people/Bitezioin/61586328885441/?rdid=GnEY11T06bx1kIKS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1G8fEYS77v%2F%3Fref%3D1"
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                      target="_blank"
                    >
                      <img src="../../assets/image/icons/facebook.svg" alt="" />
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="col-md-3 wow animate__animated animate__fadeInUp"
                data-wow-delay="0.4s"
              >
                <ul className="footer-link-wrapper">
                  <li>
                    <h2 className="footer-link-heading">Legal</h2>
                  </li>
                  <li>
                    <Link to="/about-us" className="footer-link">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" className="footer-link">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/term-&-conditions" className="footer-link">
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="col-md-4 wow animate__animated animate__fadeInRight"
                data-wow-delay="0.6s"
              >
                <ul className="footer-link-wrapper">
                  <li>
                    <h2 className="footer-link-heading">Contact Us</h2>
                  </li>

                  <li>
                    <div className="footer-contacts">
                      <a href="tel:+918306650224" className="footer-link">
                        <img
                          src="../../assets/image/icons/call.svg"
                          alt="Call us"
                        />
                        +91 83066 50224
                      </a>

                      <a
                        href="mailto:bitezio2@gmail.com"
                        className="footer-link"
                      >
                        <img
                          src="../../assets/image/icons/email.svg"
                          alt="Email us"
                        />
                        bitezio2@gmail.com
                      </a>
                    </div>
                  </li>
                  <li>
                    <a className="footer-link">
                      <img src="../../assets/image/icons/map.svg" alt="" />
                      Ward no. 28 kalu bass sri dungargargh
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copy-right">© 2025 Bitezio Pvt ltd</div>
        </div>
      </footer>
      {token &&
      !location.pathname.includes("/cart") &&
      !location.pathname.includes("/order-confirmed") ? (
        <FixedCartStrip cartCount={profile?.cartCount} />
      ) : null}
    </>
  );
}

export default React.memo(Footer);
