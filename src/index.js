import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './components/App/App';
import rootReducer from './reducers'
import history from './history';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('app')
);
