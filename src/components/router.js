import React from 'react'
import { Landing } from '@/components/pages/landing'
import { Methodology } from '@/components/pages/methodology'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import URI from 'urijs'
import { usePageTracking } from './usePageTracking'

const routes = [
  {
    path: '/methodology',
    component: Methodology
  },
  {
    path: '/',
    component: Landing
  }
]
const pageTracker = Component => {
  return props => {
    usePageTracking()
    return <Component {...props} />
  }
}

export const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(route => {
        return (
          <Route
            key={route.path}
            path={route.path}
            render={routerProps => {
              const queryParams = URI()
                .query(routerProps.history.location.search)
                .query(true)
              const Component = pageTracker(route.component)
              const props = { ...route.props, ...routerProps, queryParams }
              return <Component {...props} />
            }}
          />
        )
      })}
    </Switch>
  </BrowserRouter>
)
