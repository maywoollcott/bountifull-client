import { StyleSheet } from 'react-native';
import {COLORS} from '../../globalStyles';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  headerTextContainer: {
    width: 200,
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    fontSize: 30,
    color: COLORS.darkblue,
    fontWeight: '700'
  },
  h2: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.darkblue
  },
  h3: {
    marginTop: 5,
    fontSize: 16,
    lineHeight: 17,
    textAlign: 'center',
    color: COLORS.gray,
    width: 150
  },
  trophyRow: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  singleTrophyItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  currentStreakContainer: {
    backgroundColor: COLORS.sage,
    paddingLeft: 10,
    borderRadius: 10,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20
  },
  streakTextContainer: {
    width: 100,
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },

})