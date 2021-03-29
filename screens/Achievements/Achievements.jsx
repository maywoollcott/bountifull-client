import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AntDesign, Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import styles from './Achievements.style';
import {COLORS} from '../../globalStyles';


export default function Achievements() {

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
            <Text style={styles.h1}>24</Text>
            <Text style={styles.h2}>CURRENT STREAK</Text>
          </View>
          <View style={styles.streakTextContainer}>
            <Text style={styles.h1}>32</Text>
            <Text style={styles.h2}>RECORD STREAK</Text>
          </View>
        </View>
      </View>
      <View style={styles.trophyRow}>
        <View style={styles.singleTrophyItem}>
          <MaterialIcons
            name='flash-on'
            size={80}
            color={COLORS.gray}
          />
          <Text style={styles.h3}>Log your food for 30 days in a row</Text>
        </View>
        <View style={styles.singleTrophyItem}>
          <MaterialIcons
            name='auto-awesome'
            size={80}
            color={COLORS.gray}
          />
          <Text style={styles.h3}>Log your food for 60 days in a row</Text>
        </View>
      </View>
      <View style={styles.trophyRow}>
        <View style={styles.singleTrophyItem}>
          <MaterialIcons
            name='stars'
            size={80}
            color={COLORS.turq}
          />
          <Text style={styles.h3}>Meet 100% of requirements in a single day</Text>
        </View>
        <View style={styles.singleTrophyItem}>
          <MaterialIcons
            name='military-tech'
            size={80}
            color={COLORS.gray}
          />
          <Text style={styles.h3}>Meet 100% of your requirements for 30 days in a row</Text>
        </View>
      </View>
    </View>
  );
};