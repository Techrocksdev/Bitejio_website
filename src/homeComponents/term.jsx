import React from "react";
import Header from "./header";
import Footer from "./footer";

function OrderPlaced() {
  return (
    <>
      <Header />

      <section className="order-confirmed-list">
        <div className="container comman-spacing-top-bottom">
          <div className="row term">
            <div className="col-12 px-4">
              <h3 className="heading fs-5 mb-4">Terms and Conditions</h3>
              <p>
                <strong>Effective Date:</strong> 01-01-2025
              </p>
              <p>
                Welcome to Bitezio. These Terms and Conditions ("Terms") govern
                your access to and use of the Bitezio website and services. By
                using our website or placing an order, you agree to be bound by
                these Terms.
              </p>
              <p>
                If you do not agree with any part of these Terms, please do not
                use our services.
              </p>

              <h3 className="heading fs-5 mt-4">1. About Bitezio</h3>
              <p>
                Bitezio is an online food delivery platform that enables users
                to order food from partner restaurants within the city. Bitezio
                facilitates ordering, payment, and delivery but does not prepare
                food itself.
              </p>

              <h3 className="heading fs-5 mt-4">2. Eligibility</h3>
              <p>To use Bitezio, you must:</p>
              <ul>
                <li>
                  Be at least 18 years old, or use the platform under parental
                  supervision
                </li>
                <li>
                  Provide accurate and complete information during registration
                  or checkout
                </li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that
                provide false or misleading information.
              </p>

              <h3 className="heading fs-5 mt-4">3. Orders & Acceptance</h3>
              <ul>
                <li>
                  All orders placed through Bitezio are subject to acceptance by
                  the partner restaurant and availability.
                </li>
                <li>
                  Once an order is confirmed, it cannot be modified or cancelled
                  unless explicitly allowed.
                </li>
                <li>
                  Bitezio reserves the right to refuse or cancel any order due
                  to unavailability, pricing errors, or suspected fraudulent
                  activity.
                </li>
              </ul>

              <h3 className="heading fs-5 mt-4">4. Pricing & Payments</h3>
              <ul>
                <li>
                  Prices listed on the website are determined by partner
                  restaurants.
                </li>
                <li>
                  Additional charges such as delivery fees, service fees, or
                  taxes may apply and will be shown at checkout.
                </li>
                <li>
                  Payments are processed securely through third-party payment
                  gateways.
                </li>
                <li>Bitezio does not store your card or payment details.</li>
              </ul>

              <h3 className="heading fs-5 mt-4">5. Delivery</h3>
              <ul>
                <li>
                  Delivery times are estimates and may vary due to traffic,
                  weather, or operational factors.
                </li>
                <li>
                  Customers are responsible for providing accurate delivery
                  information.
                </li>
                <li>
                  If delivery cannot be completed due to incorrect address,
                  unavailability, or refusal to accept the order, no refund may
                  be issued.
                </li>
              </ul>

              <h3 className="heading fs-5 mt-4">6. Cancellations & Refunds</h3>
              <ul>
                <li>
                  Orders once confirmed are generally non-cancellable and
                  non-refundable.
                </li>
                <li>
                  Refunds may be issued in cases of:
                  <ul>
                    <li>Wrong or incomplete orders</li>
                    <li>Poor food quality (subject to review)</li>
                    <li>Failed delivery due to operational issues</li>
                  </ul>
                </li>
              </ul>
              <p>All refund decisions are at Bitezio's discretion.</p>

              <h3 className="heading fs-5 mt-4">7. Food Quality & Liability</h3>
              <ul>
                <li>
                  Partner restaurants are solely responsible for food
                  preparation, quality, hygiene, and compliance with food safety
                  laws.
                </li>
                <li>
                  Bitezio acts as a facilitator and is not liable for
                  food-related issues such as taste, allergies, or health
                  concerns.
                </li>
                <li>
                  Customers are advised to check ingredients and allergen
                  information before ordering.
                </li>
              </ul>

              <h3 className="heading fs-5 mt-4">8. User Responsibilities</h3>
              <p>You agree not to:</p>
              <ul>
                <li>Misuse the platform or engage in fraudulent activities</li>
                <li>
                  Harass delivery partners, restaurant staff, or Bitezio
                  employees
                </li>
                <li>Attempt to disrupt or harm the website or services</li>
              </ul>
              <p>
                Violation of these rules may result in account suspension or
                legal action.
              </p>

              <h3 className="heading fs-5 mt-4">9. Intellectual Property</h3>
              <p>
                All content on the Bitezio website, including logos, text,
                graphics, and software, is the property of Bitezio and protected
                by intellectual property laws. Unauthorized use is strictly
                prohibited.
              </p>

              <h3 className="heading fs-5 mt-4">10. Third-Party Services</h3>
              <p>
                Bitezio may contain links or integrations with third-party
                services. We are not responsible for their content, policies, or
                practices.
              </p>

              <h3 className="heading fs-5 mt-4">11. Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by law, Bitezio shall not be
                liable for:
              </p>
              <ul>
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Delays, service interruptions, or food quality issues</li>
                <li>
                  Losses arising from the use or inability to use the platform
                </li>
              </ul>

              <h3 className="heading fs-5 mt-4">12. Termination</h3>
              <p>
                Bitezio reserves the right to suspend or terminate user access
                at any time, without notice, for violation of these Terms or
                applicable laws.
              </p>

              <h3 className="heading fs-5 mt-4">13. Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of India, and courts of the operating city shall
                have exclusive jurisdiction.
              </p>

              <h3 className="heading fs-5 mt-4">14. Changes to Terms</h3>
              <p>
                Bitezio may update these Terms from time to time. Continued use
                of the platform after changes indicates acceptance of the
                revised Terms.
              </p>

              <h3 className="heading fs-5 mt-4">15. Contact Us</h3>
              <p>
                For any questions or concerns regarding these Terms, please
                contact:
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

export default React.memo(OrderPlaced);
