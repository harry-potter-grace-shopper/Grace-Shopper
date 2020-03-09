import React from 'react'
import {connect} from 'react-redux'
import {setProductThunk} from '../store/singleProduct'
import {addProductThunk} from '../store/cart'
import UpdateProduct from './UpdateProduct'
import {removeProductThunk} from '../store/products'
import {addToGuestCartThunk} from '../store/guestCart'

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.setProduct(id)
  }

  render() {
    const {product, user} = this.props
    return (
      <div>
        {user.admin ? <UpdateProduct product={product} /> : <div />}
        <div className="single-product-page">
          <img src={product.imageUrl} />
          <div className="single-product-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>${product.price}.00</h3>
            <h3>Color:{product.color}</h3>
            {user.id && !user.admin ? (
              <button
                type="submit"
                onClick={() => this.props.addProduct(product.id, user.id)}
              >
                Add To Cart
              </button>
            ) : (
              <span />
            )}
            {user.id && user.admin ? (
              <button
                type="submit"
                onClick={() => {
                  this.props.remove(product.id)
                  this.props.history.push('/products')
                }}
              >
                {' '}
                REMOVE PRODUCT
              </button>
            ) : (
              <span />
            )}
            {!user.id ? (
              <button
                type="submit"
                onClick={() => this.props.addToGuestCart(product)}
              >
                Add to Cart
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setProduct: id => dispatch(setProductThunk(id)),
  addProduct: (productId, userId) =>
    dispatch(addProductThunk(productId, userId)),
  remove: productId => dispatch(removeProductThunk(productId)),
  addToGuestCart: product => dispatch(addToGuestCartThunk(product))
})

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
