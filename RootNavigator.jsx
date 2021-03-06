import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing  from './screens/Landing/Landing';
import Registration from './screens/Registration/Registration';
import { useSelector } from 'react-redux';
import MainTabs from './screens/MainTabs/MainTabs';
import { COLORS } from './globalStyles';
import { style } from './screens/DailyDetails/DailyDetails.style';


export default function RootNavigator() {
  const AuthStack = createStackNavigator();
  const state = useSelector(state => state);

  const AuthStackScreen = () => (
    <AuthStack.Navigator
      initialRouteName='Landing'
      screenOptions={{
        // setting headerTitle to empty string to not display anything
        headerTitle: '',
        headerStyle: {
          backgroundColor: COLORS.darkblue,
        },
      }}
    >
      <AuthStack.Screen name='Landing' component={Landing} />
      <AuthStack.Screen name='Registration' component={Registration} />
    </AuthStack.Navigator>
  );

  return (
    <NavigationContainer>
      {state.isLoading ? (
        // can replace this with a logo spinner
        <View style={ style.container }>
          <ActivityIndicator size='large' />
        </View>
      ) : state.user ? (
      <MainTabs />
      ) : (
      <AuthStackScreen />
      )}
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Image source={require('./assets/images/logo.png')} style={styles.logo}/>
    //   <Text>Let's get Bountifull!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 200,
    height: 200
  }
});