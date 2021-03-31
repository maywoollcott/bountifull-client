import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Button } from 'react-native';
import style from './Dashboard.style';
import DailyDetails from '../DailyDetails/DailyDetails';
import { useSelector, useDispatch } from 'react-redux';
import { calcTotalProgress, calcTotalsByNutrient } from '../../utils/nutrients';
import ActionType from '../../store/constants';

const fact = 'There is no perfect diet for everyone.';

export default function Dashboard({ navigation }) {

  const { totalGoalMet } = useSelector(state => state);

  return (
    <View style={ style.container }>
      <View style={ style.factContainer } >
        <Text style={ style.factText }>{ fact} </Text>
      </View>
      <View style={ style.goalBubble }>
        <Text style={ style.percentage }>{ totalGoalMet }%</Text>
        <Text style={ style.bubbleText }>of your daily needs have been met!</Text>
      </View>
      <TouchableOpacity style={ style.submitbutton } onPress={ () => navigation.push('Details') }>
        <Text style={ style.buttontext }>Daily Progress</Text>
      </TouchableOpacity>
    </View>
  );
};