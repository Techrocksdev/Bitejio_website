import React from "react";
import Header from "./header";
import Footer from "./footer";

function About() {
  return (
    <>
      <Header />

      <section className="order-confirmed-list">
        <div className="container comman-spacing-top-bottom">
          <div className="row term">
            <div className="col-12 px-4">
              <h3 className="heading fs-5 mb-4">About Bitezio</h3>

              <p>At Bitezio, we're redefining the way your city eats.</p>

              <p>
                We are a technology-driven food delivery platform built to
                connect people with the best local restaurants, seamlessly and
                reliably. From everyday favorites to hidden culinary gems,
                Bitezio brings a curated dining experience straight to your
                doorstep.
              </p>

              <p>
                Our platform is designed with one goal in mind:{" "}
                <strong>effortless food ordering</strong>. By combining smart
                technology, trusted restaurant partnerships, and efficient
                delivery, we ensure every order meets our standards of quality,
                speed, and reliability.
              </p>

              <h3 className="heading fs-5 mt-4">What Drives Us</h3>
              <ul>
                <li>
                  <strong>Local-first approach</strong> – empowering restaurants
                  in your city
                </li>
                <li>
                  <strong>Quality over everything</strong> – from food
                  preparation to delivery
                </li>
                <li>
                  <strong>Customer-centric design</strong> – simple, intuitive,
                  and fast
                </li>
                <li>
                  <strong>Consistency you can trust</strong> – every order,
                  every time
                </li>
              </ul>

              <p>
                At Bitezio, we believe great food deserves great delivery. We're
                not just delivering meals—we're delivering convenience, choice,
                and a better everyday dining experience.
              </p>

              <p>
                <strong>
                  Bitezio — where local flavors meet modern delivery.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default React.memo(About);
