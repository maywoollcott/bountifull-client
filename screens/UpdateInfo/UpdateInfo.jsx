import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { updateUser } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./UpdateInfo.style";
// import { RadioButton } from "react-native-simple-radio-button";
// import { COLORS } from '../../globalStyles';

export default function UpdateInfo() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const [checked, setChecked] = useState('null');

  const [selectedNameButton, setSelectedNameButton] = useState("");
  const [selectedEmailButton, setSelectedEmailButton] = useState("");
  const [selectedPasswordButton, setSelectedPasswordButton] = useState("");
  const [selectedBirthdateButton, setSelectedBirthdateButton] = useState("");
  const [selectedSexButton, setSelectedSexButton] = useState("");

  const [inputData, setInputData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    birthdate: user.birthdate,
    sex: user.sex,
    avatar: 'url'
  })

  const handleSubmit = async () => {
    await dispatch(updateUser(inputData));
    
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={ styles.header }>Update Your Details</Text>
      <View>
        {selectedNameButton !== "UpdateName" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedNameButton("UpdateName")}
          >
            <Text style={styles.buttontext}>Update Name</Text>
          </TouchableOpacity>
        )}
        {selectedNameButton === "UpdateName" && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Name"
              name="name"
              onChangeText={(text) => setInputData({ ...inputData, name: text })}
            />
            <TouchableOpacity
              style={styles.addbutton}
              onPress={async () => {
                handleSubmit();
                setSelectedNameButton("");
              }}
            >
              <Text style={styles.addbuttontext}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {selectedEmailButton !== "UpdateEmail" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedEmailButton("UpdateEmail")}
          >
            <Text style={styles.buttontext}>Update Email</Text>
          </TouchableOpacity>
        )}
        {selectedEmailButton === "UpdateEmail" && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Email"
              name="email"
              onChangeText={(text) => setInputData({ ...inputData, email: text })}
            />
            <TouchableOpacity
              style={styles.addbutton}
              onPress={async () => {
                handleSubmit();
                setSelectedEmailButton("");
              }}
            >
              <Text style={styles.addbuttontext}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {selectedPasswordButton !== "UpdatePassword" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedPasswordButton("UpdatePassword")}
          >
            <Text style={styles.buttontext}>Update Password</Text>
          </TouchableOpacity>
        )}
        {selectedPasswordButton === "UpdatePassword" && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              name="password"
              onChangeText={(text) => setInputData({ ...inputData, password: text })}
            />
            <TouchableOpacity
              style={styles.addbutton}
              onPress={async () => {
                handleSubmit();
                setSelectedPasswordButton("");
              }}
            >
              <Text style={styles.addbuttontext}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {selectedBirthdateButton !== "UpdateBirthdate" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedBirthdateButton("UpdateBirthdate")}
          >
            <Text style={styles.buttontext}>Update Birthdate</Text>
          </TouchableOpacity>
        )}
        {selectedBirthdateButton === "UpdateBirthdate" && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Birthdate"
              name="birthdate"
              onChangeText={(text) => setInputData({ ...inputData, birthdate: text })}
            />
            <TouchableOpacity
              style={styles.addbutton}
              onPress={async () => {
                handleSubmit();
                setSelectedBirthdateButton("");
              }}
            >
              <Text style={styles.addbuttontext}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {selectedSexButton !== "UpdateSex" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedSexButton("UpdateSex")}
          >
            <Text style={styles.buttontext}>Update Sex</Text>
          </TouchableOpacity>
        )}
        {selectedSexButton === "UpdateSex" && (
          <View>
            {/* <View style={styles.radiocontainer}>
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
            <TouchableOpacity
              style={styles.addbutton}
              onPress={async () => {
                setSelectedSexButton("");
              }}
            >
              <Text style={styles.addbuttontext}>Save</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
