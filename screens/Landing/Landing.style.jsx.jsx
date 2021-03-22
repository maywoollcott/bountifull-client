import { StyleSheet } from 'react-native';
import {COLORS} from '../../globalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 200,
    height: 150
  },

  namelogocontainer: {
    width: 180,
    height: 55,
    justifyContent: 'center',
  },

  namelogo: {
    width: null,
    resizeMode: 'contain'
  },

  formcontainer: {
    marginTop: 10,
    alignItems:'center'
  },

  input: {
    height: 40,
    width: 270,
    margin: 5,
    fontSize: 18,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: COLORS.darkblue
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
  }
})