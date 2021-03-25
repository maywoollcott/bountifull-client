import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { updateUser } from '../../store/actions';
import { useSelector } from 'react-redux';
import styles from './UpdateInfo.style';

export default function UpdateInfo({ navigation }) {
  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [updateName, setUpdateName] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [updateEmail, setUpdateEmail] = useState(false);
  const [userSex, setUserSex] = useState("");
  const [updateSex, setUpdateSex] = useState(false);
  const [userBirthdate, setUserBirthdate] = useState("");
  const [updateBirthdate, setUpdateBirthdate] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [updateAvatar, setUpdateAvatar] = useState(false);

  const updateUserName = async (userName) => {
    const res = await dispatchEvent(updateUser({ ...user, name: userName }));
    console.log("UPDATING USER NAME");
    console.log(res);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
        <Text>Update Info Page</Text>
        <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => navigation.push('UpdateName')}>
            <Text style={styles.buttontext}>
              Update Name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => navigation.push('UpdateEmail')}>
            <Text style={styles.buttontext}>
              Update Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => navigation.push('UpdatePassword')}>
            <Text style={styles.buttontext}>
              Update Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => navigation.push('UpdateBirthdate')}>
            <Text style={styles.buttontext}>
              Update Birthdate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => navigation.push('UpdateSex')}>
            <Text style={styles.buttontext}>
              Update Sex
            </Text>
          </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
