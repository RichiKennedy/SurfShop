import React, { useEffect, useRef, useState } from 'react';
import './CategoryHero.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import SubCatBanners from '../SubCatBanners/SubCatBanners';

const CategoryHero = () => {
    const navigate = useNavigate();
    const { data: heroVideo, loading, error } = useFetch('/contents?populate=*');
    const { data: categoryTitle } = useFetch(`/categories?[filters][categories][title]`);

    const [currentSubCategory, setCurrentSubCategory] = useState("the shop");
    const [pendingSubCategory, setPendingSubCategory] = useState("the shop");
    const [styleConfig, setStyleConfig] = useState({
        titleColor: "#FFF",
        arrowColor: "invert(0)",
    });
    const [isDefaultStyle, setIsDefaultStyle] = useState(true);
    const [animateTitle, setAnimateTitle] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Helper function to update styles based on the category
    const updateStyleConfig = (subCategory) => {
        const styleMap = {
            "new collection": { titleColor: "#222", arrowColor: "invert(1)", isDefault: false },
            "outerwear": { titleColor: "#222", arrowColor: "invert(1)", isDefault: false },
            default: { titleColor: "#FFF", arrowColor: "invert(0)", isDefault: true },
        };
        const newStyle = styleMap[subCategory] || styleMap.default;
        setStyleConfig(newStyle);
        setIsDefaultStyle(newStyle.isDefault);
    };

    const triggerTitleAnimation = (newSubCategory) => {
        setPendingSubCategory(newSubCategory);
        updateStyleConfig(newSubCategory); // Apply style config immediately when animation starts
        setAnimateTitle(true); // Start animation

        setTimeout(() => {
            setAnimateTitle(false); // End animation
            setCurrentSubCategory(newSubCategory); // Update the displayed title
        }, 500);
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/products/${categoryId}`);
    };

    const handleVisibleSubCategoryChange = (visibleSubCategory) => {
        if (visibleSubCategory !== currentSubCategory) {
            triggerTitleAnimation(visibleSubCategory);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error || !heroVideo || heroVideo.length === 0) return <div>Error loading video...</div>;

    const videoUrl = heroVideo[0]?.attributes?.media?.data?.[0]?.attributes?.url;
    const fullVideoUrl = process.env.REACT_APP_UPLOAD_URL + videoUrl;

    const handleVideoEnd = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 3.2;
            videoRef.current.pause();
        }
    };

    return (
        <>
            <section className='hero-wrapper'>
                <div className='video-advertisement-container'>
                    {videoUrl ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            loop={false}
                            muted
                            playsInline
                            className="video-banner__content"
                            onEnded={handleVideoEnd}
                        >
                            <source src={fullVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div>
                            <h4>No video available</h4>
                        </div>
                    )}
                </div>
                <div className="txt-content-overlay">
                    <div className="title" style={{ color: styleConfig.titleColor }}>
                        <h5>explore:</h5>
                        <h2 className={animateTitle ? "animate" : ""}>
                            {animateTitle ? pendingSubCategory : currentSubCategory}
                        </h2>
                    </div>
                    <div className="btn-container">
                        {categoryTitle?.map((category) => (
                            <div 
                                className={`btn ${isDefaultStyle ? "default-hover" : "custom-hover"}`} 
                                onClick={() => handleCategoryClick(category.attributes.title)} 
                                key={category.id}
                            >
                                <span>shop {category.attributes.title}s</span>
                                <div className="arrow-icon">
                                    <img 
                                        style={{ filter: styleConfig.arrowColor }}
                                        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
                                        alt="" 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <SubCatBanners onVisibleSubCategoryChange={handleVisibleSubCategoryChange} />
        </>
    );
};

export default CategoryHero;
