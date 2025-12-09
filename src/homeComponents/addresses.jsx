import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useUserAuth } from "../commonComponents/authContext";
import { Link } from "react-router-dom";
import AddressCart from "./addressCart";

function Addresses() {
  const { profile } = useUserAuth();
  const [addDetail, setAddDetail] = useState({});

  return (
    <>
      <Header />

      <section className="my-order">
        <div className="container">
          <div className="comman-spacing-top-bottom">
            <h2 className="heading fw-medium">
              Welcome{profile?.firstName ? "," : ""}{" "}
              <span className="fw-semibold">
                {profile?.firstName} {profile?.lastName}
              </span>
            </h2>
            <div className="mt-4">
              <div className="bg-white border shadow rounded-3 px-4 py-3">
                <div className="row">
                  <div className="col-md-3 vh-100 d-none d-lg-block">
                    <div className="my-link-wrapper">
                      <Link to="/my-orders" className="link-item ">
                        <img src="assets/image/icons/Cart.svg" alt="" />
                        <span>My Orders</span>
                      </Link>
                      <Link to="/my-profile" className="link-item ">
                        <img src="assets/image/icons/UserCircle.svg" alt="" />
                        <span>Profile</span>
                      </Link>
                      <Link to="/my-addresses" className="link-item active">
                        <i
                          class="fas fa-location me-3"
                          style={{ color: "#727272" }}
                        ></i>
                        <span>Addresses</span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-9 border-md-start">
                    <div className="px-1 py-3 px-md-4 py-md-4">
                      <h2 className="heading">Manage Addresses</h2>
                      <AddressCart
                        setAddDetail={setAddDetail}
                        addDetail={addDetail}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default React.memo(Addresses);
