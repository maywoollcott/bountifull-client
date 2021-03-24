import React, { useState, Fragment } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from './History.style';
import { LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../../globalStyles';
import XDate from 'xdate'
export default function History() {

  const today = new XDate();
  const todayMonth = today.toString("MMMM yyyy")
  const [selected, setSelected] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [currentMonth, setMonth] = useState(todayMonth)
  const [dateIsSelected, setDateIsSelected] = useState(false);
  const twoWeeksAhead = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)

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
    setSelected(dateSelected);
    console.log(selected)
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

  // when click on a date, show buttons at bottom of calendar with 'go to {selected}'? or should it just 
  // redirect to that clone of the details page? 



  LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL.', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'TH', 'F', 'SA'],
    // dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    today: 'Today'
  };




  LocaleConfig.defaultLocale = 'en';
  return (
    <View style={styles.container}>
      <View style={styles.guide}>
        <Text >Click to view your stats and log for a particular day</Text>
      </View>
      {/* <Text style={styles.header}>Today: {today.toDateString()}</Text> */}
      {/* <Text style={styles.header}>{today.toString("MMMM")}</Text> */}
      {/* <Text style={styles.header}>{currentMonth}</Text> */}
      <View>
        <Calendar
          style={styles.calendar}
          current={today}
          // min date would be the date that the user created their account(import state)
          minDate={'2021-02-01'}
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
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          // monthFormat={'yyyy MM'}
          onMonthChange={handleMonthChange}
          hideExtraDays={true}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
        />
      </View>
      {/* date selected just for reference. If ' */}
      {/* <Text style={styles.grayText}>Date selected : {selectedFormat}</Text> */}
      {/* <Text style={styles.grayText}>Date selected : {selected}</Text> */}
      <View>
        {dateIsSelected && 
          <TouchableOpacity style={styles.submitbutton}>
          <Text style={styles.buttontext}>GO TO {selected}</Text>
        </TouchableOpacity>}
      </View>

    </View>
  );
};