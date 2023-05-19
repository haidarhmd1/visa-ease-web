import React from 'react';
import { Layout } from 'components/Layout/Layout';
import { View, StyleSheet, Image } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useIntl } from 'react-intl';
import { styles } from '../DocumentCapture.styled';

export const SaveDocument = ({ photo, setPhoto, submitDocument }) => {
  const { formatMessage } = useIntl();
  return (
    <Layout style={style.container}>
      <Image style={styles.image} source={photo} />

      <View style={style.content}>
        <View style={[style.buttonWrapper, styles.cameraWrapper]}>
          <View>
            <IconButton
              icon="restore"
              containerColor="white"
              iconColor="black"
              size={24}
              onPress={() => setPhoto()}
            />
            <Text variant="labelSmall" style={style.textCenter}>
              {formatMessage({ id: 'documentCapture.retake' })}
            </Text>
          </View>
          <View>
            <IconButton
              icon="arrow-right-thin"
              containerColor="white"
              iconColor="black"
              size={24}
              onPress={() => submitDocument()}
            />
            <Text variant="labelSmall">
              {formatMessage({ id: 'documentCapture.continue' })}
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    position: 'absolute',
    bottom: 24,
    width: 320,
    alignSelf: 'center',
  },
  buttonWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textCenter: {
    textAlign: 'center',
  },
});
