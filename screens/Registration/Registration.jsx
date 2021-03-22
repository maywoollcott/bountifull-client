import React, {useState} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './Registration.style';
import { StatusBar } from 'expo-status-bar';
import { registerUser } from '../../store/actions';
import { RadioButton } from 'react-native-paper';
import {COLORS} from '../../globalStyles';
import { TextInputMask } from 'react-native-masked-text'

export default function Dashboard() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthdate: '',
    sex: ''
  });

  const [checked, setChecked] = React.useState('null')

  const onSubmit = async () => {
    console.log(formData)
    const res = await registerUser(formData);
    console.log(res.payload) //obv this needs to be changed
    //set auth
    //route to dashboard
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headercontainer}>
        <Text style={styles.header}>Join the fun!</Text>
      </View>
      <View style={styles.formcontainer}>
        <TextInput 
          style={styles.input}
          placeholder='Name'
          name='name'
          onChangeText={text => setFormData({...formData, name: text})}
        />
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
        <TextInput 
          style={styles.input}
          placeholder='Birthdate'
          name='birthdate'
          onChangeText={text => setFormData({...formData, birthdate: text})}
        />
        <Text style={styles.sextext}>SEX:</Text>
        <View style={styles.radiocontainer}>
          <View style={styles.radioitem}>
            <RadioButton
              value="female"
              status={ checked === 'female' ? 'checked' : 'unchecked' }
              color={COLORS.turq}
              uncheckedColor={COLORS.darkblue}
              onPress={() => {
                setChecked('female');
                setFormData({...formData, sex: 'female'});
              }}
            />
            <Text style={styles.radiolabel}>Female</Text>
          </View>
          <View style={styles.radioitem}>
            <RadioButton
              value="male"
              status={ checked === 'male' ? 'checked' : 'unchecked' }
              color={COLORS.turq}
              uncheckedColor={COLORS.darkblue}
              onPress={() => {
                setChecked('male');
                setFormData({...formData, sex: 'male'});
              }}
            />
            <Text style={styles.radiolabel}>Male</Text>
          </View>
          <View style={styles.radioitem}>
            <RadioButton
              value="nonbinary"
              status={ checked === 'nonbinary' ? 'checked' : 'unchecked' }
              color={COLORS.turq}
              uncheckedColor={COLORS.darkblue}
              onPress={() => {
                setChecked('nonbinary');
                setFormData({...formData, sex: 'nonbinary'});
              }}
            />
            <Text style={styles.radiolabel}>Non-Binary</Text>
          </View>
        </View>
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
