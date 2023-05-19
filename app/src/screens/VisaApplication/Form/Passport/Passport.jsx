import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DocumentCapture } from 'components/DocumentCapture';
import BottomSheet from '@gorhom/bottom-sheet';
import { PrimaryButton } from 'components/Buttons';
import { View, StyleSheet, Image, ScrollView } from 'react-native';

import { Layout, Spacer } from 'components/Layout/Layout';
import { Divider, Text } from 'react-native-paper';
import { PassportImage } from 'assets/illustrations';
import { NotificationToast } from 'components/NotificationToast';
import { useMutation, useQueryClient } from 'react-query';
import { uploadDocument } from 'services/api';
import { useNavigation } from '@react-navigation/native';
import { blurhash } from 'helpers/constants/global';
import { useIntl } from 'react-intl';

export const Passport = ({ route }) => {
  const { visaId, item } = route.params;
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = useState(false);
  const navigation = useNavigation();

  const [photo, setPhoto] = useState();
  const sheetReference = useRef(null);

  const { mutateAsync, isLoading, isError, isSuccess } = useMutation({
    mutationFn: data => {
      uploadDocument(visaId, data);
    },
    onSuccess: () => {
      setShowToast(true);
      setTimeout(() => {
        queryClient.invalidateQueries(['getSingleVisaApplication']);
        setShowToast(false);
        navigation.goBack();
      }, 1600);
    },
    onError: () => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1600);
    },
  });

  const snapPoints = useMemo(() => ['75%'], []);

  const handleClosePress = useCallback(() => {
    sheetReference.current?.close();
  }, []);

  const submitDocument = async () => {
    const formData = new FormData();
    formData.append('uploadFile', {
      name: `${new Date()}_passport.jpg`,
      uri: photo.uri,
      type: 'image/jpg',
    });
    formData.append('documentNameType', 'PASSPORT');
    formData.append('documentId', item[0]?.id);
    await mutateAsync(formData);
  };

  return (
    <>
      <DocumentCapture
        photo={photo}
        setPhoto={setPhoto}
        submitDocument={submitDocument}
        title="Passport Image"
      />
      <BottomSheet
        style={[style.shadow, style.sheetContainer]}
        ref={sheetReference}
        snapPoints={snapPoints}
        bottomInset={46}
        detached
      >
        <Layout style={style.container}>
          <View style={style.container}>
            <Text variant="headlineMedium" style={style.centerText}>
              {formatMessage({
                id: 'screen.documents.passport.title',
              })}
            </Text>
            <Spacer />
            <Divider />
            <Spacer />
            <ScrollView>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={PassportImage}
                  style={style.image}
                  placeholder={blurhash}
                  contentFit="contain"
                  transition={1000}
                />
              </View>
              <Spacer />
              <Text variant="bodyMedium">
                {formatMessage({
                  id: 'screen.documents.passport.description',
                })}
              </Text>
              <Spacer />
            </ScrollView>
          </View>
          <View>
            <PrimaryButton onPress={handleClosePress}>
              {formatMessage({
                id: 'general.button.gotIt',
              })}
            </PrimaryButton>
          </View>
        </Layout>
      </BottomSheet>
      <NotificationToast
        type="Top"
        error={isError}
        isLoading={isLoading}
        success={isSuccess}
        showToast={showToast}
      />
    </>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  sheetContainer: {
    marginHorizontal: 24,
  },
  container: {
    flex: 1,
  },
  centerText: {
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    backgroundColor: '#fff',
  },
});
