import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import RootNavigator from './RootNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {

  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </Provider>
  );
};