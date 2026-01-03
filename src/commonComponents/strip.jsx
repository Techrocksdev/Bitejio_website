import React from "react";
import { Link } from "react-router-dom";

const FixedCartStrip = ({ cartCount }) => {
  if (!cartCount || cartCount === 0) return null;

  return (
    <Link to="/cart" className="fixed-bottom cart-strip">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="view-cart-left">
              {cartCount} {cartCount === 1 ? "item" : "items"} added
            </span>
          </div>
          <div className="view-cart-right">
            VIEW CART
            <i class="fa fa-shopping-bag ms-2"></i>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FixedCartStrip;
