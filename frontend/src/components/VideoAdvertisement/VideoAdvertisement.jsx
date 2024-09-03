import React from 'react';
import './VideoAdvertisement.scss';
import useFetch from '../../Hooks/useFetch';

const VideoAdvertisement = () => {
  const { data, loading, error } = useFetch('/contents?populate=*');

  if (loading) return <div>Loading...</div>;
  if (error || !data || data.length === 0) return <div>Error loading video</div>;

  const videoUrl = data[0]?.attributes?.media?.data?.[0]?.attributes?.url;
  const fullVideoUrl = process.env.REACT_APP_UPLOAD_URL + videoUrl; 


  return (
    <div className='video-advertisement-container'>
        <div className="video-overlay">
            <h4>New fall collection</h4> 
            </div>
      {videoUrl ? (
        <video autoPlay loop muted playsInline className="video-banner__content">
          <source src={fullVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div>
          <h4>No video available</h4>
        </div>
      )}
    </div>
  );
}

export default VideoAdvertisement;
