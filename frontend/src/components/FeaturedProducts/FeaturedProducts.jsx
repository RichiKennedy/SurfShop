import React, { useEffect, useState } from 'react'
import './FeaturedProducts.scss'

const FeaturedProducts = () => {
    const [imageData, setImageData] = useState([])
    const [mens, setMens] = useState(true)


    const menData = [
        {
            id: 1,
            img1: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112825.849_900x.png?v=1681349319',
            img2: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-BoxyGraphicT-Shirt-White_0234_900x.png?v=1681349319',
            title: 'WATERFALL',
            info: 'Boxy graphic T-shirt',
            isNew: true,
            oldPrice: 489,
            newPrice: 350,
        },
        {
            id: 2,
            img1: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112647.453_900x.png?v=1681349254',
            img2: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-BoxyGraphicT-Shirt-Arctic_0217_900x.png?v=1681349254',
            title: 'WATERFALL',
            info: 'Boxy graphic T-shirt',
            isNew: true,
            oldPrice: 489,
            newPrice: 350,
        },
        {
            id: 3,
            img1: 'https://afends.com/cdn/shop/products/AfendsMensClassic-HempRetroT-Shirt-White-257_900x.jpg?v=1680658375',
            img2: 'https://afends.com/cdn/shop/products/AfendsMensClassic-HempRetroT-Shirt-White-260_900x.jpg?v=1680658375',
            title: 'CLASSIC',
            info: 'Hemp retro T-shirt',
            isNew: true,
            oldPrice: 419,
            newPrice: 330,
        },
        {
            id: 4,
            img1: 'https://afends.com/cdn/shop/products/M220000-BLK_0428_900x.jpg?v=1680658142',
            img2: 'https://afends.com/cdn/shop/products/M220000-BLK_0436_900x.jpg?v=1680658191',
            title: 'CLASSIC',
            info: 'Hemp retro T-shirt',
            isNew: true,
            oldPrice: 419,
            newPrice: 330,
        },
        {
            id: 5,
            img1: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-CubanShortSleeveShirt-White_0265_900x.png?v=1681799006',
            img2: 'https://afends.com/cdn/shop/products/NewProject-2023-04-11T092837.834_900x.png?v=1681799006',
            title: 'WATERFALL',
            info: 'Cuban short sleeve shirt',
            isNew: true,
            oldPrice: 767,
            newPrice: 600,
        },
        {
            id: 6,
            img1: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-LongSleeveShirt-White_0357_900x.png?v=1681799012',
            img2: 'https://afends.com/cdn/shop/products/NewProject-2023-04-11T093925.652_900x.png?v=1681799012',
            title: 'WATERFALL',
            info: 'Long sleeve shirt',
            isNew: true,
            oldPrice: 837,
            newPrice: 700,
        },
    ]
    const womenData = [
        {
            id: 1,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0344_900x.png?v=1680755124',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensSunDancer-DenimJacket-FadedCandy_0348_900x.png?v=1680755124',
            title: 'SUN DANCER',
            info: 'Denim jacket',
            isNew: true,
            oldPrice: 1489,
            newPrice: 1350,
        },
        {
            id: 2,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensBella-DenimBaggyJeans-FadedCandy_0580_900x.jpg?v=1680754965',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensBella-DenimBaggyJeans-FadedCandy_0599_900x.jpg?v=1680754979',
            title: 'BELLA',
            info: 'Denim baggy jeans',
            isNew: true,
            oldPrice: 1120,
            newPrice: 900,
        },
        {
            id: 3,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensChichi-DenimMidiSkirt-FadedCandy_900x.png?v=1680756986',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensChichi-DenimMidiSkirt-FadedCandy_0366_900x.png?v=1680756986',
            title: 'CHICHI',
            info: 'Denim midi skirt',
            isNew: true,
            oldPrice: 1100,
            newPrice: 920,
        },
        {
            id: 4,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensEmilie-DenimCarpenterShorts-FadedCandy_0383_900x.png?v=1680757283',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensEmilie-DenimCarpenterShorts-FadedCandy_0387_900x.png?v=1680757283',
            title: 'EMILIE',
            info: 'denim carpenter shorts',
            isNew: true,
            oldPrice: 907,
            newPrice: 600,
        },
        {
            id: 5,
            img1: 'https://afends.com/cdn/shop/files/NewProject-2023-05-02T103600.339_900x.png?v=1682988127',
            img2: 'https://afends.com/cdn/shop/files/NewProject-2023-05-02T103644.246_900x.png?v=1682988127',
            title: 'EMILIE',
            info: 'Organic denim carpenter shorts',
            isNew: true,
            oldPrice: 830,
            newPrice: 700,
        },
        {
            id: 6,
            img1: 'https://afends.com/cdn/shop/products/AfendsWomensMoss-OrganicDenimCarpenterJeans-WashedBlack_1267_900x.png?v=1681264083',
            img2: 'https://afends.com/cdn/shop/products/AfendsWomensMoss-OrganicDenimCarpenterJeans-WashedBlack_1270_900x.png?v=1681264083',
            title: 'MOSS',
            info: 'Organic Denim Carpenter Jeans',
            isNew: true,
            oldPrice: 1000,
            newPrice: 900,
        },
    ]

    useEffect(() => {
        if (mens !== true) {
            setImageData(womenData)
        } else {
            setImageData(menData)
        }
    }, [mens])

 

  return (
    <section className='featured-products'>
        <div className="title-wrapper">
            <h2 className='title'> Shop new arrivals </h2>
            <ul>
                <li className='Mens' onClick={() => setMens(true)} style={{
                    textDecoration: mens ? 'line-through' : 'none'
                }}> Mens </li>
                <li className='Womens' onClick={() => setMens(false)} style={{
                    textDecoration: !mens ? 'line-through' : 'none'
                }}> Womens </li>
            </ul>
            </div>
            <div className="image-grid-container"> 
            {imageData.map((item) => {
                return (
                <div className="image-card">
                    <div className="image-container">
                    <img src={item.img1} key={item.id} alt='yep' />
                    </div>
                    <div className="image-info">
                        <div className="info-top">
                            <h3>{item.title}</h3>
                            <span>{item.newPrice} SEK </span>
                        </div>
                        <div className="info-bottom">
                            <p>{item.info}</p>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
    </section>
  )
}

export default FeaturedProducts