import { StyleSheet } from "react-native";
import { COLORS } from "../../globalStyles";

export const style = StyleSheet.create({
  headerContainer: {
<<<<<<< HEAD
    marginVertical: 15,
=======
    marginVertical: 20,
>>>>>>> b9e2868ae0c8d348284f37913e63186861e4307a
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
  },

   deleteButton: {
    marginTop:15,
    backgroundColor: 'red',
    borderRadius: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)'
  },
  
  buttonText: {
    color: 'white',
    fontSize: 15,
  }
})
