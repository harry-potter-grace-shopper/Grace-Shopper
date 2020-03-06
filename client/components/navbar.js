import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="nav-bar">
    {/* <h1>Tamagotchi Store</h1> */}
    <nav>
      {isLoggedIn ? (
        <div className="nav-items">
          {/* The navbar will show these links after you log in */}

          <div>
            <Link to="/home">
              <img
                src="https://www.logolynx.com/images/logolynx/d4/d429675b3b80e9cae4ab2f1dc734926a.gif"
                width="150px"
              />
            </Link>
          </div>

          <div>
            <Link to="/home">Home</Link>
            <Link to="/:userId/cart">Cart</Link>
            <a href="#" onClick={handleClick}>
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
                width="150px"
              />
            </Link>
          </div>

          {/* The navbar will show these links before you log in */}
          <div>
            <Link to="/home">Home</Link>
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
    isLoggedIn: !!state.user.id
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
