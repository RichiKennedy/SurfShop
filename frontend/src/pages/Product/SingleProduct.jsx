import React from 'react'
import { motion } from 'framer-motion';
import './SingleProduct.scss'

const SingleProduct = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='singleProduct'>SingleProduct</div>
    </motion.div>
  )
}

export default SingleProduct