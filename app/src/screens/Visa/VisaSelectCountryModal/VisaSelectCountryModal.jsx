import React, { useState } from 'react';
import { styles } from 'screens/Visa/Visa.styled';
import { ModalSheet } from 'components/ModalSheet';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Spacer, StyledCard } from 'components/Layout/Layout';
import { Card, Text } from 'react-native-paper';
import { PrimaryButton } from 'components/Buttons';
import { SpacerDivider } from 'components/SpacerDivider';
import { ROUTES } from 'helpers/constants/routes';
import { useNavigation } from '@react-navigation/native';
import { StyledDropdown } from 'components/StyledDropdown';
import { useIntl } from 'react-intl';
import { useMutation, useQueryClient } from 'react-query';
import { startVisaProcess } from 'services/api';
import { ErrorCard } from 'components/ErrorCard';

const useVisaSelectDDL = () => {
  const { formatMessage } = useIntl();
  const visaCountries = [
    { value: 'uae', label: 'UAE', image: '' },
    { value: 'thailand', label: 'Thailand', image: '' },
    { value: 'cuba', label: 'Cuba', image: '' },
  ];

  const visaType = [
    {
      value: 'STANDARD',
      label: formatMessage({ id: 'screen.visa.bottomSheet.process.standard' }),
    },
    {
      value: 'EXPRESS',
      label: formatMessage({ id: 'screen.visa.bottomSheet.process.express' }),
    },
  ];

  return { visaCountries, visaType };
};

export const VisaSelectCountryModal = ({ visible, setVisible }) => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();
  const { visaCountries, visaType } = useVisaSelectDDL();
  const navigation = useNavigation();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: data => startVisaProcess(data),
    onSuccess: response => {
      setVisible(false);
      queryClient.invalidateQueries('getAllVisaApplications');
      setTimeout(() => {
        navigation.navigate(ROUTES.VISA_APP, {
          visaId: response.data.id,
        });
      }, 800);
    },
  });

  const [countryValue, setCountryValue] = useState(null);
  const [isCountryDDLFocus, setIsCountryDDLFocus] = useState(false);

  const [visaTypeValue, setVisaTypeValue] = useState(null);
  const [isVisaTypeDDLFocus, setIsVisaTypeDDLFocus] = useState(false);

  const onCountrySelectedHandler = () => {
    mutate({ country: countryValue, visaProcessingType: visaTypeValue });
  };

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
                {formatMessage({ id: 'general.attention' })}
              </Text>
              <Text style={style.marginTop}>
                {formatMessage({ id: 'general.attention.visaProcess' })}
              </Text>
            </Card.Content>
          </StyledCard>
          <SpacerDivider />
          <View>
            <Text variant="headlineSmall">
              {formatMessage({ id: 'screen.visa.bottomSheet.title' })}
            </Text>
            {isError && (
              <ErrorCard
                errMessage={formatMessage({ id: 'general.error.message' })}
              />
            )}
            <Spacer />
            <View style={styles.container}>
              <StyledDropdown
                selectPlaceholder={formatMessage({
                  id: 'visa.ddl.visaSelectCountry',
                })}
                isFocus={isCountryDDLFocus}
                setIsFocus={setIsCountryDDLFocus}
                value={countryValue}
                setValue={setCountryValue}
                data={visaCountries}
              />
              {countryValue !== null && (
                <StyledDropdown
                  selectPlaceholder={formatMessage({
                    id: 'visa.ddl.visaProcessingType',
                  })}
                  isFocus={isVisaTypeDDLFocus}
                  setIsFocus={setIsVisaTypeDDLFocus}
                  value={visaTypeValue}
                  setValue={setVisaTypeValue}
                  data={visaType}
                />
              )}
            </View>
            <Spacer />
            <Spacer />
            <PrimaryButton
              isLoading={isLoading}
              disabled={countryValue === null || visaTypeValue === null}
              onPress={onCountrySelectedHandler}
            >
              <Text style={style.colorWhite}>
                {formatMessage({ id: 'general.start' })}
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
