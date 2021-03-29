import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { style } from './ItemButton.style';
import { SimpleLineIcons } from '@expo/vector-icons';
import { COLORS } from '../../globalStyles';
import { useNavigation } from '@react-navigation/core';

const ItemButton = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Item Details', {
      item,
    })
  };

  return (
    <TouchableOpacity style={style.bar} onPress={handlePress}>
      <Text>{item.itemName.length < 25 ? item.itemName : `${item.itemName.slice(0, 25)}...`}</Text>
      <SimpleLineIcons name='arrow-right' color={COLORS.darkblue} />
    </TouchableOpacity>
  )
}

export default ItemButton
