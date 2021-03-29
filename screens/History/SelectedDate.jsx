import React, {useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { GoalBar } from '../../components/GoalBar/GoalBar';
import { COLORS } from '../../globalStyles';
import ItemButton from '../../components/ItemButton/ItemButton';
import axios from 'axios';
import { calcTotalProgress, calcTotalsByNutrient } from '../../utils/nutrients' ;
// import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";

// const dateSelected = '2021-03-27'
const API_URL = 'http://192.168.0.181:3001';

export default function DailyDetails({ route }) {
  const user = useSelector(state => state.user);
  const { dateSelected } = route.params;
  const { currentProgress } = route.params;
  const { totalGoalMet } = useSelector(state => state);

  const dateOptions = {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
  };
  const formatName = (name) => {
    return name.replace('n', 'n ');
  };


const deleteItem = async (_id) => {
  let currentProgress =[];
  try {
    let res = [];
    res = await axios.get(`${API_URL}/deleteItem`, {
      _id: _id,
    });
    // should get the currentProgress from the load
    const updatedItems = currentProgress.filter(item => {
      item._id === _id
    })
    console.log('Updated LIST ', updatedItems);
    return currentProgress;
  } catch (error) {
    console.log('error ', error)
  }
}

  // useEffect(() => {
  //   getItemsByIdAndDate()
  // }, []);

  // let currentProgress=[];

  // const getItemsByIdAndDate = async ()=> {
  //   const userId = user._id; 
  //   console.log(userId);
  //   console.log('date selected ', dateSelected);
  //   try {
  //     let res = [];
  //     res = await axios.get(`${API_URL}/getItems/${user._id}/${dateSelected}`, {
  //       user: user._id,
  //       dateCreated: '2021-03-27'
  //     });
  //     const items = res.data
  //     const singleItem = items.map((item)=> {
  //       currentProgress.push(item)
  //     })
  //     console.log('CURRENT PROGRESS ', currentProgress);
  //   } catch (error) {
  //     console.log('error ', error)
  //   }
  // }

  const dailyTotal = calcTotalsByNutrient({
    items: currentProgress,
    sex: user.sex,
    birthdate: user.birthdate,
  });


  console.log('CONSUMED ', currentProgress)
  // const itemsConsumed = [...currentProgress];


  const normalizedDate = new Date(dateSelected)
  const dateFormat = new Date(normalizedDate.getTime() + Math.abs(normalizedDate.getTimezoneOffset() * 60000)  );
  const date = new Intl.DateTimeFormat('default', dateOptions).format(dateFormat);

  return (
    <View>
    <ScrollView contentContainerStyle={style.container}>

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
      <View style={style.infoContainer}>
        <Text style={{ ...style.header, marginVertical: 35, }}>today's intake:</Text>
        {
            currentProgress.length ? currentProgress.map((item) =>
          <ItemButton key={item.uniqueId} item={item} />
          ) : (
            <Text>Get out there and eat something good. :)</Text>
          )
        }
      </View>
        {/* <View style={style.containerGraph}>
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
        </View> */}
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