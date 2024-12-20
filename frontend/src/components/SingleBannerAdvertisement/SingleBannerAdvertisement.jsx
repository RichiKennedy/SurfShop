import React from "react";
import "./SingleBannerAdvertisement.scss";
import { useNavigate } from "react-router-dom";
import useBannerData from "../../Hooks/useBannerData";

const SingleBannerAdvertisement = ({ type }) => {
  const { bannerData, error } = useBannerData(type);
  const navigate = useNavigate();

  const handleNavigation = (categoryTitle) => {
    if (!categoryTitle || !bannerData) return; 

    const category = categoryTitle.toLowerCase();
    const metaCategory =
      bannerData.type === "subCategory"
        ? bannerData.attributes.meta_categories?.data[0]?.attributes?.title?.toLowerCase()
        : bannerData.attributes?.title?.toLowerCase();
    const subCategory =
      bannerData.type === "subCategory"
        ? bannerData.attributes?.title?.toLowerCase()
        : null;

    const path = subCategory
      ? `/products/${category}/${metaCategory}/${subCategory}`
      : `/products/${category}/${metaCategory}`;

    navigate(path);
  };

  const mediaData =
    bannerData?.attributes?.image?.data?.[0]?.attributes || null;

  const mediaUrl = mediaData?.url;
  const fullMediaUrl = mediaUrl
    ? `${process.env.REACT_APP_UPLOAD_URL}${mediaUrl}`
    : null;

  const isVideo = mediaUrl && mediaUrl.toLowerCase().endsWith(".mp4");

  const getDynamicTitle = (type) => {
    switch (type?.toLowerCase()) {
      case "denim":
        return "Denim Love";
      case "dresses":
        return "Elegant Dresses";
      case "headwear":
        return "Top It Off";
      case "knitwear":
        return "Stay Cozy";
      case "new collection":
        return "New Arrivals";
      case "outerwear":
        return "Outerwear Essentials";
      case "pants":
        return "Perfect Fit";
      case "shirts":
        return "Smart Shirts";
      case "t-shirts":
        return "Casual Tees";
      case "accessories":
        return "Essential Accessories";
      default:
        return "Discover More";
    }
  };

  const dynamicTitle = getDynamicTitle(type);

  return (
    <div className="image-advertisement-wrapper">
      {error ? (
        <div className="error">No data found for the provided type.</div>
      ) : bannerData ? (
        <>
        <div className="bg-image-wrapper">
          {fullMediaUrl && (
            isVideo ? (
              <video autoPlay loop muted className="bg-video">
                <source src={fullMediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={fullMediaUrl}
                alt="Advertisement"
                className="bg-image"
              />
            )
          )}

        </div>
          <div className="absolute-content-wrapper">
            <div className="content-title">
              <h4 className="title">{dynamicTitle}</h4>
            <div className="content-buttons">
              {bannerData.attributes?.categories?.data?.map((category) => (
                <span
                className="advert-category-btn"
                key={category.id}
                onClick={() =>
                  handleNavigation(category.attributes?.title)
                }
                >
                  {category.attributes?.title}
                </span>
              ))}
            </div>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SingleBannerAdvertisement;
