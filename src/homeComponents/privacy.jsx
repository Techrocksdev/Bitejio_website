import React from "react";
import Header from "./header";
import Footer from "./footer";

function Privacy() {
  return (
    <>
      <Header />

      <section className="order-confirmed-list">
        <div className="container comman-spacing-top-bottom">
          <div className="row term">
            <div className="col-12 px-4">
              <h3 className="heading fs-5 mb-4">Privacy Policy for Bitezio</h3>
              <p>
                <strong>Effective Date:</strong> 01-01-2026
              </p>
              <p>
                At Bitezio, your privacy is important to us. This Privacy Policy
                explains how we collect, use, disclose, and protect your
                personal information when you use our website and services.
              </p>
              <p>
                By accessing or using www.bitezio.in (the “Website”), you agree
                to the terms of this Privacy Policy.
              </p>

              <h3 className="heading fs-5 mt-4">1. Information We Collect</h3>
              <p>
                When you use Bitezio, we may collect the following information.
              </p>

              <h4>a. Personal Information</h4>
              <ul>
                <li>Name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Delivery address</li>
                <li>
                  Payment-related details (processed securely via third-party
                  payment gateways)
                </li>
              </ul>

              <h4>b. Order Information</h4>
              <ul>
                <li>Restaurant selected</li>
                <li>Food items ordered</li>
                <li>Order history and preferences</li>
              </ul>

              <h4>c. Technical Information</h4>
              <ul>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Cookies and usage data</li>
              </ul>

              <h3 className="heading fs-5 mt-4">
                2. How We Use Your Information
              </h3>
              <p>We use your information to:</p>
              <ul>
                <li>Process and deliver food orders</li>
                <li>Communicate order updates and customer support</li>
                <li>Improve our website, services, and user experience</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Send promotional offers (only if you opt in)</li>
              </ul>

              <h3 className="heading fs-5 mt-4">3. Sharing of Information</h3>
              <p>We do not sell or rent your personal information.</p>
              <p>We may share your information only with:</p>
              <ul>
                <li>
                  <strong>Partner Restaurants</strong> – to prepare and fulfill
                  your order
                </li>
                <li>Delivery Partners – to deliver your food</li>
                <li>
                  Payment Service Providers – to process payments securely
                </li>
                <li>
                  Legal Authorities – if required by law or to protect our
                  rights
                </li>
              </ul>
              <p>All partners are required to handle your data responsibly.</p>

              <h3 className="heading fs-5 mt-4">4. Cookies Policy</h3>
              <p>Bitezio uses cookies to:</p>
              <ul>
                <li>Enhance user experience</li>
                <li>Remember preferences</li>
                <li>Analyze website traffic</li>
              </ul>
              <p>
                You can disable cookies through your browser settings, but some
                features of the website may not function properly.
              </p>

              <h3 className="heading fs-5 mt-4">5. Data Security</h3>
              <p>
                We take reasonable technical and organizational measures to
                protect your personal information from unauthorized access,
                loss, misuse, or alteration. However, no online system is 100%
                secure.
              </p>

              <h3 className="heading fs-5 mt-4">6. Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your information</li>
                <li>Opt out of promotional communications</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the details
                below.
              </p>

              <h3 className="heading fs-5 mt-4">7. Third-Party Links</h3>
              <p>
                Our website may contain links to third-party websites (such as
                restaurants or payment gateways). We are not responsible for
                their privacy practices or content.
              </p>

              <h3 className="heading fs-5 mt-4">
                8. Changes to This Privacy Policy
              </h3>
              <p>
                Bitezio may update this Privacy Policy from time to time. Any
                changes will be posted on this page with an updated effective
                date.
              </p>

              <h3 className="heading fs-5 mt-4">9. Contact Us</h3>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us at:
              </p>
              <p>
                Bitezio
                <br />
                Email:{" "}
                <a href="mailto:bitezio2@gmail.com">
                  <strong>bitezio2@gmail.com</strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default React.memo(Privacy);
