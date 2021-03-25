import { StyleSheet } from "react-native";
import { COLORS } from "../../globalStyles";

export const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  mainDetails: {
    textTransform: 'capitalize',
    fontSize: 18,
    color: COLORS.darkblue,
  },
  details: {
    color: 'rgba(0, 0, 0, 0.47)',
    fontSize: 12,
  },
  bar: {
    borderRadius: 15,
    borderColor: COLORS.turq,
    width: 282,
    height: 37,
  }
});