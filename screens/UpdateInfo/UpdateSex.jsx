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
import { RadioButton } from 'react-native-paper';
import { COLORS } from '../../globalStyles';

export default function UpdateSex({ navigation }) {
  const [inputData, setInputData] = useState({ sex: "" });

  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState("null");

  const onSubmit = async () => {
    console.log(inputData);
    const res = await dispatch(updateUser(inputData));
    console.log(res.payload);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formcontainer}>
        <Text style={styles.sextext}>SEX:</Text>
        <View style={styles.radiocontainer}>
          <View style={styles.radioitem}>
            <RadioButton
              value="female"
              status={checked === "female" ? "checked" : "unchecked"}
              color={COLORS.turq}
              uncheckedColor={COLORS.darkblue}
              onPress={() => {
                setChecked("female");
                setInputData({ ...inputData, sex: "female" });
              }}
            />
            <Text style={styles.radiolabel}>Female</Text>
          </View>
          <View style={styles.radioitem}>
            <RadioButton
              value="male"
              status={checked === "male" ? "checked" : "unchecked"}
              color={COLORS.turq}
              uncheckedColor={COLORS.darkblue}
              onPress={() => {
                setChecked("male");
                setInputData({ ...inputData, sex: "male" });
              }}
            />
            <Text style={styles.radiolabel}>Male</Text>
          </View>
          <View style={styles.radioitem}>
            <RadioButton
              value="nonbinary"
              status={checked === "nonbinary" ? "checked" : "unchecked"}
              color={COLORS.turq}
              uncheckedColor={COLORS.darkblue}
              onPress={() => {
                setChecked("nonbinary");
                setInputData({ ...inputData, sex: "nonbinary" });
              }}
            />
            <Text style={styles.radiolabel}>Non-Binary</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.submitbutton} onPress={onSubmit}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
