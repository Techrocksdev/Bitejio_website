import React from "react";

function Footer() {
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
                    <div
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                    >
                      <img src="../../assets/image/icons/facebook.svg" alt="" />
                    </div>
                    <div
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                    >
                      <img src="../../assets/image/icons/linkedin.svg" alt="" />
                    </div>
                    <div
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                    >
                      <img
                        src="../../assets/image/icons/instagram.svg"
                        alt=""
                      />
                    </div>
                    <div
                      className="social-item wow animate__animated animate__bounceIn"
                      data-wow-delay="0.2s"
                    >
                      <img src="../../assets/image/icons/twitter.svg" alt="" />
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
                      <img src="../../assets/image/icons/call.svg" alt="" />
                      (908) 395-0111, (908) 395-0111.
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      <img src="../../assets/image/icons/email.svg" alt="" />
                      bitezio.brand@bitezio.com
                    </a>
                  </li>
                  <li>
                    <a href="privacy-policy.html" className="footer-link">
                      <img src="../../assets/image/icons/map.svg" alt="" />
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
    </>
  );
}

export default React.memo(Footer);
