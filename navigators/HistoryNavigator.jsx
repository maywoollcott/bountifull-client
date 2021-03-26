import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import History from '../screens/History/History';
// import UpdateInfo from '../screens/UpdateInfo/UpdateInfo';
import { COLORS } from '../globalStyles';

const HistoryStack = createStackNavigator();

export default () => (
  <HistoryStack.Navigator
    initialRouteName='History'
    screenOptions={{
      headerTitle: '',
      headerStyle: {
        backgroundColor: COLORS.darkblue,
      },
    }}
  >
    <HistoryStack.Screen name='History' component={History} />
  </HistoryStack.Navigator>
);