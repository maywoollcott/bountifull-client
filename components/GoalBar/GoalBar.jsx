import React from 'react'
import { View, Text } from 'react-native'
import { ProgressBar } from 'react-native-paper';
import { COLORS } from '../../globalStyles';
import { style } from './GoalBar.style';
import { AntDesign } from '@expo/vector-icons';
const formatDetails = ({ met, goal }) => {
  return goal < 10 ? `${Math.floor(met * 10)/10}/${goal}` : `${Math.floor(met)}/${goal}`;
};

export const GoalBar = ({ nutrient }) => {
  const {
    name,
    goal,
    met,
    unit,
  } = nutrient;

  return (
    <View style= { style.container }>
      {
        met/goal >= 1 ? (
          <AntDesign
            name='staro'
            size={24} 
            color={ COLORS.darkblue }
            style={{
              position: 'absolute',
              bottom: 6,
              zIndex: 1,
            }}
          />
        ) : (
          <></>
        )
      }
      <View style={ style.header }>
        <Text style={ style.mainDetails }>{ name }</Text>
        <Text style={ style.details }>{ `${formatDetails(nutrient)} ${unit}` }</Text> 
        <Text style={ style.mainDetails }>{ `${Math.floor(met / goal * 100)}%` }</Text>
      </View>
      <ProgressBar style={ style.bar } progress={ met/goal } color={ COLORS.turq } />
    </View>
  )
}

export default ProgressBar
