import React, { useState, useCallback } from 'react';
import { Text, Dimensions, View, Alert, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './Registration.style';
import { StatusBar } from 'expo-status-bar';
import { registerUser } from '../../store/actions';
import { RadioButton } from 'react-native-paper';
import { COLORS } from '../../globalStyles';
import { useDispatch } from 'react-redux';
import { DatePickerModal } from 'react-native-paper-dates';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import keys from '../../utils/keys';
import { RNS3 } from 'react-native-aws3';
import 'intl';
import 'intl/locale-data/jsonp/en';

import { Camera } from 'expo-camera';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState('null')
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [userAvatar, setUserAvatar] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);

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

  const askForPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        // alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        setHasPermission(true);
      }
    }
  }

  const cameraDirection = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const closeCamera = () => {
    setOpenCamera(false);
    console.log(openCamera);
  }

  const openPicOptions = async () => {
    setOpenCamera(true);
    console.log(openCamera);
  }

  const askForCameraPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    }

  const imageFromCamera = async () => {
    askForCameraPermission();
    if(hasCameraPermission) {
      if (cameraRef) {
        let photo = await cameraRef.takePictureAsync();
        if(photo) {
        setUserAvatar(photo.uri);
        saveImageToAWS3(photo.uri);
        closeCamera();
        }
      }
    } else {
      console.log('need camera permission');
    }
  }

  const imageFromGallery = async () => {
    await askForPermission();
    if (hasPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })
      if (result) {
        setUserAvatar(result.uri);
        console.log('user avatar ', userAvatar)
        saveImageToAWS3(result.uri)
      }
    } else {
      console.log('You must grant permission to choose an image');
    }
  }

  const saveImageToAWS3 = (image) => {
    const file = {
      uri: image,
      name: Math.random().toString(36).slice(2),
      type: 'image/png'
    }
    const config = {
      keyPrefix: '',
      bucket: 'bountifull',
      region: 'us-west-1',
      accessKey: keys.AccessKey,
      secretKey: keys.SecretKey,
      successActionStatus: 201,
    }
    RNS3.put(file, config).then(res => {
      if (res.status !== 201) throw new Error('failed to upload image to s3')
      setAvatarUri(file.name);
      console.log(file.name, ' received by aws3 bountifull')
      console.log('avatarURI ', avatarUri)
    })
  }

  const onSubmit = async () => {
    // console.log(formData)
    // console.log(date)
    console.log('avatar uri to be saved to db ', avatarUri)
    const res = await dispatch(registerUser({ ...formData, birthdate: date, avatar: avatarUri }));
    if (res.type === 'REGISTER_USER_ERROR') {
      Alert.alert("Please complete all fields to register", "Please try again", [
        { text: 'okay' }
      ])
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} >
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

        <View>
          <TouchableOpacity style={styles.submitbutton} onPress={openPicOptions}>
            <Text style={styles.buttontext}>Profile picture</Text>
          </TouchableOpacity>
          {openCamera &&
            <View>
            <TouchableOpacity style={{ alignItems: 'center'}} onPress={closeCamera}>
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitbutton} onPress={imageFromGallery}>
                <Ionicons name="images" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitbutton} onPress={imageFromCamera}>
                <Ionicons name="camera" size={24} />
              </TouchableOpacity>
              { hasCameraPermission &&
                <View style={{flex: 2}}>
                    <Camera ref={ref => {setCameraRef(ref)}} style={{ height: 200, width: 200}} type={type}>
                      <View style={{backgroundColor: 'transparent'}}>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            setType(
                              type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                          }}>
                          <Text style={{color: 'white', fontSize:18}}> Flip </Text>
                        </TouchableOpacity>
                      </View>
                        <TouchableOpacity style={{ alignSelf: 'center' }}
                          onPress={imageFromCamera}>
                          <View style={{
                            borderWidth: 2,
                            borderRadius: 35/2,
                            borderColor: 'white',
                            height: 35,
                            width: 35,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          >
                            <View style={{
                              borderWidth: 2,
                              borderRadius: 35/2,
                              borderColor: 'white',
                              height: 25,
                              width: 25,
                              backgroundColor: 'white'
                            }} >
                            </View>
                        </View>
                        </TouchableOpacity>
                      </View>
                    </Camera>
                  </View> 
                }
            </View>
          }
        </View>
        <TouchableOpacity
          style={styles.submitbutton}
          onPress={onSubmit}
        >
          <Text
            style={styles.buttontext}
          >Submit</Text>
        </TouchableOpacity>
         {userAvatar && <Image source={{ uri: userAvatar }} style={{ width: 150, height: 150, borderRadius: 150 / 2 }} />}
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
