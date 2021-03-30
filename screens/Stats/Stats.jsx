import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { GoalBar } from '../../components/GoalBar/GoalBar';
import { COLORS } from '../../globalStyles';
import style from "./UpdateInfo.style";

import ItemButton from '../../components/ItemButton/ItemButton';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import { calcTotalProgress, calcTotalsByNutrient } from '../../utils/nutrients';

const API_URL = 'http://192.168.1.148:3001';


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
        <View style={style.containerGraph}>
          <VictoryChart
            theme={VictoryTheme.material}
          >
            <VictoryLine
              style={{
                data: { stroke: COLORS.turq },
                parent: { border: COLORS.darkblue }
              }}
              categories={{
                x: ["Jan", "Feb", "Mar", "Apr", "May"]
              }}
              data={[
                { x: "Jan", y: .16 },
                { x: "Feb", y: .40 },
                { x: "Mar", y: .30 },
                { x: "Apr", y: .50 },
                { x: "May", y: .60 }
              ]}
            />
          </VictoryChart>
        </View>
      </ScrollView>
    </View>
  );
};