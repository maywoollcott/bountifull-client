import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { RadioButton } from "react-native-paper";
import { updateUser } from "../../store/actions";
import styles from "./UpdateInfo.style";
import { COLORS } from "../../globalStyles";

export default function UpdateInfo() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState("");
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");
  const [inputData, setInputData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    birthdate: user.birthdate,
    sex: user.sex,
    avatar: user.avatar,
  });

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const exitCalendar = useCallback(() => {
    setOpen(false);
    setSelectedButton("");
  }, [setOpen]);

  const onConfirmDate = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      setSelectedButton("");
    },
    [setOpen, setDate, setInputData]
  );

  const handleSubmit = async () => {
    await dispatch(updateUser(inputData));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.header}>Update Your Details</Text>
      <View>
        {selectedButton !== "UpdateName" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedButton("UpdateName")}
          >
            <Text style={styles.buttontext}>Update Name</Text>
          </TouchableOpacity>
        )}
        {selectedButton === "UpdateName" && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Name"
              name="name"
              onChangeText={(text) =>
                setInputData({ ...inputData, name: text })
              }
            />
            <TouchableOpacity
              style={styles.savebutton}
              onPress={async () => {
                handleSubmit();
                setSelectedButton("");
              }}
            >
              <Text style={styles.savebuttontext}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {selectedButton !== "UpdateEmail" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedButton("UpdateEmail")}
          >
            <Text style={styles.buttontext}>Update Email</Text>
          </TouchableOpacity>
        )}
        {selectedButton === "UpdateEmail" && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Email"
              name="email"
              onChangeText={(text) =>
                setInputData({ ...inputData, email: text })
              }
            />
            <TouchableOpacity
              style={styles.savebutton}
              onPress={async () => {
                handleSubmit();
                setSelectedButton("");
              }}
            >
              <Text style={styles.savebuttontext}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {selectedButton !== "UpdatePassword" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedButton("UpdatePassword")}
          >
            <Text style={styles.buttontext}>Update Password</Text>
          </TouchableOpacity>
        )}
        {selectedButton === "UpdatePassword" && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              name="password"
              onChangeText={(text) =>
                setInputData({ ...inputData, password: text })
              }
            />
            <TouchableOpacity
              style={styles.savebutton}
              onPress={async () => {
                handleSubmit();
                setSelectedButton("");
              }}
            >
              <Text style={styles.savebuttontext}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {selectedButton !== "UpdateBirthdate" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => {
              setSelectedButton("UpdateBirthdate");
              setOpen(true);
            }}
          >
            <Text style={styles.buttontext}>Update Birthdate</Text>
          </TouchableOpacity>
        )}
        {selectedButton === "UpdateBirthdate" && (
          <View>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              uppercase={false}
              mode="outlined"
            >
              <Text style={styles.birthdate}>
                {date ? dateFormatter.format(date) : "Birthdate"}
              </Text>
              <DatePickerModal
                mode="single"
                visible={open}
                onDismiss={exitCalendar}
                date={date}
                onConfirm={onConfirmDate}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {selectedButton !== "UpdateSex" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedButton("UpdateSex")}
          >
            <Text style={styles.buttontext}>Update Sex</Text>
          </TouchableOpacity>
        )}
        {selectedButton === "UpdateSex" && (
          <View>
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
            <TouchableOpacity
              style={styles.savesexbutton}
              onPress={async () => {
                handleSubmit();
                setSelectedButton("");
              }}
            >
              <Text style={styles.savebuttontext}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
