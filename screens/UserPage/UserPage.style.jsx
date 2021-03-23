import { StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';

export default StyleSheet.create({
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white"

  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 40,
    color: COLORS.sage,
    fontWeight: '700',
    marginBottom: 50
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150/2
  },

  formcontainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  submitbutton: {
    margin: 5,
    backgroundColor: COLORS.turq,
    borderRadius: 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150
  },

  buttontext: {
    color: 'white',
    fontSize: 20,
  },

  sextext: {
    marginTop: 20,
    color: 'gray'
  }
})