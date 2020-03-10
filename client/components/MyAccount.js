import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store'
import {getOrdersHistoryThunk} from '../store/orderHistory'

class MyAccount extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getOrdersHistory(userId)
    this.props.getUserInfo()
  }

  render() {
    const {orders} = this.props
    return (
      <div className="page-container">
        <h1>Account Overview</h1>
        <div className="account-details">
          <p>
            Name: {this.props.user.firstName} {this.props.user.lastName}
          </p>
          <p>Email: {this.props.user.email}</p>

          <div>
            <Link to={`/${this.props.user.id}/myaccount/edit`}>
              <button onClick={this.handleSubmit} type="button">
                Edit Account Info
              </button>
            </Link>
          </div>
        </div>

        <div className="order-history-page">
          <h1>Order History</h1>

          <ol className="order-history-container">
            {orders.map(order => {
              return (
                <li key={order.id} className="order-history-item">
                  <p>Date: {order.products[0].order_history.date}</p>
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
  user: state.user,
  orders: state.ordersHistory
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(me()),
  getOrdersHistory: userId => dispatch(getOrdersHistoryThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
