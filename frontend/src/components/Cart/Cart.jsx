import React from 'react'
import './Cart.scss'

const Cart = () => {

  const cartItem = [
    {
      id: 'mhgfkö100',
      img1: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112825.849_900x.png?v=1681349319',
      img2: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-BoxyGraphicT-Shirt-White_0234_900x.png?v=1681349319',
      title: 'WATERFALL',
      info: 'Boxy graphic T-shirt',
      desc: 'size: s',
      isOrganic: true,
      oldPrice: 489,
      newPrice: 350,
  },
  {
    id: 'kuyfkuytdftiyri76567344567376u7',
    img1: 'https://afends.com/cdn/shop/products/NewProject-2023-04-13T112647.453_900x.png?v=1681349254',
    img2: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-BoxyGraphicT-Shirt-Arctic_0217_900x.png?v=1681349254',
    title: 'WATERFALL',
    info: 'Boxy graphic T-shirt',
    desc: 'size: s',
    isOrganic: true,
    oldPrice: 489,
    newPrice: 350,
},
{
  id: 'jyfuywsye3rw54u6yrli8oiulkhbn',
  img1: 'https://afends.com/cdn/shop/products/M220000-BLK_0428_900x.jpg?v=1680658142',
  img2: 'https://afends.com/cdn/shop/products/M220000-BLK_0436_900x.jpg?v=1680658191',
  title: 'CLASSIC',
  info: 'Hemp retro T-shirt',
  desc: 'size: s',
  isOrganic: true,
  oldPrice: 419,
  newPrice: 330,
},
{
  id: 'njyfytedy4ey6u76tp8ioykufkytd',
  img1: 'https://afends.com/cdn/shop/products/AfendsMensWaterfall-LongSleeveShirt-White_0357_900x.png?v=1681799012',
  img2: 'https://afends.com/cdn/shop/products/NewProject-2023-04-11T093925.652_900x.png?v=1681799012',
  title: 'WATERFALL',
  info: 'Long sleeve shirt',
  desc: 'size: s',
  isOrganic: true,
  oldPrice: 837,
  newPrice: 700,
}
  ]

  const shouldRemoveBorder = cartItem.length >= 3;

  return (
    <>
     <div className={`cart ${shouldRemoveBorder ? 'remove-border' : ''}`}>
      {cartItem?.map((item, index) => (
        <div className={`item ${index === cartItem.length - 1 ? 'last-item' : ''}`}>
          <div className="item-header">
            <h1>{item.title}</h1>
            <span>{item.newPrice} KR</span>
          </div>
          <div className="item-middle">
            <div className="item-image-wrapper">
            <img src={item.img1} alt={item.info} />
            </div>
            <div className="item-description">
              <div className="info">
              <p>{item.info}</p>
              <p>{item.desc}</p>
              </div>
            <div className="item-quantity">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            </div>
          </div>
          <div className="item-bottom">
            <span> move to wishlist </span>
            <span> x remove </span>
          </div>
        </div>
      ))}
    </div>
    <div className="shipping">
      <div className="shipping-top">
        <h5>shipping</h5>
        <h5>free</h5>
      </div>
      <div className="shipping-bottom">
        <span>estimated delivery Aug 09th</span>
      </div>
    </div>
    <div className="total">
      <div className="total-top">
        <h5>total</h5>
        <h5>6000 KR</h5>
      </div>
      <div className="total-bottom">
      <span>Incl. VAT</span>
      </div>
    </div>
    </>
  )
}

export default Cart