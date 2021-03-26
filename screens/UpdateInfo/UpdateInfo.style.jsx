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
    fontSize: 40,
    color: COLORS.darkblue,
    fontWeight: "700",
    marginBottom: 35,
  },
   submitbutton: {
    margin: 7,
    backgroundColor: COLORS.turq,
    borderRadius: 15,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  buttontext: {
    color: "white",
    fontSize: 20,
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
  addbutton: {
    backgroundColor: COLORS.darkblue,
    borderRadius: 7,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    marginLeft: 110,
  },
  // radiocontainer: {
  //   flexDirection: "row",
  //   width: "80%",
  //   marginTop: 10,
  //   marginBottom: 20,
  // },
  // radioitem: {
  //   flex: 1,
  //   alignItems: "center",
  // },
  // radiolabel: {
  //   fontSize: 18,
  //   color: COLORS.turq,
  //   fontWeight: "700",
  // },
});
