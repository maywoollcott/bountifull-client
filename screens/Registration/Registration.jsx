import React, { useState, useCallback } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './Registration.style';
import { StatusBar } from 'expo-status-bar';
import { registerUser } from '../../store/actions';
import { RadioButton } from 'react-native-paper';
import { COLORS } from '../../globalStyles';
import { useDispatch } from 'react-redux';
import { DatePickerModal } from 'react-native-paper-dates';
export default function Dashboard() {

  const dispatch = useDispatch();
  const [checked, setChecked] = useState('null')
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthdate: '',
    sex: '',
    avatar: ''
  });
  
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const exitCalendar = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmDate = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate, setFormData]
  );

  const onSubmit = async () => {
    console.log(formData)
    console.log(date)
    const res = await dispatch(registerUser({ ...formData, birthdate: date }));
    console.log(res.payload)
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
          onChangeText={text => setFormData({ ...formData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          name='email'
          onChangeText={text => setFormData({ ...formData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          name='password'
          onChangeText={text => setFormData({ ...formData, password: text })}
        />
        <View>
          <TouchableOpacity onPress={() => setOpen(true)} uppercase={false} mode="outlined">
            <Text style={styles.birthdate}>{date ? dateFormatter.format(date) : 'Birthdate'}</Text>
            <DatePickerModal
              mode="single"
              visible={open}
              onDismiss={exitCalendar}
              date={date}
              onConfirm={onConfirmDate}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.sextext}>SEX:</Text>
        <View style={styles.radiocontainer}>
          <View style={styles.radioitem}>
            <RadioButton
              value="female"
              status={checked === 'female' ? 'checked' : 'unchecked'}
              color={COLORS.turq}
              uncheckedColor={COLORS.darkblue}
              onPress={() => {
                setChecked('female');
                setFormData({ ...formData, sex: 'female' });
              }}
            />
            <Text style={styles.radiolabel}>Female</Text>
          </View>
          <View style={styles.radioitem}>
            <RadioButton
              value="male"
              status={checked === 'male' ? 'checked' : 'unchecked'}
              color={COLORS.turq}
              uncheckedColor={COLORS.darkblue}
              onPress={() => {
                setChecked('male');
                setFormData({ ...formData, sex: 'male' });
              }}
            />
            <Text style={styles.radiolabel}>Male</Text>
          </View>
          <View style={styles.radioitem}>
            <RadioButton
              value="nonbinary"
              status={checked === 'nonbinary' ? 'checked' : 'unchecked'}
              color={COLORS.turq}
              uncheckedColor={COLORS.darkblue}
              onPress={() => {
                setChecked('nonbinary');
                setFormData({ ...formData, sex: 'nonbinary' });
              }}
            />
            <Text style={styles.radiolabel}>Non-Binary</Text>
          </View>
        </View>
        <Text>Profile picture</Text>
        <View>
          <TouchableOpacity
            style={styles.submitbutton}
          // onPress={onSubmit}
          >
            <Text
              style={styles.buttontext}
            >Select</Text>
          </TouchableOpacity>
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
