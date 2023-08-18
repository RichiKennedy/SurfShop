import React, { useState } from 'react'
import './FeaturedProducts.scss'
import Card from '../Card/Card'
import { Link } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'

const FeaturedProducts = ({type}) => {
    const [mens, setMens] = useState(true)
    const {data, loading, error} = useFetch(`/products?populate=*&[filters][mens][$eq]=${mens ? true : false}&[filters][type][$eq]=${type}`)
    
  return (
    <section className='featured-products'>
        <div className="title-wrapper">
            <h2 className='title'> {type} </h2>
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
            {error 
            ? "something went wrong" 
            :loading 
            ? "loading" 
            : data?.map((item) => <Card item={item} key={item?.id}/>)}
            <Link to={ mens ? '/products/men' : '/products/women' } className="view-all">
            <h1> view all </h1>
            </Link>
            </div>
    </section>
  )
}

export default FeaturedProducts