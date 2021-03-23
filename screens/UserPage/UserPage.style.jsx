import { StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';

export default StyleSheet.create({
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
    width: 200,
    height: 200,
    borderRadius: 200/2
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