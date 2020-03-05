import React from 'react'
import {connect} from 'react-redux'
import {setProductThunk} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.setProduct(id)
  }

  // handleSubmit() {

  // }

  render() {
    const {product} = this.props
    return (
      <div className="single-product-page">
        <img src={product.imageUrl} />
        <div className="single-product-details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>${product.price}.00</h3>

          {/* <button onClick={this.handleSubmit}>Add To Cart</button> */}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setProduct: id => dispatch(setProductThunk(id))
})

const mapStateToProps = state => ({
  product: state.product
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
