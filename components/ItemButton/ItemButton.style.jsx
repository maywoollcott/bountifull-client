import { StyleSheet } from 'react-native';
import { COLORS } from '../../globalStyles';

export const style = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#E1EFDA',
    borderColor: COLORS.darkblue,
    width: 282,
    height: 59,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    elevation: 1,
    paddingHorizontal: 20,
    fontSize: 20,
    color: COLORS.darkblue,
  },

});