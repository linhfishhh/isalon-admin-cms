import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Layouts from 'containers/Layouts';
import { isAuthenticated } from 'utils/auth';
import { dashboard as dashboardRoutes, auth as authRoutes } from './routes';

const requiredAuth = privateRouter => {
  if (!privateRouter) return true;
  return isAuthenticated();
};

const childRoutes = (Layout, routes, minimal = false) => {
  const result = [];
  for (let i = 0; i < routes.length; i += 1) {
    const {
      id,
      children,
      path,
      component: Component,
      private: privateRouter,
    } = routes[i];
    if (Component) {
      result.push(
        <Route
          key={id}
          path={path}
          exact
          render={props =>
            requiredAuth(privateRouter) ? (
              <Layout minimal={minimal}>
                <Component {...props} />
              </Layout>
            ) : (
              <Redirect
                to={{
                  pathname: '/admin/auth/sign-in',
                  state: { from: props.location },
                }}
              />
            )
          }
        />,
      );
    }
    if (children) {
      // Route item with children
      for (let j = 0; j < children.length; j += 1) {
        const {
          id: idChild,
          path: pathChild,
          component: ComponentChild,
          private: privateChild,
        } = children[j];
        result.push(
          <Route
            key={idChild || j}
            path={pathChild}
            exact
            render={props =>
              requiredAuth(privateChild) ? (
                <Layout minimal={minimal}>
                  <ComponentChild {...props} />
                </Layout>
              ) : (
                <Redirect
                  to={{
                    pathname: '/admin/auth/sign-in',
                    state: { from: props.location },
                  }}
                />
              )
            }
          />,
        );
      }
    }
  }
  return result;
};

const Routes = () => (
  <Switch>
    <Redirect exact from="/" to="/admin" />
    <Redirect exact from="/admin" to="/admin/dashboard" />
    {childRoutes(Layouts, dashboardRoutes)}
    {childRoutes(Layouts, authRoutes, true)}
    <Redirect to="/admin/auth/not-found" />
  </Switch>
);

export default Routes;
