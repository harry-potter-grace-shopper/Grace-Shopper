import React from 'react'
import {connect} from 'react-redux'
import {setProductThunk} from '../store/singleProduct'
import {addProductThunk} from '../store/cart'

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.setProduct(id)
  }

  render() {
    const {product, user} = this.props
    return (
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>{product.price}</h3>
        <img src={product.imageUrl} />
        <button onClick={() => this.props.addProduct(product.id, user.id)}>
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setProduct: id => dispatch(setProductThunk(id)),
  addProduct: (productId, userId) =>
    dispatch(addProductThunk(productId, userId))
})

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
