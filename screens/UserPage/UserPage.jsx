import React, { useEffect, useState } from 'react';
import { Text, View, Image, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './UserPage.style';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import UpdateInfo from '../UpdateInfo/UpdateInfo';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
import { createStackNavigator } from '@react-navigation/stack';
import keys from './keys';
import logoutUser from '../../store/actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { RNS3 } from 'react-native-aws3';
const baseS3Uri = 'https://bountifull.s3-us-west-1.amazonaws.com';

export default function UserPage({ navigation }) {
  const user = useSelector(state => state.user);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleLogout = async () => {
    console.log('logging out')
    await dispatch(logoutUser());
  }
  
  const calculateAge = (birthdate) => 
    Math.floor((new Date() - new Date(birthdate).getTime()) / 3.15576e+10)
  
  const imageFromCamera = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      // console.log('photo', photo);
      const photoTakenUri = photo;
      saveImageToAWS3(photoTakenUri.uri)
      // console.log(photoTakenUri.uri)
    }
  }

  // const imageFromGallery = async() => {
  //   if(hasPermission) {
  //     let data = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images, 
  //       allowsEditing:true, 
  //       aspect: [1,1],
  //       quality:0.5
  //     })
  //     console.log(data)
  //     saveImageToAWS3(data.uri)
  //   } else {
  //     alert('You must grant permission to choose an image');
  //   }
  // }

  const saveImageToAWS3 = (image) => {
    const file = {
      uri: image,
      name: Math.random().toString(36),
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
      console.log(file.name);
      // saveAvatar link?({image_url: file.name })
      console.log('received by aws3 bountifull')
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
    <View style={styles.container}>
      <Image source={{ uri: `${baseS3Uri}/profilepic.jpg` }} style={styles.avatar}></Image>
      {/* camera should only open when clicked on icon */}
      {/* <View style={styles.container}>
        <TouchableOpacity onPress={imageFromCamera}>
          <FontAwesome name="camera" size={24} color="black" />
        </TouchableOpacity>
        <Camera type={type} ref={ref => {
          setCameraRef(ref);
        }}>
          <View
            style={{
              // flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'flex-end'
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end'
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf: 'center' }}
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();
                  // console.log('photo', photo);
                  const photoTakenUri = photo;
                  saveImageToAWS3(photoTakenUri.uri)
                  // console.log(photoTakenUri.uri)
                }
              }}>
              <View style={{
                borderWidth: 2,
                borderRadius: "50%",
                borderColor: 'white',
                height: 50,
                width: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <View style={{
                  borderWidth: 2,
                  borderRadius: "50%",
                  borderColor: 'white',
                  height: 40,
                  width: 40,
                  backgroundColor: 'white'
                }} >
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View> */}
      <Text style={styles.header}>{user.name}</Text>
      <Text style={styles.memberSince}>Member since { }</Text>
      <Text style={styles.secondaryText}>{user.email}</Text>
      <Text style={styles.secondaryText}>{calculateAge(user.birthdate)} years old</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.submitbutton}
        onPress={() => navigation.push('UpdateInfo')}
        >
        <Text style={styles.buttontext}>
          Update info
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submitbutton}
        onPress={handleLogout}>
        <Text style={styles.buttontext}>
          Logout
        </Text>
      </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};