import React from 'react'
import {Link} from 'react-router-dom'

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
