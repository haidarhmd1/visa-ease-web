import React, { useEffect, useRef, useState } from 'react';

import { Camera } from 'expo-camera';
import { Text } from 'react-native-paper';
import { AppHeader } from 'components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { useIntl } from 'react-intl';
import { SaveDocument } from './SaveDocument';
import { CaptureDocument } from './CaptureDocument';

export const DocumentCaptureRaw = ({
  title,
  submitDocument,
  photo,
  setPhoto,
  fieldValue,
}) => {
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const cameraReference = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return (
      <Text variant="labelLarge">
        {formatMessage({ id: 'request.cameraPermission.status.loading' })}
      </Text>
    );
  }
  if (!hasCameraPermission) {
    return (
      <Text variant="labelLarge">
        {formatMessage({ id: 'request.cameraPermission.status.notGranted' })}
      </Text>
    );
  }

  const takePic = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraReference.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    return (
      <>
        <AppHeader
          goBack={() => navigation.goBack()}
          title={formatMessage({ id: 'documentCapture.saveDocument.title' })}
        />
        <SaveDocument
          photo={photo}
          setPhoto={setPhoto}
          submitDocument={submitDocument}
          fieldValue={fieldValue}
        />
      </>
    );
  }

  return (
    <>
      <AppHeader
        navigation={navigation}
        goBack={() => navigation.goBack()}
        title={title}
      />
      <CaptureDocument cameraReference={cameraReference} takePic={takePic} />
    </>
  );
};

export const DocumentCapture = React.memo(DocumentCaptureRaw);
