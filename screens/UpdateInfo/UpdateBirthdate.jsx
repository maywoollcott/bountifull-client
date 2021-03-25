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

export default function UpdateBirthdate({ navigation }) {

	const [inputData, setInputData] = useState({birthdate : ''});

	const dispatch = useDispatch();

	const onSubmit = async () => {
		console.log (inputData);
		const res = await dispatch(updateUser(inputData));
		console.log(res.payload);
	}



  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formcontainer}>
        <TextInput
          style={styles.input}
          placeholder="New Birthdate"
          name="birthdate"
          onChangeText={(text) => setInputData({ birthdate: text })}
        />
        <TouchableOpacity style={styles.submitbutton} onPress={onSubmit}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
