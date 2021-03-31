import React, { useState } from 'react';
import { Platform, Alert, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './Landing.style.jsx.jsx';
import { StatusBar } from 'expo-status-bar';
import { loginUser } from '../../store/actions'
import { useDispatch } from 'react-redux';
import { COLORS } from '../../globalStyles';

export default function Landing({ navigation }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const onSubmit = async () => {
    const res = await dispatch(loginUser(formData));
    console.log(res)
    if (res.type === 'LOGIN_ERROR') {
      Alert.alert("Wrong email or password", "Please try again", [
        { text: 'okay' }
      ])
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Image source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <View style={styles.namelogocontainer}>
        <Image source={require('../../assets/images/namelogopng.png')}
          style={styles.namelogo} />
      </View>
      <View style={styles.formcontainer}>

        <TextInput
          style={styles.input}
          placeholder='Email'
          name='email'
          returnKeyType='next'
          onChangeText={text => setFormData({ ...formData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          name='password'
          returnKeyType='go'
          onSubmitEditing={onSubmit}
          secureTextEntry={true}
          onChangeText={text => setFormData({ ...formData, password: text })}
        />
        <TouchableOpacity
          style={styles.submitbutton}
          onPress={onSubmit}
        >
          <Text
            style={styles.buttontext}
          >Submit</Text>
        </TouchableOpacity>

        <View style={{ margin: 15 }}>
          <Text style={{ color: COLORS.darkblue }}>Don't have an account, yet? </Text>
          <TouchableOpacity title='Go to Registration' onPress={() => navigation.push('Registration')}>
            <Text style={{ color: COLORS.turq, marginHorizontal: 65 }}>Sign up!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
