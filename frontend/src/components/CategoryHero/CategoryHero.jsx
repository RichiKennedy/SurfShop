import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryHero.scss';
import useFetch from '../../Hooks/useFetch';
import SubCatBanners from '../SubCatBanners/SubCatBanners';

const CategoryHero = () => {
    const { data: heroVideo, loading, error } = useFetch('/contents?populate=*');
    const { data: categoryTitle } = useFetch(`/categories?[filters][categories][title]`);
    const videoRef = useRef(null);
    const navigate = useNavigate();


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

    const handleCategoryClick = (gender) => {
        navigate(`/products/${gender}`);
    }

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
                    <div className="title">
                        <h5>explore:</h5>
                        <h2>the shop</h2>
                    </div>
                    <div className="btn-container">
                        {categoryTitle?.map((category) => (
                            <div 
                                className="btn"
                                onClick={() => handleCategoryClick(category.attributes.title)} 
                                key={category.id}
                            >
                                <span>shop {category.attributes.title}s</span>
                                <div className="arrow-icon">
                                    <img 
                                        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
                                        alt="" 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default CategoryHero;
