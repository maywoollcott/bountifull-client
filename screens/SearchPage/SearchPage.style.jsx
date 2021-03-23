import { StyleSheet } from 'react-native';
import {COLORS} from '../../globalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    color: COLORS.darkblue,
    fontWeight: '700',
    fontSize: 30,
    paddingBottom: 30
  },

  formcontainer: {
    paddingBottom: 20
  },

  input: {
    height: 40,
    width: 270,
    margin: 5,
    fontSize: 18,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: COLORS.turq
  },
  submitbutton: {
    marginTop: 30,
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
  radiocontainer: {
    flexDirection: 'row',
    justifyContent: 'center'

  },
  radioitem: {
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  },
  radiolabel: {
    fontSize: 18,
    color: COLORS.darkblue,
    fontWeight: '600'
  },
  radiolabeldescrip: {
    marginTop: 2,
    fontSize: 14,
    color: 'gray',
    fontWeight: '600'
  },
})