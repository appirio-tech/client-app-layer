import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { render } from 'react-dom'
import store, { loadProfile } from './../src'

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

store.dispatch(loadProfile(40141336))
store.dispatch(loadProfile(23322613))
store.dispatch(loadProfile(10336829))
store.dispatch(loadProfile(22825438))
store.dispatch(loadProfile(12032968))
