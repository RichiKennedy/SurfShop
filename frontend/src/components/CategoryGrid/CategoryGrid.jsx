import React from 'react'
import './CategoryGrid.scss'
import {Link} from 'react-router-dom'

const CategoryGrid = () => {
  return (
    <section className='category-grid-wrapper'>
            <div className="col">
                    <Link className="row" to="/products/1" >
                        <img src='https://afends.com/cdn/shop/products/NewProject-2023-03-14T091610.597_900x.png?v=1678745789' alt='accessories' />
                        <div className="overlay">
                          <h3>Accessories</h3>
                        </div>
                    </Link>
                <Link className="row" to="/products/1">
                    <img src='https://afends.com/cdn/shop/products/AfendsWomensSlayCropped-HempOversizedT-Shirt-VividBlue_0945_900x.png?v=1681366083' alt='accessories' />
                    <div className="overlay">
                      <h3>Women</h3>
                    </div>
                </Link>
            </div>
            <div className="col">
                <Link className="row" to="/products/1" >
                    <img src='https://afends.com/cdn/shop/products/AfendsUnisexOracle-TrenchCoat-Olive-5682_900x.png?v=1681273730' alt='accessories' />
                    <div className="overlay">
                      <h3>New Season</h3>
                    </div>
                </Link>
            </div>
            <div className="col col-large">
            <div className="row">
            <div className="col">
                <Link className="row" to="/products/1" >
                    <img src='https://afends.com/cdn/shop/products/AfendsMensLiquid-CrewNeckJumper-Arctic_01262_900x.jpg?v=1680655062' alt='accessories' />
                    <div className="overlay">
                    <h3>Men</h3>
                    </div>
                </Link>
            </div>
            <div className="col">
            <Link className='row' to="/products/1" >
                <img src='https://afends.com/cdn/shop/files/ezgif.com-gif-maker_11_450x.gif?v=1672273929' alt='accessories' />
            </Link>
            </div>
            </div>
            <Link className="row" to="/products/1" >
              <img src='https://images.squarespace-cdn.com/content/v1/5c7c71b8b914495e8b4e1810/1671220684803-PI3JC7XQ8BK6YPBYELUE/OPSeriesLineUp.jpg?format=2500w' alt='accessories' />
              <div className="overlay">
                    <h3>Boards</h3>
              </div>
            </Link>
        </div>
    </section>
  )
}

export default CategoryGrid