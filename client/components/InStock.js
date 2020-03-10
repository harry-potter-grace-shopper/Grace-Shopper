import React from 'react'
import {SingleProductCard} from './SingleProductCard'
import {connect} from 'react-redux'
import {getInStockProductsThunk} from '../store/instock'
import CreateProduct from './CreateProduct'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getInStockProductsThunk()
  }

  render() {
    const {inStockProducts, user} = this.props
    return (
      <div>
        <div>
          <Link to="/products">Back to All Products</Link>
        </div>
        {user.admin ? <CreateProduct /> : <div />}
        <div className="in-stock-products-page">
          {inStockProducts.map(product => {
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
  getInStockProductsThunk: () => dispatch(getInStockProductsThunk())
})

const mapStateToProps = state => ({
  inStockProducts: state.inStockProducts,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
