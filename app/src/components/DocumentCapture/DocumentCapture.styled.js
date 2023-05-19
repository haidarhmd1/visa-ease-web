import { StyleSheet } from 'react-native';
import { MyTheme } from 'styles/theme/theme.extended';

export const styles = StyleSheet.create({
  camera: {
    position: 'relative',
    width: 320,
    height: 440,
    borderRadius: 18,
    alignSelf: 'center',
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    margin: 'auto',
  },
  informationCard: {
    backgroundColor: MyTheme.colors.primaryBackground,
    width: '100%',
    minHeight: 100,
    height: 'auto',
    marginTop: MyTheme.marginTop,
    padding: 16,
    borderRadius: MyTheme.borderRadius,
  },
  informationCardWarning: {
    width: '100%',
    minHeight: 100,
    height: 'auto',
    marginTop: MyTheme.marginTop,
    padding: 16,
    borderRadius: MyTheme.borderRadius,
    backgroundColor: MyTheme.colors.warningBackground,
    borderWidth: 2,
    borderColor: MyTheme.colors.warningBorder,
    borderStyle: 'solid',
  },
  touchableOpacity: {
    width: 75,
    borderColor: MyTheme.colors.primaryBrand,
    borderWidth: 2,
    borderRadius: MyTheme.circleRadius,
    backgroundColor: MyTheme.colors.primaryBrand,
    padding: 12,
    alignItems: 'center',
  },
  cameraWrapper: {
    width: '100%',
  },
});
