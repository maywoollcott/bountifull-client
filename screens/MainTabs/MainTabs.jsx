import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../Dashboard/Dashboard';
import History from '../History/History';
import SearchPage from '../SearchPage/SearchPage';
import Achievements from '../Achievements/Achievements';
import UserPage from '../UserPage/UserPage';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import ActionType from '../../store/constants';


export default function MainTabs () {

  
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();

  // This useEffect will check if there's a token in the store and will logout user if none is in there.
  // We can add some logic to remove token and user info for certain errors from the server.
  useEffect(() => {
    if (!SecureStore.getItemAsync('BOUNTIFULL_AUTH_TOKEN')) {
      dispatch({type: ActionType.LOGOUT_SUCCESS});
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      // Icon color options listed on two lines below.
      // activeColor='#Insert Color here'
      // inactiveColor='#Insert Color here
      // barStyle={{ backgroundColor: primaryColor }}
    >
      <Tab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo
              name='home'
              color={color}
              size={26}
            />
          ),
        }}
        />
      <Tab.Screen
      name='History'
      component={History}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome5
            name='history'
            color={color}
            size={26}
          />
        )
      }}
      />
      <Tab.Screen
        name='SearchPage'
        component={SearchPage}
        options={{
          tabBarIcon: ({ color }) => (
          <AntDesign
            name='pluscircleo'
            color={color}
            size={26}
          />
          )
        }}  
      />
      <Tab.Screen
        name='Achievements'
        component={Achievements}
        options={{
          tabBarIcon: ({ color }) => (
          <AntDesign
            name='Trophy'
            color={color}
            size={26}
          />
          )
        }}  
      />
      <Tab.Screen
        name='User'
        component={UserPage}
        options={{
          tabBarIcon: ({ color }) => (
          <AntDesign
            name='user'
            color={color}
            size={26}
          />
          )
        }}    
      />
    </Tab.Navigator>
  );
};