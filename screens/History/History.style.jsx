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
    // alignItems: 'center',
    justifyContent: 'center'
  },

  calendar: {
    borderWidth: 1,
    borderColor: COLORS.darkblue,
    height: 300,
    // marginTop:20,
  },
  header: {
    fontSize: 15,
    color: COLORS.darkblue,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 10
  },

  memberSince: {
    color: 'gray',
    fontSize: 15,
    marginBottom: 10,
  },

  secondaryText: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.darkblue
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },

  formcontainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 90,
    // paddingVertical: 20,
    paddingHorizontal: 10,
    // marginBottom: 0
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
    fontSize: 20,
  }
})