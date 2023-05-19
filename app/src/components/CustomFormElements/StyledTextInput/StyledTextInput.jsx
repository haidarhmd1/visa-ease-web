import React from 'react';
import { TextInput } from 'react-native-paper';

export const StyledTextInput = ({
  children,
  style,
  outlineColor,
  ...properties
}) => {
  return (
    <TextInput
      {...properties}
      mode="outlined"
      outlineColor={outlineColor}
      activeOutlineColor={outlineColor}
      style={style}
      outlineStyle={{ borderRadius: 14, borderWidth: 1 }}
    />
  );
};
