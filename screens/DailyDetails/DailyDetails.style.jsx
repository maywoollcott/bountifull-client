import { StyleSheet } from "react-native";
import { COLORS } from "../../globalStyles";

export const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  headerContainer: {
    marginVertical: 35,
  },

  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    color: COLORS.darkblue,
  },

  date: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: COLORS.turq,
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
    marginBottom: 20,
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

  infoContainer: {
    marginBottom: 30,
  }
})