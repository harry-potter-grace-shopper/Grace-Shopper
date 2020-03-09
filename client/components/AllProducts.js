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
          <Link to="/instock">In Stock Items</Link>
          <Link to="/Black">Black</Link>
          <Link to="/Blue">Blue</Link>
          <Link to="/Green">Green</Link>
          <Link to="/Orange">Orange</Link>
          <Link to="/Pink">Pink</Link>
          <Link to="/Purple">Purple</Link>
          <Link to="/Red">Red</Link>
          <Link to="/Silver">Silver</Link>
          <Link to="/White">White</Link>
          <Link to="/Yellow">Yellow</Link>
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
