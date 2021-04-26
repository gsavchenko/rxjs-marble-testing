import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './core/store/store';
import Login from './login/Login';

function App() {
  return (
    <Provider store={configureStore()}>
      <Login></Login>
    </Provider>
  );
}

export default App;
