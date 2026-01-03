import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AuthProvider } from "./commonComponents/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./commonComponents/scrollToTop";
import ProtectedRoute from "./commonComponents/protectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./homeComponents/notification";
const Search = lazy(() => import("./homeComponents/search"));
const OrderPlaced = lazy(() => import("./homeComponents/orderPlaced"));
const ProductDetails = lazy(() => import("./productComponents/productDetails"));
const Cart = lazy(() => import("./homeComponents/cart"));
const Profile = lazy(() => import("./homeComponents/profile"));
const Orders = lazy(() => import("./homeComponents/orders"));
const Addresses = lazy(() => import("./homeComponents/addresses"));

const Home = lazy(() => import("./homeComponents/home"));
const Products = lazy(() => import("./productComponents/products"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 2,
    },
  },
});

const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const OfflineScreen = () => (
  <div className="offline-container pb-5">
    <img
      src="/assets/image/project/internet.gif"
      alt="No Internet Connection"
      className="offline-image"
      loading="lazy"
    />
    <h1 className="offline-title">You are offline!</h1>
    <p className="offline-message text-center">
      It seems that your internet connection is lost. <br />
      Please check your connection and try reloading the page.
    </p>
    <button
      className="comman-btn-main mt-3"
      onClick={() => window.location.reload()}
    >
      Retry
    </button>
  </div>
);

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (!localStorage.getItem("uid-bit-user")) {
      localStorage.setItem("uid-bit-user", uuidv4());
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <OfflineScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Suspense fallback={<LoadingFallback />}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<Products />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path="/search" element={<Search />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/my-profile" element={<Profile />} />
                <Route path="/my-orders" element={<Orders />} />
                <Route path="/my-addresses" element={<Addresses />} />
                <Route path="/order-confirmed/:id" element={<OrderPlaced />} />
                <Route path="/notifications" element={<Notification />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
