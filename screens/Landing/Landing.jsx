import React, {useState} from 'react';
import { Platform, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './Landing.style.jsx.jsx';
import { StatusBar } from 'expo-status-bar';
import { loginUser } from '../../store/actions'
import { useDispatch } from 'react-redux';


export default function Landing() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const res = await dispatch(loginUser(formData));
    //set auth
    //route to dashboard
  }

  return (
    <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} 
        style={styles.logo}
      />
      <View style={styles.namelogocontainer}>
        <Image source={require('../../assets/images/namelogopng.png')} 
          style={styles.namelogo}/>
      </View>
      <View style={styles.formcontainer}>
        <TextInput 
          style={styles.input}
          placeholder='Email'
          name='email'
          returnKeyType='next'
          onChangeText={text => setFormData({...formData, email: text})}
        />
        <TextInput 
          style={styles.input}
          placeholder='Password'
          name='password'
          returnKeyType='go'
          onSubmitEditing={onSubmit}
          secureTextEntry={ true }
          onChangeText={text => setFormData({...formData, password: text})}
        />
        <TouchableOpacity
          style={styles.submitbutton}
          onPress={onSubmit}
        >
          <Text
            style={styles.buttontext}
          >Submit</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
