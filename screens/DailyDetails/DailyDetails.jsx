import React from 'react';
import { FlatList, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { style } from './DailyDetails.style';
import { GoalBar } from '../../components/GoalBar/GoalBar';
import ItemButton from '../../components/ItemButton/ItemButton';


export default function DailyDetails() {
  const { dailyTotal, totalGoalMet, currentProgress } = useSelector(state => state);

  const dateOptions = {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
  };

  const formatName = (name) => {
    return name.replace('n', 'n ');
  };

  const date = new Intl.DateTimeFormat('default', dateOptions).format(Date.now());
  return (
    <ScrollView contentContainerStyle={ style.container }>
      <View style={ style.headerContainer }>
        <Text style={ style.header }>daily progress</Text>
        <Text style={ style.date }>{ date }</Text>
      </View>
      <View style={ style.goalBubble }>
        <Text style={ style.percentage }>{ totalGoalMet }%</Text>
        <Text style={ style.bubbleText }>of your daily needs have been met!</Text>
      </View>
      <View style={ style.infoContainer }>
        {
          Object.keys(dailyTotal).map((nutrient) => {
            const name = nutrient.includes('vitamin') ? formatName(nutrient) : nutrient;
            return (
              <GoalBar key={ nutrient } nutrient={{ name, ...dailyTotal[nutrient] }} />
            );
          })
        }
      </View>
      {/* <View style= { style.infoContainer }>
        <Text style={ style.header }>Today's intake:</Text>
        {
          currentProgress.length ? (
            <ItemButton />
          ) : (
            <Text>Get out there and eat something good. :)</Text>
          )
        }
      </View> */}
    </ScrollView>
  );
};