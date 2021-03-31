import { StyleSheet } from "react-native";
import { COLORS } from "../../globalStyles";

export const style = StyleSheet.create({
  headerContainer: {
    marginVertical: 15,
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
    color: COLORS.gray,
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
    paddingBottom: 20
  },

  infoContainer: {
    backgroundColor: COLORS.darkblue,
    width: '70%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    color: 'white',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    elevation: 1,
  },

   deleteButton: {
    marginTop:15,
    backgroundColor: COLORS.turq,
    borderRadius: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    elevation: 1,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
})
