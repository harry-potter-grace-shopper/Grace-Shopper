import React from 'react'
import {SingleProductCard} from './SingleProductCard'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import CreateProduct from './CreateProduct'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products, user} = this.props
    return (
      <div>
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
