import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserPage from '../screens/UserPage/UserPage';
import UpdateInfo from '../screens/UpdateInfo/UpdateInfo';
import Camera from '../screens/UserPage/Camera';
import Achievements from '../screens/Achievements/Achievements';
import Stats from '../screens/Stats/Stats';
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
    <UserPageStack.Screen name='Achievements' component={Achievements} />
    <UserPageStack.Screen name='Stats' component={Stats} />
    <UserPageStack.Screen name='UpdateInfo' component={UpdateInfo} />
    <UserPageStack.Screen name='Camera' component={Camera} />
  </UserPageStack.Navigator>
);