import { styles } from 'screens/Visa/Visa.styled';
import { Dropdown } from 'react-native-element-dropdown';
import React from 'react';
import { MyTheme } from 'styles/theme/theme.extended';

export const StyledDropdown = ({
  selectPlaceholder,
  data,
  isFocus,
  setIsFocus,
  value,
  setValue,
}) => {
  return (
    <Dropdown
      style={[
        styles.dropdown,
        isFocus && { borderColor: MyTheme.colors.primaryBrand },
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      search
      placeholder={!isFocus ? selectPlaceholder : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
};
