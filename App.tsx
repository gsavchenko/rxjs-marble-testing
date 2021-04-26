import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/core/store/store';
import Login from './src/login/Login';

function App() {
  return (
    <Provider store={configureStore()}>
      <Login></Login>
    </Provider>
  );
}

export default App;
