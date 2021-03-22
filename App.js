import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index'
import Dashboard from './screens/Dashboard/Dashboard'

export default function App() {
  return (
    <Provider store={store}>
      <Dashboard> </Dashboard>
    </Provider>
  );
}

