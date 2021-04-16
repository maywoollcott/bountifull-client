import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import History from '../screens/History/History';
import SelectedDate from '../screens/History/SelectedDate';
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
    <HistoryStack.Screen name='SelectedDate' component={SelectedDate} />
    {/* <HistoryStack.Screen name='SelectedDate' component={SelectedDate} selected={{selected}} /> */}
  </HistoryStack.Navigator>
);