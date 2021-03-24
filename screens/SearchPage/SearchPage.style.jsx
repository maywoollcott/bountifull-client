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
  tryagainbutton: {
    marginTop: 30,
    backgroundColor: COLORS.darkblue,
    borderRadius: 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150
  },
  itembutton: {
    marginTop: 10,
    backgroundColor: COLORS.turq,
    borderRadius: 7,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    display: 'flex'
  },

  buttontext: {
    color: 'white',
    fontSize: 20,
  },
  itembuttontext: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
  radiocontainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'

  },
  radioitem: {
    alignItems: 'center',
    marginRight: 13,
    marginLeft: 13,
    flex:1
  },
  radiolabel: {
    fontSize: 16,
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