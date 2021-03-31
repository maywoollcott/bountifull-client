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
    justifyContent: 'center'
  },

  guide: {
    marginHorizontal: 50,
    marginVertical: 20,
    backgroundColor: COLORS.palegreen,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 100,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)'
  },

  calendar: {
    height: 300,
  },

  header: {
    fontSize: 15,
    color: COLORS.darkblue,
    // justifyContent: 'center',
    fontWeight: '500',
    width: '100%',
    marginHorizontal: 140,
    marginVertical: 10
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
