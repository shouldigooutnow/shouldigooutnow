import React from 'react'
import { Landing } from '@/components/pages/landing'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import URI from 'urijs'

const routes = [
  {
    path: '/',
    component: Landing
  }
]

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
              const Component = route.component
              const props = { ...route.props, ...routerProps, queryParams }
              return <Component {...props} />
            }}
          />
        )
      })}
    </Switch>
  </BrowserRouter>
)
