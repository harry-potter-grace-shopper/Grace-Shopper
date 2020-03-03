import React from 'react'
import {Link, Route} from 'react-router-dom'
import SingleProduct from './SingleProduct'

export const SingleProductCard = props => {
  const {name, price, imageUrl, id} = props
  return (
    <Link to={`/products/${id}`}>
      <div>
        <h2>{name}</h2>
        <img src={imageUrl} width="200" />
        <h3>{price}</h3>
      </div>
    </Link>
  )
}
