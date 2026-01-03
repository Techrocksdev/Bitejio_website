import React from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getNotifications } from "../apiServices/home/homeHttpService";
import Header from "./header";
import Footer from "./footer";

function Notifications() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["notificationsList"],
    queryFn: async () => {
      const formData = {
        page: 1,
        pageSize: 1000,
      };
      return getNotifications(formData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const results = response?.results?.notifications || [];

  function getTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = now - past;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 5) return "Just now";
    if (years > 0) return years === 1 ? "1 year ago" : `${years} years ago`;
    if (months > 0)
      return months === 1 ? "1 month ago" : `${months} months ago`;
    if (days > 0) return days === 1 ? "1 day ago" : `${days} days ago`;
    if (hours > 0) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    if (minutes > 0)
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }

  return (
    <>
      <Header />
      <section className="my-order">
        <div className="container comman-spacing-top-bottom">
          <h2 className="heading">Notifications</h2>
          <div className="comman-spacing-top-bottom">
            <div className="col-md-12">
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <div
                    className="row notification_row align-items-center"
                    key={index}
                  >
                    <div className="col-md-auto mb-mb-0 mb-3">
                      <div className="noti_pic">
                        <Skeleton />
                      </div>
                    </div>
                    <div className="col ps-md-0 mb-mb-0 mb-3">
                      <div className="noti_txt">
                        <h2>
                          <Skeleton style={{ width: "70%" }} />
                        </h2>
                        <p className="mb-0">
                          <Skeleton style={{ width: "80%" }} />
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : results?.length ? (
                results?.map((item, index) => (
                  <div
                    className="row notification_row align-items-center unread"
                    key={index}
                  >
                    <div className="col-auto">
                      <div className="noti_pic">
                        <img
                          src="../../assets/image/icons/notification-bell.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="noti_txt">
                        <h2>{item.title_en}</h2>
                        <p className="mb-0">{item.description_en}</p>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="timenoti">
                        {getTimeAgo(item.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-5 no-data mx-auto d-flex flex-column justify-content-center align-items-center">
                  <img
                    src="../assets/image/products/noData.avif"
                    alt="nodata"
                    loading="lazy"
                  />
                  <p>
                    No Results Found!
                    <br />
                    We couldn’t find any matches.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default React.memo(Notifications);
