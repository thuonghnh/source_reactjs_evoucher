import React from 'react'
import { Route, Switch } from 'react-router-dom';
import {Router} from '../constants'
import { SideBarComponent } from '../components';

const RouterComponent = () => {

  const RenderRouteLink = (props) => {
    const { component: Component, route, ...flelds } = props;
    return (
      <Route
        {...flelds}
        render={routeProps => {
          return (
            <SideBarComponent route={route}><Component {...routeProps} /></SideBarComponent>
          )
        }}
      />
    )
  }

  const RenderRoutePage = (props) => {
    const { component: Component, ...flelds } = props;
    return (
      <Route
        {...flelds}
        render={routeProps => {
          return (
            <Component {...routeProps} />
          )
        }}
      />
    )
  }

  return (
    <Switch>
      {
        Router.RouteLink.map((route, index) => {
          return (
            <RenderRouteLink
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
              route={route}
            />
          );
        })
      }
      {
        Router.RoutePage.map((route, index) => {
          return (
            <RenderRoutePage
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          );
        })
      }
    </Switch>
  )
}

export default RouterComponent
