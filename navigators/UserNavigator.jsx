import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserPage from '../screens/UserPage/UserPage';
import UpdateInfo from '../screens/UpdateInfo/UpdateInfo';
import { COLORS } from '../globalStyles';

const UserPageStack = createStackNavigator();

export default () => (
  <UserPageStack.Navigator
    initialRouteName='UserPage'
    screenOptions={{
      headerTitle: '',
      headerStyle: {
        backgroundColor: COLORS.darkblue,
      },
    }}
  >
    <UserPageStack.Screen name='UserPage' component={UserPage} />
    <UserPageStack.Screen name='UpdateInfo' component={UpdateInfo} />
  </UserPageStack.Navigator>
);