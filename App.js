import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index'
import Landing from './screens/Landing/Landing'
import Registration from './screens/Registration/Registration'
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>

        {/* <Landing> </Landing> */}
        <Registration></Registration>
      </PaperProvider>
    </Provider>
  );
}

