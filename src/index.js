import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import { appStoreInstance } from './stores/AppStore';
import './index.css';
import { useStrict } from 'mobx';

//in strict mode, any change of observable data needs to take place inside an action.
//we will see this later in the code.
useStrict(true);

ReactDOM.render(
  // the provider will make all the stores available for the different containers. 
  // we use appStoreInstance, an already initiated singleton, so we could import the same instance within our stores
  // (when one store needs to fetch data from other store, we will see it later on) 
  <Provider
    appStore={appStoreInstance}
    topicsStore={appStoreInstance.topicsStore}
    postsStore={appStoreInstance.postsStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
