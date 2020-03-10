import React from 'react'
import {me} from '../store'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/user'

class EditAccountForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getUserInfo()
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const userUpdates = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value
    }
    this.props.updateUser(this.props.user.id, userUpdates)
    this.setState({
      firstName: '',
      lastName: '',
      email: ''
    })
  }

  render() {
    return (
      <div className="page-container">
        <div className="account-details">
          <h1>Edit Account</h1>

          <form onSubmit={this.handleSubmit}>
            <label>First Name: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="firstName"
              value={this.state.firstName}
              className="form-input"
            />

            <label>Last Name: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="lastName"
              value={this.state.lastName}
              className="form-input"
            />

            <label>Email: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="email"
              value={this.state.email}
              className="form-input"
            />

            <br />
            <button type="submit">Update Info</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(me()),
  updateUser: (userId, updates) => dispatch(updateUserThunk(userId, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountForm)
