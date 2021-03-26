import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardNavigator from '../../navigators/DashboardNavigator';
import History from '../History/History';
import SearchPage from '../SearchPage/SearchPage';
import Achievements from '../Achievements/Achievements';
import UserPage from '../UserPage/UserPage';
import DailyDetails from '../DailyDetails/DailyDetails';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import ActionType from '../../store/constants';
import { COLORS } from '../../globalStyles';
import UserNavigator from '../../navigators/UserNavigator';
import HistoryNavigator from '../../navigators/HistoryNavigator';
import SearchPageNavigator from '../../navigators/SearchPageNavigator';

export default function MainTabs() {


  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();

  // This useEffect will check if there's a token in the store and will logout user if none is in there.
  // We can add some logic to remove token and user info for certain errors from the server.
  useEffect(() => {
    if (!SecureStore.getItemAsync('BOUNTIFULL_AUTH_TOKEN')) {
      dispatch({ type: ActionType.LOGOUT_SUCCESS });
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      tabBarOptions={{
        activeTintColor: COLORS.palegreen,
        inactiveTintColor: COLORS.darkblue,
        style: {
          backgroundColor: COLORS.sage,
        }
      }}
    >
      <Tab.Screen
        name='Dashboard'
        component={DashboardNavigator}
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
        component={HistoryNavigator}
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
        name='Add'
        component={SearchPageNavigator}
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
        name='DailyDetails'
        component={DailyDetails}
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
        component={UserNavigator}
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