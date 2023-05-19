import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

export const VisaApplyButton = ({
  setVisible,
  imageSrc,
  height = 150,
  title,
  description,
}) => {
  return (
    <TouchableOpacity onPress={() => setVisible(true)}>
      <View style={styles.wrapper(height)}>
        <ImageBackground source={imageSrc} style={styles.image(height)} />
        <View style={styles.textWrapper}>
          <Text variant="headlineSmall" style={styles.headline}>
            {title}
          </Text>
          <Text variant="bodyMedium" style={styles.colorBlack}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: height => ({
    height,
    marginBottom: 24,
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'lightgrey',
    borderWidth: 2,
  }),
  image: height => ({
    height,
    width: 150,
    position: 'absolute',
    right: 0,
  }),
  textWrapper: {
    paddingTop: 24,
    width: 175,
    marginLeft: 14,
    marginBottom: 4,
    justifyContent: 'flex-end',
  },
  headline: { color: 'black', fontWeight: 'bold' },
  colorBlack: { color: 'black' },
});
