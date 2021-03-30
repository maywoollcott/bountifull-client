import React, {useState} from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useSelector } from 'react-redux';
import { deleteItem } from '../../store/actions'
import { style } from './ItemDetails.style';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/core'
const API_URL = 'http://192.168.0.181:3001';

const ItemDetails = ({ route }) => {
  const dispatch = useDispatch();
  const dailyTotal = useSelector(state => state.dailyTotal);
  const { item } = route.params;
    const navigation = useNavigation();

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

  const deleteById = async () => {
    console.log(item.uniqueId)
    const res = await dispatch(deleteItem(item));
    console.log(res)
    Alert.alert(
      `Deleted`,
      `${item.itemName.toLowerCase()} deleted successfully`,
      [
        {
          text: "Okay",
          onPress: () => navigation.goBack(),
        }
      ]
    );
    // } else {
    //   alert('There was a problem deleting')
    // }
  }

  const deleteItemAlert = async() => {
    console.log(item.itemName)
    console.log(item.uniqueId)
    
    Alert.alert(
      `Delete item`,
      `Delete ${item.itemName.toLowerCase()}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => deleteById() }
      ]
    );
  }

  return (
    <ScrollView contentContainerStyle={ style.container }>
    { item.uniqueId ? 
    <>
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
      <TouchableOpacity style={style.deleteButton} onPress={deleteItemAlert}>
        <Text style={style.buttonText}>Delete</Text>
      </TouchableOpacity>
      </> :
      <View><Text>Deleted</Text></View>
    }
    </ScrollView>
  )
}

export default ItemDetails
