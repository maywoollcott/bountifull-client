import React, { useEffect, useState } from 'react';
import {Text, View, ScrollView } from 'react-native';
import { COLORS } from '../../globalStyles';
import style from "./Stats.style";
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { VictoryBar, VictoryChart, VictoryTheme,  VictoryLine } from "victory-native";

const API_URL = process.env.EXPO_API_URL;


export default function Stats() {
  const { totalGoalMet } = useSelector(state => state);
  const { _id } = useSelector(state => state.user);
  const [days, setDays] = useState([]);


  useEffect(() => {
    getDays();
  }, [])

  const sampleDaysArr = [
    // {
    //   "_id": "6063bbb480a5a26dcc8a28c23",
    //   "date": "2021-03-12",
    //   "totalGoalMet": 5
    // },
    // {
    //   "_id": "6063bbb480a5a26dcc8a28c13",
    //   "date": "2021-03-13",
    //   "totalGoalMet": 15
    // },
    // {
    //   "_id": "6063bbb480a5a26dcc8a28c3",
    //   "date": "2021-03-14",
    //   "totalGoalMet": 25
    // },
    // {
    //   "_id": "60626a9a9f308e4a1833ddcf",
    //   "date": "2021-03-15",
    //   "totalGoalMet": 30
    // },
    // {
    //   "_id": "60626a9a9f308e4a1833ddcj",
    //   "date": "2021-03-16",
    //   "totalGoalMet": 40
    // },
    // {
    //   "_id": "60626a9a9f308e4a1833ddcg",
    //   "date": "2021-03-17",
    //   "totalGoalMet": 60
    // },
    // {
    //   "_id": "60626a9a9f308e4a1833ddcr",
    //   "date": "2021-03-18",
    //   "totalGoalMet": 50
    // },
    // {
    //   "_id": "60626a9a9f308e4a1833ddcp",
    //   "date": "2021-03-19",
    //   "totalGoalMet": 5
    // },
    // {
    //   "_id": "60626a9a9f308e4a1833ddc1",
    //   "date": "2021-03-20",
    //   "totalGoalMet": 23
    // },
    // {
    //   "_id": "60626a9a9f308e4a1833ddq",
    //   "date": "2021-03-21",
    //   "totalGoalMet": 45
    // },
    // {
    //   "_id": "60626a9a9f308e4a1833ddw",
    //   "date": "2021-03-22",
    //   "totalGoalMet": 50
    // },

      {
        "_id": "60626a9a9f308e4a1833ddqpo",
        "date": "2021-3-30",
        "totalGoalMet": 0
      },
      {
        "_id": "60626a9a9f308e4a1833ddqy",
        "date": "2021-3-29",
        "totalGoalMet": 20
      },
      {
        "_id": "60626a9a9f308e4a1833ddt",
        "date": "2021-3-28",
        "totalGoalMet": 100
      },
      {
        "_id": "60626a9a9f308e4a1833ddr",
        "date": "2021-3-27",
        "totalGoalMet": 56
      },
      {
      "_id": "60626a9a9f308e4a1833dde",
      "date": "2021-03-27",
      "totalGoalMet": 0
    },
  ]

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
  const last15Days = sampleDaysArr.slice(0, 15)

  const mappedDays = last15Days.map(day => {
    if (day.totalGoalMet === undefined) {
      return {x:(day.date).slice(5), y: 0}
    } else {
      return { x: (day.date).slice(5), y: day.totalGoalMet}

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

  

  const arr = [
  { "_id": "6063bbb480a5a26dcc8a28c23",
    "date":"2021-01-30", 
      "totalGoalMet":5 },
  { "_id": "6063bbb480a5a26dcc8a28c13",
    "date":"2021-01-30", 
      "totalGoalMet":15 },
  { "_id": "6063bbb480a5a26dcc8a28c3",
    "date":"2021-03-30", 
      "totalGoalMet":25 },
  { "_id": "60626a9a9f308e4a1833ddcf",
    "date":"2021-03-29", 
      "totalGoalMet":30 },
  { "_id": "60626a9a9f308e4a1833ddcj",
    "date":"2021-04-2", 
      "totalGoalMet":40 },
  { "_id": "60626a9a9f308e4a1833ddcg",
    "date":"2021-04-3", 
      "totalGoalMet":60 },
  { "_id": "60626a9a9f308e4a1833ddcr",
    "date":"2021-04-4", 
      "totalGoalMet":50 },
  { "_id": "60626a9a9f308e4a1833ddcp",
    "date":"2021-05-4", 
      "totalGoalMet":5 },
  { "_id": "60626a9a9f308e4a1833ddc1",
    "date":"2021-06-4", 
      "totalGoalMet":23 },
  { "_id": "60626a9a9f308e4a1833ddq",
    "date":"2021-07-4", 
      "totalGoalMet":45 },
  { "_id": "60626a9a9f308e4a1833ddw",
    "date":"2021-08-4", 
      "totalGoalMet":50 },
  { "_id": "60626a9a9f308e4a1833dde",
    "date":"2021-09-4", 
      "totalGoalMet":70 },
  { "_id": "60626a9a9f308e4a1833ddr",
    "date":"2021-10-4", 
      "totalGoalMet":55 },
  { "_id": "60626a9a9f308e4a1833ddt",
    "date":"2021-11-4", 
      "totalGoalMet":56 },
  { "_id": "60626a9a9f308e4a1833ddqy",
    "date":"2021-11-4", 
      "totalGoalMet":60 },
  { "_id": "60626a9a9f308e4a1833ddqpo",
    "date":"2021-12-5", 
      "totalGoalMet":70 },
  ]

const months = { }
const entriesPerMonth = {}
  const perMonth = arr.map( day => {
  let date = day.date
  let total = day.totalGoalMet
  let count = 0
  let user = day._id
  let month = date.slice(5, 7);

  if (month in months) {
    months[month] += total
    entriesPerMonth[month]++
  } else {
    months[month] = total
    entriesPerMonth[month]=1
  }
})

const allMonths =  ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
// const allMonths =  ['03', '04', '05']
const finalAvg = {}
const avgPerMonth = allMonths.map(eachMonth => {
  const total = months[eachMonth];
  const entries = entriesPerMonth[eachMonth]; 
  // Math.round(num * 100) / 100
  const avg = Math.round((total/entries)*100)/100;
  finalAvg[eachMonth] = avg
  return avg
})
  const mappedMonths = allMonths.map(month => {
    if (isNaN(finalAvg[month])) {
      return { x: month, y: 0 }
    } else {
      return { x: month, y: finalAvg[month] }
    }
  })

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
          <VictoryChart
            title="Percent of daily goals met"
            theme={VictoryTheme.material}
            maxDomain={{ y: 100 }}
            minDomain={{ y: 0 }}
            domainPadding={40}

          >
          <Text style={style.graphTitle}>Percent daily goal met</Text>
            <VictoryBar
              style={{ data: { fill: COLORS.sage } }}
              data={sampleData}
              // labels={({ datum }) => `  ${datum.y}%`}
            />
          </VictoryChart>
            <VictoryChart 
              theme={VictoryTheme.material}
              maxDomain={{ y: 100 }}
              minDomain={{ y: 0 }}>
            <Text style={style.graphTitle}>Average daily goal met per month</Text>
              <VictoryLine
                style={{
                  data: { stroke: COLORS.turq },
                  parent: { border: COLORS.darkblue }
                }}
              data={mappedMonths}
              />
            </VictoryChart>
          </View>
      </ScrollView>
    </View>
  );
};