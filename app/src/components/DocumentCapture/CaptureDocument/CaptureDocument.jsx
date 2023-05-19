import React from 'react';
import { Layout } from 'components/Layout/Layout';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { styles } from '../DocumentCapture.styled';

export const CaptureDocument = ({ cameraReference, takePic }) => {
  return (
    <Layout style={style.container}>
      <Camera style={styles.camera} ref={cameraReference} flashMode="on" />
      <View style={style.buttonContainer}>
        <View style={[style.cameraButtonWrapper, styles.cameraWrapper]}>
          <IconButton
            mode="contained"
            icon="plus"
            containerColor="#00bf80"
            iconColor="white"
            size={48}
            onPress={takePic}
          />
        </View>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 8,
    width: 320,
    alignSelf: 'center',
  },
  cameraButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
