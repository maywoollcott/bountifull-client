import React, {useState, Fragment} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from './History.style';
import { LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../../globalStyles';

export default function History() {
  const today = new Date()
  const [selected, setSelected] = useState(today.toDateString());

  const [date, setDate] = useState(new Date());
  const [currentMonth, setMonth]= useState('March')
  //will this update automatically?
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

  const handleMonthChange = (month) => { 
    console.log('month changed', month) 
    setMonth(month);
  }

  const onDayPress = selectedDay => {
    console.log(selectedDay)
    setSelected(selectedDay.dateString);
  };
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
      {/* <Text>History Page</Text> */}
      <Text style={styles.header}>Today: {today.toDateString()}</Text>
      <View>
        <Calendar
          style={styles.calendar}
          // Initially visible month. Default = Date()
          current={today}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // min date would be the date that the user created their account(import state)
          minDate={'2021-02-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={nextWeek}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={onDayPress}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: COLORS.sage,
              selectedTextColor: COLORS.darkblue
            }
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => { console.log('selected day', day) }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={handleMonthChange}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // renderArrow={(direction) => (<Arrow />)}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          // firstDay={1}
          // Hide day names. Default = false
          // hideDayNames={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={true}
          // Disable right arrow. Default = false
          disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter.
          renderHeader={(date) => {/*Return JSX*/ }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue', 
            // textDayFontFamily: 'sans',
            // textMonthFontFamily: 'sans',
            // textDayHeaderFontFamily: 'sans',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
      </View>
      <Text>Date selected : {selected}</Text>

    </View>
  );
};