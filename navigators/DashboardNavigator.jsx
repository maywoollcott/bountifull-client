import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Dashboard from '../screens/Dashboard/Dashboard';
import DailyDetails from '../screens/DailyDetails/DailyDetails';
import { COLORS } from '../globalStyles';
import ItemDetails from '../screens/ItemDetails/ItemDetails';
import SelectedDate from '../screens/History/SelectedDate';

const DashboardStack = createStackNavigator();
  
export default () => (
  <DashboardStack.Navigator
    initialRouteName='Dashboard'
    screenOptions={{
      // setting headerTitle to empty string to not display anything
      headerTitle: '',
      headerStyle: {
        backgroundColor: COLORS.darkblue,
      },
    }}
  >
    <DashboardStack.Screen name='Dashboard' component={Dashboard} />
    <DashboardStack.Screen name='Details' component={DailyDetails} />
    <DashboardStack.Screen name='Item Details' component={ItemDetails} />
    <DashboardStack.Screen name='Selected Date' component={SelectedDate} />
  </DashboardStack.Navigator>
);