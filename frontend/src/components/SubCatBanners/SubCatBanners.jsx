import React, { useEffect, useRef, useState } from 'react';
import './SubCatBanners.scss';
import useFetch from '../../Hooks/useFetch';

const SubCatBanners = ({ onVisibleSubCategoryChange }) => {
    const { data: subCategories, loading, error } = useFetch('/sub-categories?populate=*');
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const bannersRef = useRef([]);
    const [currentBanner, setCurrentBanner] = useState(null);
    useEffect(() => {
        if (subCategories && subCategories.length > 0) {
            const targetSubCategories = ["new collection", "denim", "outerwear", "t-shirts"];
            const filtered = subCategories.filter(subCategory =>
                targetSubCategories.includes(subCategory.attributes.title)
            );
            setFilteredSubCategories(filtered);
        }
    }, [subCategories]);

    useEffect(() => {
        if (filteredSubCategories.length === 0) return;

        const handleScroll = () => {
            const h2Element = document.querySelector(".txt-content-overlay .title h2");
            const h2Center = h2Element.getBoundingClientRect().top + (h2Element.offsetHeight / 2);
            const heroCategory = document.querySelector(".hero-wrapper"); 
            const heroBottom = heroCategory.getBoundingClientRect().bottom;

            if (h2Center < heroBottom) {
                if (currentBanner !== "default") {
                    setCurrentBanner("default");
                    onVisibleSubCategoryChange("The Shop"); 
                }
                return; 
            }

            let closestBanner = null;
            let closestDistance = Infinity;

            bannersRef.current.forEach((banner) => {
                if (banner) {
                    const bannerTop = banner.getBoundingClientRect().top;
                    const bannerBottom = banner.getBoundingClientRect().bottom;
                    const bannerCenter = (bannerTop + bannerBottom) / 2;
                    const distance = Math.abs(bannerCenter - h2Center);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestBanner = banner;
                    }
                }
            });

            if (closestBanner && closestBanner !== currentBanner) {
                const visibleSubCategory = closestBanner.getAttribute("data-title");
                setCurrentBanner(closestBanner);
                onVisibleSubCategoryChange(visibleSubCategory);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [filteredSubCategories, currentBanner, onVisibleSubCategoryChange]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading sub-categories...</div>;

    return (
        <div className='subcat-banner-wrapper'>
    {filteredSubCategories.map((subCat, index) => (
        <div
            className="sub-category-banner"
            key={subCat.id}
            ref={el => bannersRef.current[index] = el}
            data-title={subCat.attributes.title}
        >
            {subCat.attributes.image?.data?.map((image, imgIndex) => (
                <div
                key={`subCatImgWrapper_${subCat.id}_${imgIndex}`}
                className={
                    subCat.attributes.image.data.length === 1
                        ? 'subCatImgWrapper one'
                        : 'subCatImgWrapper multiple'
                }
            >
                <img 
                    src={process.env.REACT_APP_UPLOAD_URL + image.attributes.url}
                    className='subCatImg' 
                    alt={image.attributes.alternativeText || "Banner Image"} 
                />
            </div>
            ))}
        </div>
    ))}
</div>

    );
};

export default SubCatBanners;
