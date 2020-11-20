// import * as React from "react"
// import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom"
// import Auth from './utils/Auth';

// type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>

// //const AUTHENTICATED = false // TODO: implement authentication logic

// export const PrivateRoute: React.StatelessComponent<RouteProps> = ({component, ...rest}) => {
//   const renderFn = (Component?: RouteComponent) => (props: RouteProps) => {
//     if (!Component) {
//       return null
//     }

//     if (Auth.isUserAuthenticated()) {
//       return <Component {...props} />
//     }

//     const redirectProps = {
//       to: {
//         pathname: "/",
//         state: {from: props.location},
//       },
//     }

//     return <Redirect {...redirectProps} />
//   }

//   return <Route {...rest} render={renderFn(component)} />
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import {
    Route, 
    Redirect,
    RouteProps,
    // RouteComponent,
    RouteComponentProps
} from "react-router-dom";
import Auth from './utils/Auth';

type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>

// interface PrivateRouteProps extends RouteProps {
//     isAuthenticated: boolean;
// }
// const auth = true

const PrivateRoute: React.StatelessComponent<RouteProps> = ({component, ...rest}) => {
  const renderFn = (Component?: any) => (props: RouteProps) => {
    if (!Component) {
      return null
    }

    if (Auth.isUserAuthenticated()) {
      return <Component {...props} />
    }

    const redirectProps = {
      to: {
        pathname: "/error",
        state: {from: props.location},
      },
    }

    return <Redirect {...redirectProps} />
  }

  return <Route {...rest} render={renderFn(component)} />
}

export { PrivateRoute };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// import React from "react";

// import Auth from './utils/Auth';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     Auth.isUserAuthenticated() ? (
//       <Component {...props} {...rest} />
//     ) : (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

// const LoggedOutRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     Auth.isUserAuthenticated() ? (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     ) : (
//       <Component {...props} {...rest} />
//     )
//   )}/>
// )

// // const PropsRoute = ({ component: Component, ...rest }) => (
// //   <Route {...rest} render={props => (
// //     <Component {...props} {...rest} />
// //   )}/>
// // )

// export { PrivateRoute, LoggedOutRoute };
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// import React, { Component } from 'react';
// import {
//     Route, 
//     Redirect,
//     RouteProps,
//     // RouteComponent,
//     RouteComponentProps
// } from "react-router-dom";
// import Auth from './utils/Auth';

// type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>

// // interface PrivateRouteProps extends RouteProps {
// //     isAuthenticated: boolean;
// // }
// const auth = true

// const PrivateRoute: React.StatelessComponent<RouteProps> = ({component, ...rest}) => (
//   <Route {...rest} render={(props) => (
//     auth ? (
//       <Component {...props} {...rest} />
//       // <h1>hello</h1>
//     ) : (
//       <Redirect to={{
//         pathname: '/error',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

// export { PrivateRoute };

// const PrivateRoute = (component: React.Component, ...rest:any) => {
//   <Route {...rest} render={(props:any) = (
//     Auth.isUserAuthenticated() ? (
//       <Component {...props} {...rest} />
//     ) : (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     )
//     )
//   }
//   )}
// )

// export class PrivateRoute extends Route<PrivateRouteProps> {
//     render() {
//         return (
//             <Route render={(props: RouteComponentProps) => {
//                 if(!this.props.isAuthenticated()) {
//                     return <Redirect to='/login' />
//                 } 

//                 if(this.props.component) {
//                     return React.createElement(this.props.component);
//                 } 

//                 if(this.props.render) {
//                     return this.props.render(props);
//                 }
//             }} />
//         );
//     }
// }
//888888888888888888888888888888888888888
// import React from "react";

// import Auth from './utils/Auth';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     Auth.isUserAuthenticated() ? (
//       <Component {...props} {...rest} />
//     ) : (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

// const LoggedOutRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     Auth.isUserAuthenticated() ? (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     ) : (
//       <Component {...props} {...rest} />
//     )
//   )}/>
// )

// // const PropsRoute = ({ component: Component, ...rest }) => (
// //   <Route {...rest} render={props => (
// //     <Component {...props} {...rest} />
// //   )}/>
// // )

// export { PrivateRoute, LoggedOutRoute };