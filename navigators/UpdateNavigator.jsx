import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Camera from '../screens/UserPage/Camera';
import { COLORS } from '../globalStyles';
import UpdateInfo from '../screens/UpdateInfo/UpdateInfo';
import UpdateName from '../screens/UpdateInfo/UpdateName';
import UpdateEmail from '../screens/UpdateInfo/UpdateEmail';
import UpdatePassword from '../screens/UpdateInfo/UpdatePassword';
import UpdateSex from '../screens/UpdateInfo/UpdateSex';
import UpdateBirthdate from '../screens/UpdateInfo/UpdateBirthdate';

const UpdateInfoStack = createStackNavigator();

export default () => (
  <UpdateInfoStack.Navigator
    initialRouteName='UpdateInfo'
    screenOptions={{
      headerTitle: '',
      headerStyle: {
        backgroundColor: COLORS.darkblue,
      },
    }}
  >
    <UpdateInfoStack.Screen name='UpdateInfo' component={UpdateInfo} />    
    <UpdateInfoStack.Screen name='UpdateEmail' component={UpdateEmail} />    
    <UpdateInfoStack.Screen name='UpdateName' component={UpdateName} />    
    <UpdateInfoStack.Screen name='UpdatePassword' component={UpdatePassword} />
    <UpdateInfoStack.Screen name='UpdateSex' component={UpdateSex} />
    <UpdateInfoStack.Screen name='UpdateBirthdate' component={UpdateBirthdate} />
    <UpdateInfoStack.Screen name='Camera' component={Camera} />
  </UpdateInfoStack.Navigator>
);