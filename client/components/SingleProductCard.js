import React from 'react'
import {Link} from 'react-router-dom'

export const SingleProductCard = props => {
  const {name, price, imageUrl, id} = props
  return (
    <Link to={`/products/${id}`}>
      <div className="single-product-card">
        <h2>{name}</h2>
        <img src={imageUrl} width="150px" />
        <h3>${price}.00</h3>
      </div>
    </Link>
  )
}
