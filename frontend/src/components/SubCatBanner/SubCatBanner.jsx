import React, { useEffect, useState } from "react";
import "./SubCatBanner.scss";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

const SubCatBanner = ({ type }) => {
    const { data: subCategories } = useFetch("/sub-categories?populate=*");
    const { data: metaCategories } = useFetch("/meta-categories?populate=*");
    const [bannerData, setBannerData] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (subCategories && metaCategories) {
            const subMatch = subCategories.find(
                (sub) => sub.attributes.title.toLowerCase() === type.toLowerCase()
            );
            if (subMatch) {
                setBannerData({
                    type: "subCategory",
                    attributes: subMatch.attributes,
                });
                setError(false);
                return;
            }

            const metaMatch = metaCategories.find(
                (meta) => meta.attributes.title.toLowerCase() === type.toLowerCase()
            );
            if (metaMatch) {
                setBannerData({
                    type: "metaCategory",
                    attributes: metaMatch.attributes,
                });
                setError(false);
                return;
            }

            setBannerData(null);
            setError(true);
        }
    }, [subCategories, metaCategories, type]);

    const handleNavigation = (categoryTitle) => {
        const category = categoryTitle.toLowerCase();
        const metaCategory = bannerData.type === "subCategory"
            ? bannerData.attributes.meta_categories?.data[0]?.attributes.title.toLowerCase()
            : bannerData.attributes.title.toLowerCase();
        const subCategory = bannerData.type === "subCategory"
            ? bannerData.attributes.title.toLowerCase()
            : null;

        const path = subCategory
            ? `/products/${category}/${metaCategory}/${subCategory}` 
            : `/products/${category}/${metaCategory}`; 

        navigate(path);
    };

    return (
        <div className="sub-category-banner">
            {error ? (
                <div className="error">No data found for the provided type.</div>
            ) : bannerData ? (
                <div
                    className={`banner ${
                        bannerData.type === "metaCategory" ? "metaCategoryBanner" : "subCategoryBanner"
                    }`}
                >
                    <div className="banner-txt-content">
                        <h4>{bannerData.attributes.title}</h4>
                    </div>

                    <div className="absolute-image-container">
                        {bannerData.attributes.categories?.data.map((category, index) => (
                            <div
                                className="category-div"
                                key={index}
                                onClick={() => handleNavigation(category.attributes.title)}
                            >
                                <p>shop {category.attributes.title}</p>
                                {bannerData.attributes.image?.data.length > index && (
                                    <div className="image-container">
                                        <img
                                            src={`${process.env.REACT_APP_UPLOAD_URL}${bannerData.attributes.image.data[index]?.attributes.url}`}
                                            alt={
                                                bannerData.attributes.image.data[index]
                                                    ?.attributes.alternativeText || "Category Image"
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="loading">Loading...</div>
            )}
        </div>
    );
};

export default SubCatBanner;
