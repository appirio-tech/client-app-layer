import React from 'react'
import { connect } from 'react-redux'

const App = ({ children, profiles }) =>
  <pre>
    {JSON.stringify(profiles, null, 2)}
  </pre>

function mapStateToProps(state) {
  return {
    profiles: state.entities.profiles
  }
}

export default connect(mapStateToProps)(App)
