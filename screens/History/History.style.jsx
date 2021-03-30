import { StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';

export default StyleSheet.create({

  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center'
  },

  guide: {
    marginHorizontal: 50,
    // marginTop: 0,
    marginVertical: 40,
    backgroundColor: COLORS.palegreen,
    justifyContent: 'center',
    marginHorizontal:30,
    alignItems: 'center',
    width: '80%',
    height: 120,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    // shadowOpacity: 4,
    // shadowColor: 'rgba(0, 0, 0, 0.25)'
  },

  calendar: {
    marginTop: 30, 
    height: 300,
  },

  header: {
    fontSize: 15,
    color: COLORS.darkblue,
    justifyContent: 'center',
    fontWeight: '500',
    width: '100%',
    marginHorizontal: 80,
    marginTop: 80,
    marginBottom:0
  },

  h1: {
    fontSize: 30,
    color: COLORS.darkblue,
    fontWeight: '500',
    justifyContent: 'center',
  },

  grayText: {
    color: 'gray',
    fontSize: 10,
    marginHorizontal: 15,
    marginVertical: 20,
  },

  secondaryText: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.darkblue
  },

  buttonContainer: {
    marginTop: 90,
    paddingHorizontal: 10,
  },

  submitbutton: {
    margin: 7,
    backgroundColor: COLORS.turq,
    borderRadius: 15,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)'
  },

  buttontext: {
    color: 'white',
    fontSize: 15,
  },
})
