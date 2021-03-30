
import React, { useState, Fragment, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LocaleConfig, Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from './History.style';
// import { LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../../globalStyles';
import XDate from 'xdate';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.0.181:3001';


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

  useEffect(()=>{
    setSelected('');
    daysGoalMet50();
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
    console.log(dateIsSelected)
    setSelectedFormat(formattedDate);
  };

  const filterBy50 = (day) => {
    if (day.totalGoalMet >= 50) {
      return true;
    }
    return false;
  }

  const daysGoalMet50 = async () => {
    const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const currentUser  = await axios.get(`${API_URL}/user/${_id}`, config);
      console.log(currentUser)
      const userDays = currentUser.data.days;
      console.log(userDays.map(day => console.log(day.date)))
      // console.log('user days ' + )

      const dayArr = userDays.filter( (day) => {
        day.totalGoalMet >= 50;
      })
      console.log(dayArr);
    } catch (error) {
      console.log('error ', error)
    }
  }

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
      <View style={styles.guide}>
        <Text >Click to view your stats and log for a particular day</Text>
      </View>
      <View>
        <Calendar
          style={styles.calendar}
          current={today}
          minDate={'2021-03-01'}
          maxDate={twoWeeksAhead}
          onDayPress={onDayPress}
          onMonthChange={handleMonthChange}
          hideExtraDays={true}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          markedDates={{
            '2021-03-25': { selected: true, selectedColor: COLORS.turq, textColor: 'gray' },
            '2021-03-26': { selected: true, selectedColor: COLORS.turq},
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: COLORS.sage,
              selectedTextColor: COLORS.darkblue
            }
          }}
        />
      </View>
    </View>
  );
};