import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './UserPage.style';
import keys from '../../utils/keys';
import { updateUser, logoutUser } from '../../store/actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function UserPage({ navigation }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log('logging out');
    await dispatch(logoutUser());
  }

  const calculateAge = (birthdate) => Math.floor((new Date() - new Date(birthdate).getTime()) / 3.15576e+10);
  const memberSince = (dateJoined) => {
    const yearJoined = dateJoined.toString().slice(0, 4);
    return yearJoined
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: `${keys.baseS3Uri}/${user.avatar}` }} style={styles.avatar}></Image>
        <Text style={styles.header}>{user.name}</Text>
        <Text style={styles.memberSince}>Member since {memberSince(user.createdAt)}</Text>
        <Text style={styles.secondaryText}>{user.email}</Text>
        <Text style={styles.secondaryText}>{calculateAge(user.birthdate)} years old</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => navigation.push('Achievements')}>
            <Text style={styles.buttontext}>
              Achievements
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => navigation.push('Stats')}>
            <Text style={styles.buttontext}>
              My Stats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => navigation.push('UpdateInfo')}>
            <Text style={styles.buttontext}>
              Update info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={handleLogout}>
            <Text style={styles.buttontext}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};