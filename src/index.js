import React from 'react';
import ReactDOM from 'react-dom/client';
import {legacy_createStore as createStore} from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import navbarReducer from './Redux/Reducers/navbarReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store =  createStore(navbarReducer);

console.log({ store });
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
