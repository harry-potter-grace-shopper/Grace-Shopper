import React from 'react'
import {connect} from 'react-redux'
import {updateProductThunk, setProductThunk} from '../store/singleProduct'

class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      description: '',
      imageUrl: ''
      // inventory: ''
    }
  }

  render() {
    const {product} = this.props
    return (
      <div>
        <h3>Form for updating product information:</h3>
        <form id="updateProduct">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={evt => this.setState({name: evt.target.value})}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={evt => this.setState({price: evt.target.value})}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={evt => this.setState({description: evt.target.value})}
          />
          <label htmlFor="imageUrl">ImageURL:</label>
          <input
            type="url"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={evt => this.setState({imageUrl: evt.target.value})}
          />
          {/* <label htmlFor="inventory">Inventory:</label>
          <input type="number" name="inventory" value={this.state.inventory} /> */}
          <button
            type="submit"
            onClick={evt => {
              evt.preventDefault()
              this.props.updateProduct(product.id, this.state)
              this.setState({
                name: '',
                price: '',
                description: '',
                imageUrl: ''
                /*inventory: ''*/
              })
              this.props.setProduct(product.id)
            }}
          >
            SUBMIT CHANGES
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateProduct: (productId, updates) =>
    dispatch(updateProductThunk(productId, updates)),
  setProduct: id => dispatch(setProductThunk(id))
})

export default connect(null, mapDispatchToProps)(UpdateProduct)
