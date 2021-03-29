import { StyleSheet } from "react-native";
import { COLORS } from "../../globalStyles";

export const style = StyleSheet.create({
  headerContainer: {
    marginVertical: 20,
    width: '70%',
  },

  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    color: COLORS.darkblue,
  },

  name: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: COLORS.turq,
  },

  nutrient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  label: {
    textTransform: 'capitalize',
    color: 'white',
    fontSize: 15,
  },

  amount: {
    color: 'white',
    fontSize: 15,
  },

  container: {
    alignItems: 'center',
  },

  infoContainer: {
    backgroundColor: COLORS.darkblue,
    width: '70%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    color: 'white',
  }
})
