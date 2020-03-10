import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrdersHistoryThunk} from '../store/orderHistory'

class OrderHistory extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getOrdersHistory(userId)
  }

  render() {
    const {orders} = this.props
    return (
      <div className="page-container">
        <div>
          <h1>Account Overview</h1>
          <p>Name: </p>
          <p>Email: </p>
        </div>

        <div className="order-history-page">
          <h2>My Orders</h2>

          <ol className="order-history-container">
            {orders.map(order => {
              return (
                <li key={order.id} className="order-history-item">
                  <p>Order Date: {order.products[0].order_history.date}</p>
                  {order.products.map(item => {
                    return (
                      <div key={item.id}>
                        <Link to={`/products/${item.id}`}>
                          <img
                            className="order-history-img"
                            src={item.imageUrl}
                            width="100px"
                          />
                        </Link>
                        <div className="order-history-details">
                          <p>Quantity: {item.order_history.quantity}</p>
                          <p>Price: ${item.order_history.currentPrice}.00</p>
                        </div>
                      </div>
                    )
                  })}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.ordersHistory
})

const mapDispatchToProps = dispatch => ({
  getOrdersHistory: userId => dispatch(getOrdersHistoryThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
