import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { GoalBar } from '../../components/GoalBar/GoalBar';
import { COLORS } from '../../globalStyles';
import style from "./Stats.style";
import { useSelector } from 'react-redux';

import ItemButton from '../../components/ItemButton/ItemButton';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryLine } from "victory-native";
import { calcTotalProgress, calcTotalsByNutrient } from '../../utils/nutrients';
const API_URL = 'http://192.168.0.181:3001';


export default function Stats() {
  const { totalGoalMet } = useSelector(state => state);
  const { _id } = useSelector(state => state.user);
  const [days, setDays] = useState([]);


  useEffect(() => {
    getDays();
  }, [])

  const getDays = async () => {
    const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const {data} = await axios.get(`${API_URL}/userdays/${_id}`, config);
      setDays(data);
    } catch (error) {
      console.log('error ', error)
    }
  }
  const last15Days = days.slice(0, 15)
  const mappedDays = last15Days.map(day => {
    if (day.totalGoalMet === undefined) {
      return {x:day.date, y: 0}
    } else {
      return {x: day.date, y: day.totalGoalMet}

    }
  })

  function sortFunction(a,b){  
      var dateA = new Date(a.date).getTime();
      var dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;  
  }; 

  console.log(days)

  mappedDays.sort(sortFunction);

  const averageForMonth = days.map( day => {
    console.log(day.date)
  })

  const sampleData = mappedDays

  // const arr = [
  // { "_id": "6063bbb480a5a26dcc8a28c3",
  //   "date":"2021-03-30", 
  //     "totalGoalMet":5 },
  // { "_id": "60626a9a9f308e4a1833ddcf",
  //   "date":"2021-03-29", 
  //     "totalGoalMet":12 },
  // { "_id": "60626a9a9f308e4a1833ddcj",
  //   "date":"2021-04-2", 
  //     "totalGoalMet":12 },
  // { "_id": "60626a9a9f308e4a1833ddcg",
  //   "date":"2021-04-3", 
  //     "totalGoalMet":12 },
  // { "_id": "60626a9a9f308e4a1833ddcr",
  //   "date":"2021-04-4", 
  //     "totalGoalMet":5 },
  // { "_id": "60626a9a9f308e4a1833ddcp",
  //   "date":"2021-05-4", 
  //     "totalGoalMet":5 },
  // { "_id": "60626a9a9f308e4a1833ddcq",
  //   "date":"2021-05-4", 
  //     "totalGoalMet":10 },
  // ]

// const months = { }
// const entriesPerMonth = {}
//   const perMonth = arr.map( day => {
//   let date = day.date
//   let total = day.totalGoalMet
//   let count = 0
//   let user = day._id
//   let month = date.slice(5, 7);

//   if (month in months) {
//     months[month] += total
//     entriesPerMonth[month]++
//   } else {
//     months[month] = total
//     entriesPerMonth[month]=1
//   }
// })

// // const allMonths =  ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
// const finalAvg = {}
// const avgPerMonth = allMonths.map(eachMonth => {
//   const total = months[eachMonth];
//   const entries = entriesPerMonth[eachMonth]; 
//   // Math.round(num * 100) / 100
//   const avg = Math.round((total/entries)*100)/100;
//   finalAvg[eachMonth] = avg
//   return avg
// })


//   const sampleData = [    
//     { x: "03-26", y: 18 },
//     { x: "03-27", y: 40 },
//     { x:  "03-28", y: 30 },
//     { x:  "03-29", y: 50 },
//     { x:  "03-30", y: 60 }
// ]
  return (
    <View>
      <ScrollView contentContainerStyle={style.container}>
          <Text style={style.header}>My Stats</Text>
          <View style={style.containerGraph}>
          <Text style={style.graphTitle}>Percent daily goal met</Text>
          <VictoryChart
            title="Percent of daily goals met"
            theme={VictoryTheme.material}
            domainPadding={50}
          >
            <VictoryBar
              style={{ data: { fill: COLORS.sage } }}
              data={sampleData}
              // labels={({ datum }) => `  ${datum.y}%`}
            />
          </VictoryChart>
            {/* <VictoryChart theme={VictoryTheme.material}>
            <Text style={style.graphTitle}>Average daily goal met per month</Text>
              <VictoryLine
                style={{
                  data: { stroke: COLORS.turq },
                  parent: { border: COLORS.darkblue }
                }}
                
                data={finalAvg}
              />
            </VictoryChart> */}
          </View>
      </ScrollView>
    </View>
  );
};