import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Button } from 'react-native';
import style from './Dashboard.style';
import DailyDetails from '../DailyDetails/DailyDetails';
import { useSelector } from 'react-redux';

const fact = 'There is no perfect diet for everyone.';

export default function Dashboard({ navigation }) {
  const state = useSelector(state => state);

  const calcProgress = (items) => {
    // come up with function that will calc progress for each nutrient goal and then come up with a percentage.
    // do we want to average progress across all nutrients?
    // items ? items.reduce() : 0;
    return 0;
  }

  return (
    <View style={ style.container }>
      <View style={ style.factContainer } >
        <Text style={ style.buttontext }>{ fact} </Text>
      </View>
      <View style={ style.goalBubble }>
        <Text style={ style.percentage }>{ calcProgress(state.currentProgress) }%</Text>
        <Text style={ style.bubbleText }>of your daily needs have been met!</Text>
      </View>
      <TouchableOpacity style={ style.submitbutton } onPress={ () => navigation.push('Details') }>
        <Text style={ style.buttontext }>Daily Details</Text>
      </TouchableOpacity>
    </View>
  );
};