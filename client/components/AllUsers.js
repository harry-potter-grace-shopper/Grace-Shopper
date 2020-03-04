import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const users = this.props.users // from mapStateToProps
    return <div>{users.map(user => <h2 key={user.id}>{user.email}</h2>)}</div>
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
