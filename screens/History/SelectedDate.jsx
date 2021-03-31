import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { GoalBar } from '../../components/GoalBar/GoalBar';
import { COLORS } from '../../globalStyles';
import ItemButton from '../../components/ItemButton/ItemButton';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import { calcTotalProgress, calcTotalsByNutrient } from '../../utils/nutrients';

// const API_URL = 'http://192.168.0.181:3001';
const API_URL = process.env.EXPO_API_URL;

export default function DailyDetails({ route }) {
  const { _id, birthdate, sex } = useSelector(state => state.user);
  const { dateSelected } = route.params;
  const [state, setState] = useState({
    historicalTotal: {},
    historicalProgress: [],
    totalGoalMet: 0,
  });

  const dateOptions = {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
  };

  useEffect(() => {
    getItemsByIdAndDate()
  }, []);

  const formatName = (name) => {
    return name.replace('n', 'n ');
  };

  const getItemsByIdAndDate = async () => {
    const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${API_URL}/getItems/${_id}/${dateSelected}`, config);
      const historicalTotal = calcTotalsByNutrient({
        birthdate,
        sex,
        items: data,
      });
      const totalGoalMet = calcTotalProgress(historicalTotal);
      setState({
        ...state,
        totalGoalMet,
        historicalTotal,
        historicalProgress: data
      });
    } catch (error) {
      console.log('error ', error)
    }
  }

  const normalizedDate = new Date(dateSelected)
  const dateFormat = new Date(normalizedDate.getTime() + Math.abs(normalizedDate.getTimezoneOffset() * 60000));
  const date = new Intl.DateTimeFormat('default', dateOptions).format(dateFormat);

  return (
    <View>
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.headerContainer}>
          <Text style={style.header}>past daily progress</Text>
          <Text style={style.date}>{date}</Text>
        </View>
        <View style={style.goalBubble}>
          <Text style={style.percentage}>{state.totalGoalMet}%</Text>
          <Text style={style.bubbleText}>of your daily needs have been met!</Text>
        </View>
        <View style={style.infoContainer}>
          {
            Object.keys(state.historicalTotal).map((nutrient) => {
              const name = nutrient.includes('vitamin') ? formatName(nutrient) : nutrient;
              return (
                <GoalBar key={nutrient} nutrient={{ name, ...state.historicalTotal[nutrient] }} />
              );
            })
          }
        </View>
        <View style={style.infoContainer}>
          <Text style={{ ...style.header, marginVertical: 35, }}>today's intake:</Text>
          {
            state.historicalProgress.length ? state.historicalProgress.map((item) =>
              <ItemButton key={item.uniqueId} item={item} />
            ) : (
              <Text style={style.noResultText}>Get out there and eat something good :)</Text>
            )
          }
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  containerGraph: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },

  headerContainer: {
    marginVertical: 35,
  },

  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    color: COLORS.darkblue,
    marginBottom: 3
  },

  date: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: COLORS.turq,
  },

  goalBubble: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.sage,
    justifyContent: 'center',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    marginBottom: 20,
    elevation: 1,
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
    paddingHorizontal: 15,
    color: COLORS.darkblue,
  },

  infoContainer: {
    marginBottom: 30,
  },
  noResultText: {
    marginVertical: 5,
    color: COLORS.turq
  }
})