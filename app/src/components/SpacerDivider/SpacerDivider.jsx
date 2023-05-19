import React from 'react';
import { Spacer } from 'components/Layout/Layout';
import { Divider } from 'react-native-paper';
import { View } from 'react-native';

export const SpacerDivider = () => {
  return (
    <View>
      <Spacer />
      <Divider />
      <Spacer />
    </View>
  );
};
