import React, { useEffect } from 'react';
import { ModalSheet } from 'components/ModalSheet';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Spacer, StyledCard } from 'components/Layout/Layout';
import { Card, Text } from 'react-native-paper';
import { PrimaryButton } from 'components/Buttons';
import { SpacerDivider } from 'components/SpacerDivider';
import { useIntl } from 'react-intl';
import { useMutation, useQueryClient } from 'react-query';
import { setAgreement } from 'services/api';
import { useForm } from 'react-hook-form';
import {
  CustomCheckbox,
  CustomTextInput,
} from 'components/CustomFormElements/CustomFormElements';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAgreeTermsSchema } from './AgreeTerms.schema';

const defaultValues = {
  place: '',
  date: moment().format('YYYY-MM-DD'),
  acceptTerms: false,
};

export const AgreeTermsModal = ({
  navigation,
  visible,
  setVisible,
  visaId,
}) => {
  const { formatMessage } = useIntl();
  const { schema } = useAgreeTermsSchema();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: data => setAgreement(visaId, data),
    onSuccess: () => {
      setTimeout(() => {
        setVisible(false);
        queryClient.invalidateQueries('getSingleVisaApplication');
        queryClient.invalidateQueries('getAllVisaApplications');
        navigation.goBack();
      }, 800);
    },
  });

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const watchCheck = watch('acceptTerms');

  const onSubmit = values => {
    mutate(values);
  };

  if (isError) {
    Alert.alert('Error');
  }

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalSheet
      visible={visible}
      setVisible={setVisible}
      detached={false}
      loadFullHeight
    >
      <ScrollView>
        <Layout>
          <StyledCard mode="elevated">
            <Card.Content>
              <Text variant="labelLarge" style={style.fontBold}>
                {formatMessage({
                  id: 'screen.visaApplication.agreement.info.title',
                })}
              </Text>
              <Text style={style.marginTop}>
                {formatMessage({
                  id: 'screen.visaApplication.agreement.info.description',
                })}
              </Text>
            </Card.Content>
          </StyledCard>
          <SpacerDivider />
          <View>
            <Text variant="headlineSmall">
              {formatMessage({
                id: 'screen.visaApplication.agreement.info.title',
              })}
            </Text>
            <CustomTextInput
              disabled
              control={control}
              name="date"
              placeholder={formatMessage({ id: 'general.date' })}
              label={formatMessage({ id: 'general.date' })}
            />
            <CustomTextInput
              control={control}
              name="place"
              placeholder={formatMessage({ id: 'general.place' })}
              label={formatMessage({ id: 'general.place' })}
            />
            <Spacer />
            <CustomCheckbox
              name="acceptTerms"
              control={control}
              title={formatMessage({
                id: 'register.form.acceptTermsAndConditions.title',
              })}
            />
            <Spacer />
            <PrimaryButton
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
              disabled={!watchCheck}
            >
              <Text style={[style.colorWhite, style.fontBold]}>
                {formatMessage({ id: 'general.submit.visa' })}
              </Text>
            </PrimaryButton>
          </View>
        </Layout>
      </ScrollView>
    </ModalSheet>
  );
};

const style = StyleSheet.create({
  colorWhite: { color: 'white' },
  fontBold: {
    fontWeight: 'bold',
  },
  marginTop: { marginTop: 8 },
});
