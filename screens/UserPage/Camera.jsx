import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './UserPage.style';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import UpdateInfo from '../UpdateInfo/UpdateInfo';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import keys from './keys';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RNS3 } from 'react-native-aws3';

const baseS3Uri = 'https://bountifull.s3-us-west-1.amazonaws.com';

export default function UserPage({ navigation }) {
  const user = useSelector(state => state.user);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  // const [updateAvatar, setUpdateAvatar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const imageFromCamera = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      const photoTakenUri = photo;
      saveImageToAWS3(photoTakenUri.uri)
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
      // saveAvatar link?({image_url: file.name })
      console.log('received by aws3 bountifull')
    })
  }
  const cameraDirection = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  return (
    <View style={{flex: 1}}>
        <Camera style={{flex:1}} type={type} ref={ref => {setCameraRef(ref)}}>
        {/* <Camera style={{flex:1}} type={type} > */}
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
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();
                  const photoTakenUri = photo;
                  saveImageToAWS3(photoTakenUri.uri)
                }
              }}>
              <View style={{
                borderWidth: 2,
                borderRadius: 30/2,
                borderColor: 'white',
                height: 30,
                width: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <View style={{
                  borderWidth: 2,
                  borderRadius: 30/2,
                  borderColor: 'white',
                  height: 20,
                  width: 20,
                  backgroundColor: 'white'
                }} >
                </View>
            </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
  );
}