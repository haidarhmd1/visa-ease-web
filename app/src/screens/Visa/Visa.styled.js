import { StyleSheet } from 'react-native';
import { MyTheme } from 'styles/theme/theme.extended';

export const styles = StyleSheet.create({
  informationCardWarning: {
    width: '100%',
    height: 'auto',
    borderRadius: MyTheme.borderRadius,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: MyTheme.colors.warningBorder,
    borderStyle: 'solid',
  },
  dropdown: {
    borderStyle: 'solid',
    borderColor: MyTheme.colors.primaryBrand,
    borderWidth: 1,
    marginTop: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
