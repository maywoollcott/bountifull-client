import React from 'react';
import { FlatList, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
// import { style } from './History.style';
import { GoalBar } from '../../components/GoalBar/GoalBar';
import { COLORS } from '../../globalStyles';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const dateSelected = '2021-03-26'
const API_URL = 'http://192.168.0.181:3001';

export default function DailyDetails() {
  const user = useSelector(state => state.user);

  const { dailyTotal, totalGoalMet } = useSelector(state => state);

  const dateOptions = {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
  };

  const formatName = (name) => {
    // console.log(selected)
    return name.replace('n', 'n ');
  };

  const getItemsByIdAndDate = async ()=> {
    const userId = user._id; 
    const fetchDate = '2021-03-26';
    console.log(userId);
    console.log(fetchDate);

    try {
      let res = [];
      res = await axios.get(`${API_URL}/getItems/${user._id}/${fetchDate}`, {
        user: user._id,
        dateCreated: '2021-03-27'
      });
      // console.log({data});
      // const obj = {data};
      const items = res.data
      const singleItem = items.map((item)=> {
        console.log(item.itemName)
      })
      // console.log(singleItem)
    } catch (error) {
      console.log('error ', error)
    }
  }
  // const getItemsByIdAndDate = async ()=> {
  //   const userId = user._id; 
  //   const fetchDate = '2021-03-26';
  //   console.log(userId);
  //   console.log(fetchDate);
  //   // const config = {
  //   //   headers: {
  //   //     Authorization: `Bearer ${token}`,
  //   //   },
  //   // };
  //   try {
  //     const res = await axios.get(`${API_URL}/getItems`, {
  //       user: user._id,
  //       dateCreated: '2021-03-26'
  //     });
  //     console.log(res.itemName);
  //   } catch (error) {
  //     console.log('error ', error)
  //   }
  // }

  const date = new Intl.DateTimeFormat('default', dateOptions).format(Date.now());
  return (
    <ScrollView contentContainerStyle={style.container}>
      <TouchableOpacity
        // style={style.submitbutton}
        onPress={getItemsByIdAndDate}>
        <Text style={style.buttontext}>
          Get Items
            </Text>
      </TouchableOpacity>
      <View style={style.headerContainer}>
        <Text style={style.header}>past daily progress</Text>
        <Text style={style.date}>{date}</Text>
      </View>
      <View style={style.goalBubble}>
        <Text style={style.percentage}>{totalGoalMet}%</Text>
        <Text style={style.bubbleText}>of your daily needs have been met!</Text>
      </View>
      <View style={style.infoContainer}>
        {
          Object.keys(dailyTotal).map((nutrient) => {
            const name = nutrient.includes('vitamin') ? formatName(nutrient) : nutrient;
            return (
              <GoalBar key={nutrient} nutrient={{ name, ...dailyTotal[nutrient] }} />
            );
          })
        }
      </View>
    </ScrollView>
  );
};



const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  headerContainer: {
    marginVertical: 35,
  },

  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    color: COLORS.darkblue,
  },

  date: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: COLORS.turq,
  },

  goalBubble: {
    width: 154,
    height: 154,
    borderRadius: 72,
    backgroundColor: COLORS.sage,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    marginBottom: 20,
  },

  percentage: {
    fontWeight: '400',
    fontSize: 48,
    color: '#fff',
    textAlign: 'center',
  },

  bubbleText: {
    textAlign: 'center',
    fontSize: 13,
    paddingHorizontal: 5,
    color: COLORS.darkblue,
  },

  infoContainer: {
    marginBottom: 30,
  },

})