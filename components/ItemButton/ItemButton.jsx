import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { style } from './ItemButton.style';
import { SimpleLineIcons } from '@expo/vector-icons';
import { COLORS } from '../../globalStyles';

const ItemButton = ({ Item, Navigation}) => {
  return (
    <TouchableOpacity style={ style.bar }>
      <Text>{Item.name}</Text>
      <SimpleLineIcons name='arrow-right' color={ COLORS.darkblue } />
    </TouchableOpacity>
  )
}

export default ItemButton
