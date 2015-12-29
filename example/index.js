import 'babel-core/polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { render } from 'react-dom'
import { store } from './../src/index'

import App from './containers/app'
import Test from './containers/test'

const history = createBrowserHistory()

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/test" component={Test} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
