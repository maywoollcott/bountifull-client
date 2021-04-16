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
    justifyContent: 'center'
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  header: {
    fontSize: 40,
    color: COLORS.darkblue,
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 5
  },

  memberSince: {
    color: 'gray',
    fontSize: 15,
    marginBottom: 20,
  },

  secondaryText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.darkblue
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },

  formcontainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    // paddingVertical: 20,
    paddingHorizontal: 10,
    // marginBottom: 0
  },

  submitbutton: {
    margin: 7,
    backgroundColor: COLORS.turq,
    borderRadius: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 4,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    elevation: 1,
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
  }
})