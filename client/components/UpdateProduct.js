import React from 'react'
import {connect} from 'react-redux'
import {updateProductThunk} from '../store/singleProduct'

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
              this.props.updateProduct(this.state)
              this.setState({
                name: '',
                price: '',
                description: '',
                imageUrl: ''
                /*inventory: ''*/
              })
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
  updateProduct: updates => dispatch(updateProductThunk(updates))
})

export default connect(null, mapDispatchToProps)(UpdateProduct)
