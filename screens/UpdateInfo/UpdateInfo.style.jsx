import { StyleSheet } from "react-native";
import { COLORS } from "../../globalStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 35,
    color: COLORS.darkblue,
    fontWeight: "700",
    marginBottom: 20,
  },
  submitbutton: {
    margin: 7,
    backgroundColor: COLORS.turq,
    borderRadius: 15,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    elevation: 1,
  },
  buttontext: {
    color: "white",
    fontSize: 20,
  },
  input: {
    height: 50,
    width: 300,
    margin: 5,
    fontSize: 18,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: COLORS.darkblue,
  },
  savebutton: {
    backgroundColor: COLORS.sage,
    borderRadius: 7,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    margin: 7
  },
  savebuttontext: {
    color: COLORS.darkblue,
    fontSize: 20,
  },
  savesexbutton: {
    backgroundColor: COLORS.sage,
    borderRadius: 7,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    marginLeft: 45
  },

  radiocontainer: {
    flexDirection: "row",
    width: "80%",
    margin: 10,
  },
  radioitem: {
    flexDirection: "column",
    alignItems: "center",
  },
  radiolabel: {
    fontSize: 18,
    color: COLORS.turq,
    fontWeight: "700",
    padding: 5
  },
  innerCircle: {
    borderWidth: 2,
    borderRadius: 35 / 2,
    borderColor: 'white',
    height: 25,
    width: 25,
    backgroundColor: 'white'
  },
  outerCircle: {
    borderWidth: 2,
    borderRadius: 35 / 2,
    borderColor: 'white',
    height: 35,
    width: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    margin: 0,
    marginTop: -12,
    justifyContent: 'center'
  },
  flipButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 10
  },
  cancelCameraButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 0
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});