import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DatePickerModal } from "react-native-paper-dates";
import { RadioButton } from "react-native-paper";
import { RNS3 } from "react-native-aws3";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import "intl";
import "intl/locale-data/jsonp/en";
import styles from "./UpdateInfo.style";
import { updateUser } from "../../store/actions";
import { COLORS } from "../../globalStyles";
import keys from "../../utils/keys";

export default function UpdateInfo() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState("");
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
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
      console.log(date);
      setInputData({ ...inputData, birthdate: date})
      setSelectedButton("");
    },
    [setOpen, setDate, setInputData]
  );

  const askForCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  const askForPermission = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        // alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        setHasPermission(true);
      }
    }
  };

  const cameraDirection = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const imageFromCamera = async () => {
    // setFromCamera(true);
    askForCameraPermission();
    if (hasCameraPermission) {
      if (cameraRef) {
        let photo = await cameraRef.takePictureAsync();
        if (photo) {
          saveImageToAWS3(photo.uri);
          closeCamera();
        }
      }
    } else {
      console.log("need camera permission");
    }
  };

  const closeCamera = () => {
    setHasCameraPermission(false);
  };

  const imageFromGallery = async () => {
    await askForPermission();
    if (hasPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result) {
        saveImageToAWS3(result.uri);
      }
    } else {
      console.log("You must grant permission to choose an image");
    }
  };

  const saveImageToAWS3 = (image) => {
    const file = {
      uri: image,
      name: Math.random().toString(36).slice(2),
      type: "image/png",
    };
    const config = {
      keyPrefix: "",
      bucket: "bountifull",
      region: "us-west-1",
      accessKey: keys.AccessKey,
      secretKey: keys.SecretKey,
      successActionStatus: 201,
    };
    RNS3.put(file, config).then((res) => {
      if (res.status !== 201) throw new Error("failed to upload image to s3");
      setInputData({ ...inputData, avatar: file.name });
      console.log(`${file.name} received by aws3 bountifull`);
    });
  };

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
      <View>
        {selectedButton !== "UpdateAvatar" && (
          <TouchableOpacity
            style={styles.submitbutton}
            onPress={() => setSelectedButton("UpdateAvatar")}
          >
            <Text style={styles.buttontext}>Update Picture</Text>
          </TouchableOpacity>
        )}
        {selectedButton === "UpdateAvatar" && (
          <View>
            <TouchableOpacity
              style={styles.submitbutton}
              onPress={imageFromGallery}
            >
              <Ionicons name="images" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitbutton}
              onPress={imageFromCamera}
            >
              <Ionicons name="camera" size={24} />
            </TouchableOpacity>
            {hasCameraPermission && (
              <View style={{ flex: 1 }}>
                <Camera
                  ref={(ref) => {
                    setCameraRef(ref);
                  }}
                  style={{
                    height: 200,
                    width: 200,
                    borderWidth: 4,
                    borderColor: "black",
                  }}
                  type={type}
                >
                  <View style={{ backgroundColor: "transparent" }}>
                    <View>
                      <TouchableOpacity
                        style={styles.cancelCameraButton}
                        onPress={closeCamera}
                      >
                        <MaterialIcons name="cancel" size={24} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.flipButton}
                        onPress={cameraDirection}
                      >
                        <MaterialIcons
                          name="flip-camera-android"
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={{ alignSelf: "center", marginTop: 110 }}
                        onPress={imageFromCamera}
                      >
                        <View style={styles.outerCircle}>
                          <View style={styles.innerCircle} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Camera>
              </View>
            )}
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={closeCamera}
            >
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
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
    </KeyboardAvoidingView>
  );
}
