import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index'
import Dashboard from './screens/Dashboard/Dashboard'
import Registration from './screens/Registration/Registration'
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        {/* <Dashboard> </Dashboard> */}
        <Registration></Registration>
      </PaperProvider>
    </Provider>
  );
}

