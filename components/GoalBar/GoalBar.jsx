import React from 'react'
import { View, Text } from 'react-native'
import { ProgressBar } from 'react-native-paper';
import { COLORS } from '../../globalStyles';
import { style } from './GoalBar.style';

export const GoalBar = ({ nutrient }) => {
  const {
    name,
    goal,
    met,
    unit,
  } = nutrient;


  return (
    <View style= { style.container }>
      <View style={ style.header }>
        <Text style={ style.mainDetails }>{ name }</Text>
        <Text style={ style.details }>{ `${Math.floor(met)}/${goal} ${unit}` }</Text> 
        <Text style={ style.mainDetails }>{ `${Math.floor(met / goal * 100)}%` }</Text>
      </View>
      <ProgressBar style={ style.bar } progress={ met/goal } color={ COLORS.turq } />
    </View>
  )
}

export default ProgressBar
