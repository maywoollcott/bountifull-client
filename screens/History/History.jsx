import React, { useState, Fragment, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from './History.style';
import { LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../../globalStyles';
import XDate from 'xdate';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/core';
const API_URL = 'http://192.168.0.181:3001';

export default function History({navigation}) {
  const user = useSelector(state => state.user);

  const { dateSelectedState } = useSelector(state => state.dateSelectedState);

  const today = new XDate();
  const todayMonth = today.toString("MMMM yyyy")
  const [selected, setSelected] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [currentMonth, setMonth] = useState(todayMonth)
  const [dateIsSelected, setDateIsSelected] = useState(false);
  const twoWeeksAhead = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)

  useEffect(()=>{
    setSelected('');
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

  const getItemsByIdAndDate = async (userId, dateSelected) => {
    // console.log(userId);
    let currentProgress =[];
    console.log('date selected ', dateSelected);
    try {
      let res = [];
      res = await axios.get(`${API_URL}/getItems/${userId}/${dateSelected}`, {
        user: userId,
        dateCreated: '2021-03-27'
      });
      const items = res.data
      const singleItem = items.map((item) => {
        currentProgress.push(item)
      })
      console.log('CURRENT PROGRESS ', currentProgress);
      return currentProgress;
    } catch (error) {
      console.log('error ', error)
    }
  }

  const onDayPress = selectedDay => {
    const dateSelected = selectedDay.dateString;
    currentProgress = getItemsByIdAndDate(user._id, dateSelected);
    navigation.navigate('Selected Date', { currentProgress, dateSelected });
    // navigation.navigate('Selected Date', {dateSelected});
    setSelected(dateSelected);
    // dateSelectedState = dateSelected;
    // console.log('DATE SELECTED ', dateSelected)
    // console.log('state ', dateSelectedState)
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
  // const onDayPress = selectedDay => {
  //   const dateSelected = selectedDay.dateString;
  //   navigation.navigate('Selected Date', {dateSelected});
  //   setSelected(dateSelected);
  //   // dateSelectedState = dateSelected;
  //   // console.log('DATE SELECTED ', dateSelected)
  //   // console.log('state ', dateSelectedState)
  //   const dateForm = new Date(selected);
  //   const formattedDate = dateForm.toLocaleDateString('en-gb', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     timeZone: 'utc'
  //   });
  //   setDateIsSelected(true);
  //   console.log(dateIsSelected)
  //   setSelectedFormat(formattedDate);
  // };

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
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: COLORS.sage,
              selectedTextColor: COLORS.darkblue
            }
          }}
          onMonthChange={handleMonthChange}
          hideExtraDays={true}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
        />
      </View>
    </View>
  );
};