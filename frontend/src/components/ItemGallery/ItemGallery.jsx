import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import './ItemGallery.scss'
import Card from '../Card/Card'

const ItemGallery = (catId) => {
const [imageData, setImageData] = useState([])
    
    const menData = [
        {
            id: 1,
            img1: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112825.849_900x.png?v=1681349319',
            img2: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-BoxyGraphicT-Shirt-White_0234_900x.png?v=1681349319',
            title: 'WATERFALL',
            info: 'Boxy graphic T-shirt',
            isOrganic: true,
            oldPrice: 489,
            newPrice: 350,
        },
        {
            id: 2,
            img1: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112647.453_900x.png?v=1681349254',
            img2: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-BoxyGraphicT-Shirt-Arctic_0217_900x.png?v=1681349254',
            title: 'WATERFALL',
            info: 'Boxy graphic T-shirt',
            isOrganic: true,
            oldPrice: 489,
            newPrice: 350,
        },
        {
            id: 3,
            img1: 'https://afends.com/cdn/shop/products/AfendsMensClassic-HempRetroT-Shirt-White-257_900x.jpg?v=1680658375',
            img2: 'https://afends.com/cdn/shop/products/AfendsMensClassic-HempRetroT-Shirt-White-260_900x.jpg?v=1680658375',
            title: 'CLASSIC',
            info: 'Hemp retro T-shirt',
            isOrganic: true,
            oldPrice: 419,
            newPrice: 330,
        },
        {
            id: 4,
            img1: 'https://afends.com/cdn/shop/products/M220000-BLK_0428_900x.jpg?v=1680658142',
            img2: 'https://afends.com/cdn/shop/products/M220000-BLK_0436_900x.jpg?v=1680658191',
            title: 'CLASSIC',
            info: 'Hemp retro T-shirt',
            isOrganic: true,
            oldPrice: 419,
            newPrice: 330,
        },
        {
            id: 5,
            img1: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-CubanShortSleeveShirt-White_0265_900x.png?v=1681799006',
            img2: 'https://afends.com/cdn/shop/products/NewProject-2023-04-11T092837.834_900x.png?v=1681799006',
            title: 'WATERFALL',
            info: 'Cuban short sleeve shirt',
            isOrganic: true,
            oldPrice: 767,
            newPrice: 600,
        },
        {
            id: 6,
            img1: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-LongSleeveShirt-White_0357_900x.png?v=1681799012',
            img2: 'https://afends.com/cdn/shop/products/NewProject-2023-04-11T093925.652_900x.png?v=1681799012',
            title: 'WATERFALL',
            info: 'Long sleeve shirt',
            isOrganic: true,
            oldPrice: 837,
            newPrice: 700,
        },
        {
            id: 7,
            img1: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112825.849_900x.png?v=1681349319',
            img2: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-BoxyGraphicT-Shirt-White_0234_900x.png?v=1681349319',
            title: 'WATERFALL',
            info: 'Boxy graphic T-shirt',
            isOrganic: true,
            oldPrice: 489,
            newPrice: 350,
        },
        {
            id: 8,
            img1: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112647.453_900x.png?v=1681349254',
            img2: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-BoxyGraphicT-Shirt-Arctic_0217_900x.png?v=1681349254',
            title: 'WATERFALL',
            info: 'Boxy graphic T-shirt',
            isOrganic: true,
            oldPrice: 489,
            newPrice: 350,
        },
        {
            id: 9,
            img1: 'https://afends.com/cdn/shop/products/AfendsMensClassic-HempRetroT-Shirt-White-257_900x.jpg?v=1680658375',
            img2: 'https://afends.com/cdn/shop/products/AfendsMensClassic-HempRetroT-Shirt-White-260_900x.jpg?v=1680658375',
            title: 'CLASSIC',
            info: 'Hemp retro T-shirt',
            isOrganic: true,
            oldPrice: 419,
            newPrice: 330,
        },
        {
            id: 10,
            img1: 'https://afends.com/cdn/shop/products/M220000-BLK_0428_900x.jpg?v=1680658142',
            img2: 'https://afends.com/cdn/shop/products/M220000-BLK_0436_900x.jpg?v=1680658191',
            title: 'CLASSIC',
            info: 'Hemp retro T-shirt',
            isOrganic: true,
            oldPrice: 419,
            newPrice: 330,
        },
        {
            id: 11,
            img1: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-CubanShortSleeveShirt-White_0265_900x.png?v=1681799006',
            img2: 'https://afends.com/cdn/shop/products/NewProject-2023-04-11T092837.834_900x.png?v=1681799006',
            title: 'WATERFALL',
            info: 'Cuban short sleeve shirt',
            isOrganic: true,
            oldPrice: 767,
            newPrice: 600,
        },
        {
            id: 12,
            img1: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-LongSleeveShirt-White_0357_900x.png?v=1681799012',
            img2: 'https://afends.com/cdn/shop/products/NewProject-2023-04-11T093925.652_900x.png?v=1681799012',
            title: 'WATERFALL',
            info: 'Long sleeve shirt',
            isOrganic: true,
            oldPrice: 837,
            newPrice: 700,
        },
    ]
    const womenData = [
        {
            id: 33,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0344_900x.png?v=1680755124',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0348_900x.png?v=1680755124',
            title: 'SUN DANCER',
            info: 'Denim jacket',
            isOrganic: true,
            oldPrice: 1489,
            newPrice: 1350,
        },
        {
            id: 34,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0344_900x.png?v=1680755124',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0348_900x.png?v=1680755124',
            title: 'BELLA',
            info: 'Denim baggy jeans',
            isOrganic: true,
            oldPrice: 1120,
            newPrice: 900,
        },
        {
            id: 35,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0344_900x.png?v=1680755124',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0348_900x.png?v=1680755124',
            title: 'CHICHI',
            info: 'Denim midi skirt',
            isOrganic: true,
            oldPrice: 1100,
            newPrice: 920,
        },
        {
            id: 36,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0344_900x.png?v=1680755124',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0348_900x.png?v=1680755124',
            title: 'EMILIE',
            info: 'denim carpenter shorts',
            isOrganic: true,
            oldPrice: 907,
            newPrice: 600,
        },
        {
            id: 37,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0344_900x.png?v=1680755124',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0348_900x.png?v=1680755124',
            title: 'EMILIE',
            info: 'Organic denim carpenter shorts',
            isOrganic: true,
            oldPrice: 830,
            newPrice: 700,
        },
        {
            id: 38,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0344_900x.png?v=1680755124',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0348_900x.png?v=1680755124',
            title: 'MOSS',
            info: 'Organic Denim Carpenter Jeans',
            isOrganic: true,
            oldPrice: 1000,
            newPrice: 900,
        },
        {
            id: 39,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0344_900x.png?v=1680755124',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0348_900x.png?v=1680755124',
            title: 'MOSS',
            info: 'Organic Denim Carpenter Jeans',
            isOrganic: true,
            oldPrice: 1000,
            newPrice: 900,
        },
        {
            id: 40,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0344_900x.png?v=1680755124',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0348_900x.png?v=1680755124',
            title: 'MOSS',
            info: 'Organic Denim Carpenter Jeans',
            isOrganic: true,
            oldPrice: 1000,
            newPrice: 900,
        },
    ]
console.log(catId)
    useEffect(() => {
        if (catId.catId === 'men') {
          setImageData(menData);
        } else if (catId.catId === 'women') {
            setImageData(womenData);
        }

      }, [catId]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='gallery-wrapper'> 
      {imageData.map(item => (
        <Card item={item} key={item.id}/>
    ))} 
    </motion.div>
  )
}

export default ItemGallery