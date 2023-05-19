import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  commonToastStyle: {
    borderRadius: 8,
    margin: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 100,
  },
  topToastStyle: {
    backgroundColor: '#FCFCFC',
    top: 0,
  },
  bottomToastStyle: {
    backgroundColor: '#FCFCFC',
    bottom: 0,
  },
  successStyle: {
    // borderColor: 'green',
    // borderWidth: 2,
    // borderStyle: 'solid',
  },
  errorStyle: {
    // borderColor: 'red',
    // borderWidth: 2,
    // borderStyle: 'solid',
  },
});
