import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { render } from 'react-dom'
import store, { loadUser } from './../src'

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

window.fetch = store.dispatch(loadUser(40141336))
window.fetch = store.dispatch(loadUser(23322613))
window.fetch = store.dispatch(loadUser(10336829))
window.fetch = store.dispatch(loadUser(22825438))
window.fetch = store.dispatch(loadUser(12032968))
