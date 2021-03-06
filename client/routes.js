import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import SingleProduct from './components/SingleProduct'
import AllProducts from './components/AllProducts'
import {me} from './store'
import AllUsers from './components/AllUsers'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import GuestCart from './components/GuestCart'
import GuestCheckout from './components/GuestCheckout'
import InStock from './components/InStock'
import SingleColorProducts from './components/SingleColorProducts'
import MyAccount from './components/MyAccount'
import EditAccountForm from './components/EditAccountForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, user} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route exact path="/" component={AllProducts} />
        <Route path="/categories/instock" component={InStock} />
        <Route exact path="/home" component={AllProducts} />
        <Route
          path="/categories/singleColor/:color"
          component={SingleColorProducts}
        />
        <Route exact path="/guest/cart" component={GuestCart} />
        <Route exact path="/guest/cart/checkout" component={GuestCheckout} />
        <Route path="/confirm" component={OrderConfirmation} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}

            <Route path="/home" component={UserHome} />
            <Route exact path="/:userid/cart" component={Cart} />
            <Route exact path="/:userid/cart/checkout" component={Checkout} />
            <Route
              exact
              path="/:userid/myaccount/edit"
              component={EditAccountForm}
            />

            {user.admin ? (
              <Route exact path="/users" component={AllUsers} />
            ) : (
              <Route
                exact
                path="/users/:userId/myaccount"
                component={MyAccount}
              />
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      // retrieve all of your products here and make your all products component stateless
      // also can allow your single product to be stateless as well
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
