
import React, {useState} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './UserPage.style';

export default function UserPage() {


  const baseS3Uri ='https://bountifull.s3-us-west-1.amazonaws.com';
  // do we have the whole user object in state? we could just pull up their 
  // avatar uri and extract it 

  return (
    <View>
      <Text>User Page</Text>
      <Image source={{uri:`${baseS3Uri}/profilepic.jpg`}} style={styles.avatar}></Image>
      <Text>NAME</Text>
      <Text>Member since year created</Text>
      <Text>email</Text>
      <Text>age</Text>
      <TouchableOpacity
        style={styles.submitbutton}
        onPress={onSubmit}>
        <Text style={styles.buttontext}>
          Update info
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submitbutton}
        onPress={onSubmit}>
        <Text style={styles.buttontext}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};