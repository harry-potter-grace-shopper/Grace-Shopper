import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div id="nav-bar">
    <nav>
      {isLoggedIn ? (
        <div className="nav-items">
          {/* The navbar will show these links after you log in */}

          <div>
            <Link to="/home">
              <img
                src="https://www.logolynx.com/images/logolynx/d4/d429675b3b80e9cae4ab2f1dc734926a.gif"
                width="200px"
              />
            </Link>
          </div>

          <div>
            <Link to="/home">Home</Link>
            {!user.admin ? <Link to={`/${user.id}/cart`}>Cart</Link> : <span />}
            {!user.admin ? (
              <Link to={`/users/${user.id}/ordersHistory`}>My Orders</Link>
            ) : (
              <span />
            )}
            {user.admin ? <Link to="/users">Users</Link> : <span />}
            <a href="/home" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="nav-items">
          <div>
            <Link to="/home">
              <img
                src="https://www.logolynx.com/images/logolynx/d4/d429675b3b80e9cae4ab2f1dc734926a.gif"
                width="200px"
              />
            </Link>
          </div>

          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/guest/cart">Cart</Link>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
