import React from 'react'
import {SingleProductCard} from './SingleProductCard'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import CreateProduct from './CreateProduct'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products, user} = this.props
    return (
      <div>
        <div>
          <p>Click for Categories:</p>
          <Link exact to="/categories/instock">
            In Stock Items
          </Link>
          <Link to="/categories/singleColor/Black">Black</Link>
          <Link to="/categories/singleColor/Blue">Blue</Link>
          <Link to="/categories/singleColor/Green">Green</Link>
          <Link to="/categories/singleColor/Orange">Orange</Link>
          <Link to="/categories/singleColor/Pink">Pink</Link>
          <Link to="/categories/singleColor/Purple">Purple</Link>
          <Link to="/categories/singleColor/Red">Red</Link>
          <Link to="/categories/singleColor/Silver">Silver</Link>
          <Link to="/categories/singleColor/White">White</Link>
          <Link to="/categories/singleColor/Yellow">Yellow</Link>
        </div>
        {user.admin ? <CreateProduct /> : <div />}
        <div className="all-products-page">
          {products.map(product => {
            return (
              <SingleProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                id={product.id}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProductsThunk())
})

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
