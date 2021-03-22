import React, {useState} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './Dashboard.style';
import { StatusBar } from 'expo-status-bar';
import { loginUser } from '../../store/actions'


export default function Dashboard() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const onSubmit = async () => {
    console.log('user email: ' + formData.email);
    console.log('user password: ' + formData.password);
    const res = await loginUser(formData);
    console.log(res.payload) //obv this needs to be changed
    //set auth
    //route to dashboard
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
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
          onChangeText={text => setFormData({...formData, email: text})}
        />
        <TextInput 
          style={styles.input}
          placeholder='Password'
          name='password'
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
