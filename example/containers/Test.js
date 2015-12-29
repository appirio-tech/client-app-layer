import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Test extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        Test banana!
      </div>
    )
  }
}

Test.propTypes = {
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Test)
