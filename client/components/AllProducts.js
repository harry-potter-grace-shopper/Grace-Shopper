import React from 'react'
import {SingleProductCard} from './SingleProductCard'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import CreateProduct from './CreateProduct'
import {Pagination} from './Pagination'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {currentPage: 1}
    this.paginate = this.paginate.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }
  paginate = pageNumber => this.setState({currentPage: pageNumber})

  render() {
    const {user, products} = this.props
    const totalItems = products.length
    const itemsPerPage = 4
    const indexOfLastItem = this.state.currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

    return (
      <div>
        {user.admin ? <CreateProduct /> : <div />}
        <div className="all-products-page">
          {currentItems.map(product => {
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
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          paginate={this.paginate}
        />
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
