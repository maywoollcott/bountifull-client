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
    backgroundColor: COLORS.palegreen,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    elevation: 1,
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
      width: 1,
      height: 1,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    elevation: 1,
  },

  factText: {
    color: COLORS.darkblue,
    fontSize: 20,
    textAlign: 'center',
  },

  buttontext: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  goalBubble: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.sage,
    justifyContent: 'center',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    elevation: 1,
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
    paddingHorizontal: 15,
    color: COLORS.darkblue,
  },
})