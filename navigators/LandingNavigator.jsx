import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Landing from '../screens/Landing/Landing';
import Registration from '../screens/Registration/Registration';
// import UpdateInfo from '../screens/UpdateInfo/UpdateInfo';
import { COLORS } from '../globalStyles';

const LandingStack = createStackNavigator();

export default () => (
  <LandingStack.Navigator
    initialRouteName='Landing'
    screenOptions={{
      headerTitle: '',
      headerStyle: {
        backgroundColor: COLORS.darkblue,
      },
    }}
  >
    <LandingStack.Screen name='Landing' component={Landing} />
    <LandingStack.Screen name='Registration' component={Registration} />
  </LandingStack.Navigator>
);