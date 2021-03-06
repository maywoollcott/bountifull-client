import React from 'react';
import { FlatList, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { style } from './DailyDetails.style';
import { GoalBar } from '../../components/GoalBar/GoalBar';
import 'intl';
import 'intl/locale-data/jsonp/en';
import ItemButton from '../../components/ItemButton/ItemButton';
import { AntDesign } from '@expo/vector-icons';
import 'intl';
import 'intl/locale-data/jsonp/en';

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
      <View style= { style.infoContainer }>
        <Text style={{ ...style.header, marginVertical: 35, }}>today's intake:</Text>
        {
          currentProgress.length ? currentProgress.map((item) =>
            <ItemButton key={item.uniqueId} item={item} />
          ) : (
            <Text style={style.noResultText}>Get out there and eat something good :)</Text>
          )
        }
      </View>
    </ScrollView>
  );
};