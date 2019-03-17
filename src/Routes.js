import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import AuthActions from '@/actions/Auth'
import { getTokenFromLocalStorage } from '@/utils/localStorage'

/* Import the components */
import AppliedRoute from './components/AppliedRoute'
import LoadingComponent from './components/LoadingComponent'

const AsyncHome = Loadable({
  loader: () => import('./containers/Home'),
  loading: LoadingComponent
})
const AsyncSignup = Loadable({
  loader: () => import('./containers/Signup'),
  loading: LoadingComponent
})
const AsyncLogin = Loadable({
  loader: () => import('./containers/Login'),
  loading: LoadingComponent
})

@inject('authStore', 'sampleMobxStore')
@observer
export default class RouterContainer extends Component {
  async componentDidMount() {
    if (getTokenFromLocalStorage()) {
      const result = await AuthActions.authToken({
        token: getTokenFromLocalStorage()
      })

      this.props.authStore.setUser(result)
    }
  }

  render() {
    console.log(this.props)
    return (
      <Router>
        <Switch>
          <AppliedRoute
            exact
            path="/"
            component={AsyncHome}
            props={this.props}
          />
          <AppliedRoute
            exact
            path="/signup"
            component={AsyncSignup}
            props={this.props}
          />
          <AppliedRoute
            exact
            path="/login"
            component={AsyncLogin}
            props={this.props}
          />

          {/* Finally, catch all unmatched routes */}
          {/* <Route component={AsyncNotFound} /> */}
        </Switch>
      </Router>
    )
  }
}
