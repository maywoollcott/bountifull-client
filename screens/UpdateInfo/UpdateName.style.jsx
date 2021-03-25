import { StyleSheet } from "react-native";
import { COLORS } from "../../globalStyles";

export default StyleSheet.create({
  formcontainer: {
    marginTop: 10,
    alignItems: "center",
  },

  input: {
    height: 40,
    width: 270,
    margin: 5,
    fontSize: 18,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: COLORS.darkblue,
  },

  submitbutton: {
    margin: 5,
    backgroundColor: COLORS.turq,
    borderRadius: 7,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },

  buttontext: {
    color: "white",
    fontSize: 20,
  },
  radiocontainer: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 10,
    marginBottom: 20
  },

  radioitem: {
    flex: 1,
    alignItems: 'center'
  },

  sextext: {
    marginTop: 20,
    color: 'gray'
  }
});
