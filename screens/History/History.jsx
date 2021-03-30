import React, { useState, Fragment, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import styles from './History.style';
// import { LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../../globalStyles';
import XDate from 'xdate';
import { Octicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const API_URL = 'http://192.168.0.181:3001';
// const API_URL = process.env.API_URI;

export default function History() {
  const { dateSelectedState } = useSelector(state => state.dateSelectedState);
  const { _id, birthdate, sex } = useSelector(state => state.user);
  const today = new XDate();
  const todayMonth = today.toString("MMMM yyyy")
  const [selected, setSelected] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [currentMonth, setMonth] = useState(todayMonth)
  const [dateIsSelected, setDateIsSelected] = useState(false);
  const twoWeeksAhead = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
  const navigation = useNavigation();
  const [days, setDays] = useState([]);  
 
  useEffect(()=>{
    setSelected('');
    getDays();
    daysOver50();
    // daysReached100();
  },[])

  const handleMonthChange = (month) => {
    const dateStr = month.dateString;
    const dateForm = new Date(dateStr);
    const thisMonth = dateForm.toLocaleDateString('en-gb', {
      month: 'long',
      year: 'numeric'
    });
    setMonth(thisMonth)
  }

  const onDayPress = selectedDay => {
    const dateSelected = selectedDay.dateString;
    navigation.navigate('Selected Date', {dateSelected});
    setSelected(dateSelected);
    const dateForm = new Date(selected);
    const formattedDate = dateForm.toLocaleDateString('en-gb', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'utc'
    });
    setDateIsSelected(true);
    setSelectedFormat(formattedDate);
  };

  const getDays = async () => {
    const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${API_URL}/userdays/${_id}`, config);
      setDays(data)
    } catch (error) {
      console.log('error in here ', error)
    }
  }

  const daysOver50 = () => {
    const over50 = days.filter(day => {
      return day.totalGoalMet > 50
    })
    const datesOver50 = over50.map(day => {
      return day.date;
    })
    console.log(' datesover50 ', datesOver50);
    return datesOver50;
  }

  // const daysReached100 = () => {
  //     const day100 = days.filter(day => {
  //       return day.totalGoalMet >= 100;
  //     })
  //     return dates100;
  // }

  const loggedFormat = { selected: true, selectedColor: COLORS.turq }
  const forCalendar = days.map(day => ({
    key: [day.date], value: loggedFormat
  }))
  const objectFormat = forCalendar.reduce(
    (obj, item) => Object.assign(obj, { [item.key]: item.value }), {});

  console.log(objectFormat)





  LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL.', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'TH', 'F', 'SA'],
    today: 'Today'
  };
  LocaleConfig.defaultLocale = 'en';

  return (
    <View style={styles.container}>
      <View>
        <Calendar
          style={styles.calendar}
          current={today}
          // minDate={'2021-03-01'}
          // maxDate={twoWeeksAhead}
          onDayPress={onDayPress}
          onMonthChange={handleMonthChange}
          hideExtraDays={true}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          markedDates = {
            objectFormat
            // [selected]: {
            //   selected: true,
            //   disableTouchEvent: true,
            //   selectedColor: COLORS.sage,
            //   selectedTextColor: COLORS.darkblue
            //   }
            }
        />
      </View>
      <View style={styles.guide}>
        <Text ><Octicons name="primitive-dot" size={30} color={COLORS.sage} />    Logged at least 1 item </Text>
        <Text ><Octicons name="primitive-dot" size={30} color={COLORS.turq} />   Met 50% of your goals </Text>
        <Text ><Octicons name="primitive-dot" size={30} color={COLORS.darkblue} />   Met 100% of your goals</Text>
      </View>
    </View>
  );
};