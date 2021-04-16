import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AntDesign, Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import styles from './Achievements.style';
import {COLORS} from '../../globalStyles';
import * as SecureStore from 'expo-secure-store';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Achievements() {
  
  const API_URL = process.env.EXPO_API_URL;

  const { _id } = useSelector(state => state.user);
  const dateToday = new Date().toISOString().substring(0, 10);
  const [days, setDays] = useState([]);
  const [streak, setStreak] = useState(0);
  const [streakRecord, setStreakRecord] = useState(0);
  const [singleDayHundredTrophy, setSingleDayHundredTrophy] = useState(false);
  const [thirtyDayHundredTrophy, setThirtyDayHundredTrophy] = useState(false);

  useEffect( () => {
    getDays();
  }, [])

  useEffect( () => {
    calculateCurrentStreak();
    calculateRecordStreak();
    checkSingleDayHundredTrophy();
    checkThirtyDayHundredTrophy();
  }, [days])
  
  const getDays = async () => {
    const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${API_URL}/userdays/${_id}`, config);
      console.log(data)
      setDays(data)
    } catch (error) {
      console.log('error ', error)
    }
  }

  const calculateCurrentStreak = () => {
    const activeDays = days.filter(day => {
      return day.totalGoalMet > 0;
    })
    const activeDates = activeDays.map(day => {
      return Date.parse(day.date);
    })

    let currentStreak = 0

    if (activeDates[0] === Date.parse(dateToday) || activeDates[0] === Date.parse(dateToday) - 86400000) {
      currentStreak = 1
      for (let i = 0; i < activeDates.length; i++) {
        if (activeDates[i] - activeDates[i+1] === 86400000) {
          currentStreak ++
        } else {
          break;
        }
      }
    };
    setStreak(currentStreak);
  }

  const calculateRecordStreak = () => {
    const activeDays = days.filter(day => {
      return day.totalGoalMet > 0;
    })
    const activeDates = activeDays.map(day => {
      return Date.parse(day.date);
    })

    if (activeDates.length > 0) {
      let longestConsecutive = 1
      let currentConsecutive = 1
      for (let i = 0; i < activeDates.length; i++) {
        if (activeDates[i] - activeDates[i+1] === 86400000) {
          currentConsecutive ++
          if (currentConsecutive > longestConsecutive) {
            longestConsecutive = currentConsecutive
          };
        } else {
          currentConsecutive = 1
        }
      }
      setStreakRecord(longestConsecutive);
    }
  }

  const checkSingleDayHundredTrophy = () => {
    const hundredDays = days.filter(day => {
      return day.totalGoalMet >= 100;
    })
    if (hundredDays.length > 0) setSingleDayHundredTrophy(true);
  }

  const checkThirtyDayHundredTrophy = () => {
    const hundredDays = days.filter(day => {
      return day.totalGoalMet >= 100;
    })
    const hundredDates = hundredDays.map(day => {
      return Date.parse(day.date);
    })
    console.log(hundredDates)
    if (hundredDates.length >= 30) {
      let longestConsecutive = 1
      let currentConsecutive = 1
      for (let i = 0; i < hundredDates.length; i++) {
        if (hundredDates[i] - hundredDates[i+1] === 86400000) {
          currentConsecutive ++
          if (currentConsecutive > longestConsecutive) {
            longestConsecutive = currentConsecutive
          };
        } else {
          currentConsecutive = 1
        }
      };
      if (longestConsecutive >= 30) setThirtyDayHundredTrophy(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialIcons
          name='emoji-events'
          size={80}
          color={COLORS.turq}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.h1}>Achievements</Text>
          <Text style={styles.h2}>Winner winner,</Text>
          <Text style={styles.h2}>chicken (or tofu) dinner!</Text>
        </View>
        <MaterialIcons
          name='emoji-events'
          size={80}
          color={COLORS.turq}
        />
      </View>
      <View style={styles.trophyRow}>
        <View style={styles.currentStreakContainer}>
          <MaterialIcons
            name='local-fire-department'
            size={60}
            color={COLORS.darkblue}
          />
          <View style={styles.streakTextContainer}>
            <Text style={styles.h1}>{streak}</Text>
            <Text style={styles.h2}>CURRENT STREAK</Text>
          </View>
          <View style={styles.streakTextContainer}>
            <Text style={styles.h1}>{streakRecord}</Text>
            <Text style={styles.h2}>RECORD STREAK</Text>
          </View>
        </View>
      </View>
      <View style={styles.trophyRow}>
        <View style={styles.singleTrophyItem}>
          <MaterialIcons
            name='flash-on'
            size={80}
            color={streakRecord >= 30 ? COLORS.turq : COLORS.gray}
          />
          <Text style={styles.h3}>Log your food for 30 days in a row</Text>
        </View>
        <View style={styles.singleTrophyItem}>
          <MaterialIcons
            name='auto-awesome'
            size={80}
            color={streakRecord >= 60 ? COLORS.turq : COLORS.gray}
          />
          <Text style={styles.h3}>Log your food for 60 days in a row</Text>
        </View>
      </View>
      <View style={styles.trophyRow}>
        <View style={styles.singleTrophyItem}>
          <MaterialIcons
            name='stars'
            size={80}
            color={singleDayHundredTrophy ? COLORS.turq : COLORS.gray}
          />
          <Text style={styles.h3}>Meet 100% of requirements in a single day</Text>
        </View>
        <View style={styles.singleTrophyItem}>
          <MaterialIcons
            name='military-tech'
            size={80}
            color={thirtyDayHundredTrophy ? COLORS.turq : COLORS.gray}
          />
          <Text style={styles.h3}>Meet 100% of your requirements for 30 days in a row</Text>
        </View>
      </View>
    </View>
  );
};