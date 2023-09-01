import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import './ItemGallery.scss'
import Card from '../Card/Card'
import useFetch from '../../Hooks/useFetch'

const ItemGallery = (props) => {
    const {data, loading, error} = useFetch(`/products?populate=*&[filters][mens][$eq]=${props.catId === 'men' ? true : false}`)
        
      useEffect(() => {
        // updates fetch call anytime the categoryID changes
      }, [props.catId]);


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='gallery-wrapper'> 
      {data?.map(item => (
        <Card item={item} key={item.id} />
    ))} 
    </motion.div>
  )
}

export default ItemGallery