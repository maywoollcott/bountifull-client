import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Button } from 'react-native';
import style from './Dashboard.style';
import DailyDetails from '../DailyDetails/DailyDetails';
import { useSelector } from 'react-redux';
import { calcTotalProgress, calcTotalsByNutrient } from '../../utils/nutrients';

const fact = 'There is no perfect diet for everyone.';

export default function Dashboard({ navigation }) {
  const { user: {
      sex,
      birthdate,
    },
    currentProgress,
  } = useSelector(state => state);

  const calcProgress = (items) => {
    if (items) {
      const totals = calcTotalsByNutrient({
        items,
        sex,
        birthdate,
      });
      return calcProgress(totals);
    }
    return 0;
  }

  return (
    <View style={ style.container }>
      <View style={ style.factContainer } >
        <Text style={ style.buttontext }>{ fact} </Text>
      </View>
      <View style={ style.goalBubble }>
        <Text style={ style.percentage }>{ calcProgress(currentProgress) }%</Text>
        <Text style={ style.bubbleText }>of your daily needs have been met!</Text>
      </View>
      <TouchableOpacity style={ style.submitbutton } onPress={ () => navigation.push('Details') }>
        <Text style={ style.buttontext }>Daily Details</Text>
      </TouchableOpacity>
    </View>
  );
};