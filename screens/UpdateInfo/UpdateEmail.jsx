import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { updateUser } from "../../store/actions";
import { useDispatch } from "react-redux";
import styles from "./UpdateName.style";

export default function UpdateEmail({ navigation }) {

	const [inputData, setInputData] = useState({email : ''});

	const dispatch = useDispatch();

	const onSubmit = async () => {
		console.log (inputData);
		const res = await dispatch(updateUser(inputData));
		console.log(res.payload);
	}



  return (
    <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="New Email"
          name="email"
          onChangeText={(text) => setInputData({ email: text })}
        />
        <TouchableOpacity style={styles.submitbutton} onPress={onSubmit}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
