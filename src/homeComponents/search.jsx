import React from "react";
import { getProduct } from "../apiServices/home/homeHttpService";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "./header";
import Footer from "./footer";
import ProductCard from "../productComponents/productCard";
import { useUserAuth } from "../commonComponents/authContext";

function Search() {
  const { search } = useUserAuth();
  const {
    data: response2,
    isLoading: isLoading2,
    refetch,
  } = useQuery({
    queryKey: ["productList", search],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
        categoryId: "",
        search: search,
      };
      return getProduct(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const products = response2?.results?.products || [];

  return (
    <>
      <Header />
      <section className="product-details">
        <div className="container comman-spacing-top-bottom">
          <div className="row g-4 ">
            {search ? (
              isLoading2 ? (
                <>
                  {[...Array(6)].map((_, index) => (
                    <div className="col-md-4 col-lg-4 col-xl-4" key={index}>
                      <a>
                        <div
                          className="custom-card wow animate__animated animate__fadeInUp"
                          data-wow-delay="0.2s"
                        >
                          <div className="custom-card-header">
                            <Skeleton />
                          </div>
                          <div className="custom-card-body">
                            <h2>
                              <Skeleton />
                            </h2>
                            <div>
                              <Skeleton style={{ width: "70%" }} />
                            </div>
                            <div className="mt-4">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center gap-2 w-100 ">
                                  <p className="text w-100">
                                    <Skeleton style={{ width: "100%" }} />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </>
              ) : products?.length ? (
                products?.map((item) => (
                  <ProductCard item={item} refetch={refetch} />
                ))
              ) : (
                <div className="mt-5 no-data mx-auto d-flex flex-column justify-content-center align-items-center">
                  <img
                    src="../assets/image/products/noData.avif"
                    alt="nodata"
                    loading="lazy"
                  />
                  <p>
                    Uh-oh! Looks like the product you are trying to access,
                    <br />
                    doesn't exist. Please start afresh.
                  </p>
                </div>
              )
            ) : (
              <div className="mt-5 no-data mx-auto d-flex flex-column justify-content-center align-items-center">
                <img
                  src="../assets/image/products/noData.avif"
                  alt="nodata"
                  loading="lazy"
                />
                <p>
                  To find what you're looking for, please enter what you'd like
                  <br />
                  to search for in the search box above.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default React.memo(Search);
