import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Slider.scss'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
  

    const data = [
        "https://images.unsplash.com/photo-1609870025624-98b62826e80a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1621433213916-fde39d28e016?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1527731149372-fae504a1185f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2661&q=80"
    ]
    const prevSlide = () => {
        console.log(currentSlide)
        setCurrentSlide(currentSlide === 0 ? 2 : currentSlide -1)
    }
    const nextSlide = () => {
        console.log(currentSlide)
        setCurrentSlide(currentSlide === 0 ? 1 : currentSlide +1)
    }

    const renderSliderContent = () => {
        if (currentSlide === 0) {
          return (
             <AnimatePresence>
                <motion.div
                key="image1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1,  }}
                transition={{ duration: 0.9 }}
                  className="image1">
                    <div className="women-men">
                      <img src={data[0]} alt="" />
                      <div className="overlay-info">
                        <div className="info">
                          <h2> Womens </h2>
                          <button> Shop Now </button>
                        </div>
                      </div>
                    </div>
                    <div className="women-men">
                      <img src={data[1]} alt="" />
                      <div className="overlay-info">
                        <div className="info">
                        <h2> Mens </h2>
                        <button> Shop Now </button>
                        </div>
                      </div>
                     </div>
                </motion.div>
             </AnimatePresence>
            )
        } 
        if (currentSlide === 1 ) {
          return (    
             <AnimatePresence>
               <motion.div
                 key="image2"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1,  }}
                 transition={{ duration: 0.9 }}         
                 className="image2">
                   <img src={data[2]} alt="" />
                   <div className="btn-wrapper">
                     <h2> Surfboards </h2>
                     <button> Shop Now </button>
                   </div>
               </motion.div>
             </ AnimatePresence>
          )
        } 
        if (currentSlide === 2) {
          return (                
             <AnimatePresence>
               <motion.div
                 key="image3"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1,  }}
                 transition={{ duration: 0.9 }}   
                 className="image2">
                   <img src={data[3]} alt="" />
                   <div className="btn-wrapper">
                     <h2> Dunno yet </h2>
                     <button> Shop Now </button>
                   </div>
                </motion.div>
              </AnimatePresence>
          )
        } else {
            setCurrentSlide(0)
        }
    }
   
  return (
    <div className='slider'>
        <div className="container">
            {renderSliderContent()}
            <div className="icon-left" onClick={prevSlide}>
              <div className="icon" > 
                < ArrowBackIosOutlinedIcon /> 
              </div>
            </div>
            <div className="icon-right" onClick={nextSlide}>
              <div className="icon"> 
                <ArrowForwardIosOutlinedIcon />   
              </div>
            </div>
        </div>
    </div>
  )
}

export default Slider