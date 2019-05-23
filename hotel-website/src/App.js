import React, { Component } from 'react';
import './App.css'
import './App.scss'
import './css/mystyle.css'
import "antd/dist/antd.css";
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import Loadable from 'react-loadable';
import fakeAuth from './api/fakeAuth'
//import Home from './components/home'
//import Top from './components/top'
import NoMatch from './components/no-match'
// import Login from './components/login'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

var $  = require( 'jquery' );
$.DataTable= require( 'datatables.net' );

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

const Login = Loadable({
  loader: () => import('./components/login'),
  loading
});
const Page500 = Loadable({
  loader: () => import('./components/Page500'),
  loading
});
class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
          <div>
            <Switch>
            {/* <Route path="/top" component={Top}/> */}
            <Route exact path="/login" component={Login}/>
            <Route exact path="/page/500" component={Page500}/>
            <PrivateRoute path="/" component={DefaultLayout}/>
            <Route component={NoMatch} />
            </Switch> 
          </div>
        </Router>
      </div>
    );
  }
}

// const fakeAuth = {
//   isAuthenticated(){
//     if(localStorage.getItem("auth")==='phong')
//       return true;
//     return false;
//   },
//   authenticate(cb) {
//     localStorage.setItem("auth","phong");
//    // this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     localStorage.removeItem("auth");
//   //  this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

// class Login extends Component {
//   state = { redirectToReferrer: false };

//   login = () => {
//     fakeAuth.authenticate(() => {
//       this.setState({ redirectToReferrer: true });
//     });
//   };

//   render() {
//     let { from } = this.props.location.state || { from: { pathname: "/" } };
//     let { redirectToReferrer } = this.state;

//     if (redirectToReferrer) return <Redirect to={from} />;

//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={this.login}>Log in</button>
//       </div>
//     );
//   }
// }

export default App;
