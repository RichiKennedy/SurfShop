import React from "react";
import './SubCatBanners.scss'
import SubCatBanner from "./SubCatBanner/SubCatBanner";

const SubCatBanners = () => {
  const categoryTypes = ['new collection', 'accessories'];

    return (
        <section className="subcat-banner-section">
            {categoryTypes.map((type) => (
                <SubCatBanner key={type} type={type} />
            ))}
        </section>
    );
};

export default SubCatBanners;
