import React from "react";
import SubCatBanner from "../SubCatBanner/SubCatBanner";


const SubCatBanners = () => {
    return (
        <div className="subcat-banner-section">
            <SubCatBanner type="new collection" />
            <SubCatBanner type="accessories" />
        </div>
    );
};

export default SubCatBanners;
