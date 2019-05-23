import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import appReducers from './reducers/index';
import {Provider} from 'react-redux'; 
import thunk from 'redux-thunk'
const store = createStore(
  appReducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
  );

// var $  = require( 'jquery' );
// $.DataTable= require( 'datatables.net' );
// $('myTable001').DataTable();
ReactDOM.render( 
 <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
