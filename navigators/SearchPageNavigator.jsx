import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SearchPage from '../screens/SearchPage/SearchPage';
import ServingInfo from '../screens/SearchPage/ServingInfo';
import { COLORS } from '../globalStyles';

const SearchPageStack = createStackNavigator();

export default () => (
  <SearchPageStack.Navigator
    initialRouteName='SearchPage'
    screenOptions={{
      // setting headerTitle to empty string to not display anything
      headerTitle: '',
      headerStyle: {
        backgroundColor: COLORS.darkblue,
      },
    }}
  >
    <SearchPageStack.Screen name='SearchPage' component={SearchPage} />
    <SearchPageStack.Screen name='ServingInfo' component={ServingInfo} />
    {/* <DashboardStack.Screen name='Item Details' component={ItemDetails} /> */}
    {/* <DashboardStack.Screen name='Selected Date' component={SelectedDate} /> */}
  </SearchPageStack.Navigator>
);