import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { style } from './ItemDetails.style';

const ItemDetails = ({ route }) => {
  const dailyTotal = useSelector(state => state.dailyTotal);

  const { item } = route.params;

  const formatDetails = ({ amount, goal }) => {
    return goal < 10 ? `${Math.floor(amount * 10)/10}` : `${Math.floor(amount)}`;
  };

  const formatName = (name) => {
    return name.includes('vitamin') ? name.replace('n', 'n ') : name;
  };

  const NutrientDetail = ({ name, amount, unit, goal }) => (
    <View style={ style.nutrient }>
      <Text style={ style.label }>{ formatName(name) }</Text>
      <Text style={ style.amount }>{ `${formatDetails({ amount, goal })} ${unit}` }</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={ style.container }>
      <View style={ style.headerContainer }>
        <Text style={ style.header }>item details</Text>
        <Text style={ style.name }>{ item.itemName }</Text>
        <Text style={ style.name }>SERVINGS: { item.servingQuantity }</Text>
      </View>
      <View style={ style.infoContainer }>
        {
          Object.entries(item.totalNutrients).map(([name, amount]) => (
            name !== '_id' ? <NutrientDetail
              key={ name }
              name={ formatName(name) }
              amount={ amount }
              goal={ dailyTotal[name].goal }
              unit={ dailyTotal[name].unit }
            /> : (
              <View key={name}>
              </View>
            )
          ))
        }
      </View>
    </ScrollView>
  )
}

export default ItemDetails
