import React from 'react'
import {SingleProductCard} from './SingleProductCard'
import {connect} from 'react-redux'
import {getProductsByColorThunk} from '../store/byColor'
import CreateProduct from './CreateProduct'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    const {color} = this.props.match.params
    this.props.getProductsByColorThunk(color)
  }

  render() {
    const {productsByColor, user} = this.props
    const {color} = this.props.match.params
    return (
      <div>
        <div>
          <Link to="/products">Back to All Products</Link>
        </div>
        {user.admin ? <CreateProduct /> : <div />}
        <div className="in-stock-products-page">
          {productsByColor.length > 1 ? (
            productsByColor.map(product => {
              return (
                <SingleProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  id={product.id}
                />
              )
            })
          ) : (
            <p>There are no {color} Tamagotchi's Available at this time :( </p>
          )}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getProductsByColorThunk: color => dispatch(getProductsByColorThunk(color))
})

const mapStateToProps = state => ({
  productsByColor: state.productsByColor,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
