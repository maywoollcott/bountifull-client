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

  const [metGoal, setMetGoal] = useState(0);
  const dispatch = useDispatch();

  const {
    user: {
      sex,
      birthdate,
    },
    currentProgress,
  } = useSelector(state => state);

  useEffect(() => {
    setMetGoal(calcProgress(currentProgress));
  }, []);

  const calcProgress = (items) => {
    if (items.length) {
      const dailyTotal = calcTotalsByNutrient({
        items,
        sex,
        birthdate,
      });
      const totalGoalMet = calcTotalProgress(dailyTotal);
      dispatch({
        type: ActionType.ADD_DAILY_TOTAL,
        payload: {
          dailyTotal,
          totalGoalMet,
        }
      });
      return totalGoalMet;
    }
    return 0;
  }

  return (
    <View style={ style.container }>
      <View style={ style.factContainer } >
        <Text style={ style.buttontext }>{ fact} </Text>
      </View>
      <View style={ style.goalBubble }>
        <Text style={ style.percentage }>{ metGoal }%</Text>
        <Text style={ style.bubbleText }>of your daily needs have been met!</Text>
      </View>
      <TouchableOpacity style={ style.submitbutton } onPress={ () => navigation.push('Details') }>
        <Text style={ style.buttontext }>Daily Details</Text>
      </TouchableOpacity>
    </View>
  );
};