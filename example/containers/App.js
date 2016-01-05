import React from 'react'
import { connect } from 'react-redux'

const App = ({ children, users }) =>
  <pre>
    {JSON.stringify(users, null, 2)}
  </pre>

function mapStateToProps(state) {
  return {
    users: state.entities.users
  }
}

export default connect(mapStateToProps)(App)
