import { StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontFamily: 'Roboto'
  },

  factContainer: {
    margin: 5,
    backgroundColor: COLORS.turq,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
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

  submitbutton: {
    margin: 5,
    backgroundColor: COLORS.turq,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
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
    textAlign: 'center',
  },

  goalBubble: {
    width: 154,
    height: 154,
    borderRadius: 72,
    backgroundColor: COLORS.sage,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },

  percentage: {
    fontWeight: '400',
    fontSize: 48,
    color: '#fff',
    textAlign: 'center',
  },

  bubbleText: {
    textAlign: 'center',
    fontSize: 13,
    paddingHorizontal: 5,
    color: COLORS.darkblue,
  },
})