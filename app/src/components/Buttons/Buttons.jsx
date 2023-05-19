import React from 'react';
import { Button } from 'react-native-paper';
import { MyTheme } from 'styles/theme/theme.extended';

export const PrimaryButton = ({ children, style, ...properties }) => {
  return (
    <Button
      mode="contained"
      buttonColor="#00bf80"
      {...properties}
      style={[style, { borderRadius: 14 }]}
    >
      {children}
    </Button>
  );
};

export const SecondaryButton = ({ children, style, ...properties }) => {
  return (
    <Button
      mode="contained"
      buttonColor="white"
      textColor={MyTheme.colors.brandFont}
      {...properties}
      style={[
        style,
        {
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: '#00bf80',
          borderRadius: 14,
        },
      ]}
    >
      {children}
    </Button>
  );
};

export const DangerButton = ({ children, style, ...properties }) => {
  return (
    <Button
      mode="contained"
      buttonColor="#ff0000"
      textColor="white"
      {...properties}
      style={[style, { borderRadius: 14 }]}
    >
      {children}
    </Button>
  );
};
