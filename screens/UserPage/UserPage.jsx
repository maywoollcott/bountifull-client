import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './UserPage.style';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import keys from './keys';
import {updateUser, logoutUser} from '../../store/actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';

const baseS3Uri = 'https://bountifull.s3-us-west-1.amazonaws.com';

export default function UserPage({ navigation }) {
  const user = useSelector(state => state.user);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  // const [userAvatar, setUserAvatar] = useState('')
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log('logging out');
    await dispatch(logoutUser());
  }

  const updateImage = async () => {
    setUpdateAvatar(true);
    console.log(updateAvatar);
  }

  const closeCamera = () => {
    setUpdateAvatar(false);
    console.log(updateAvatar);
  }

  const calculateAge = (birthdate) => 
    Math.floor((new Date() - new Date(birthdate).getTime()) / 3.15576e+10);

  const askForPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        // alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        setHasPermission(true);
      }
    }
  }

  const imageFromGallery = async () => {
    await askForPermission();
    if (hasPermission) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })
      console.log(data)
      if (data) {
        saveImageToAWS3(data.uri)
      }
    } else {
      alert('You must grant permission to choose an image');
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
      console.log(file.name);
      // setUserAvatar(file.name);
      // console.log('user avatar is ', userAvatar)
      // updateUserAvatar(userAvatar);
      // saveAvatar link?({image_url: file.name })
      console.log('received by aws3 bountifull')
    })
  }

  const updateUserAvatar = async (userAvatar) => {
    // const res = await dispatch(updateUser({...user, avatar:userAvatar}));
    console.log('UPDATING USER AVATAR');
    console.log(res);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: `${baseS3Uri}/profilepic.jpg` }} style={styles.avatar}></Image>
        {/* <Image source={{ uri:  }} style={styles.avatar}></Image> */}
        <TouchableOpacity style={styles.submitbutton} onPress={updateImage}>
          <Text>UpdateImage</Text>
        </TouchableOpacity>
        {updateAvatar &&
          <View>
            <TouchableOpacity style={styles.submitbutton} onPress={closeCamera}>
            <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitbutton} onPress={() => navigation.push('Camera')}>
              <FontAwesome name="camera" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitbutton} onPress={imageFromGallery}>
              {/* <MaterialIcons name="photo-library" size={24}/> */}
              <Ionicons name="images" size={24} />
            </TouchableOpacity>
          </View>
        }
        <Text style={styles.header}>{user.name}</Text>
        <Text style={styles.memberSince}>Member since { }</Text>
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
            onPress={() => navigation.push('UpdateInfo')}>
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