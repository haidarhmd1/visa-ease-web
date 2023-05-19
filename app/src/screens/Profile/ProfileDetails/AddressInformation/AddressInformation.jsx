import React, { useContext, useEffect, useState } from 'react';
import { PrimaryButton } from 'components/Buttons';
import { getCityofCountry, updateUser } from 'services/api';
import { Text } from 'react-native-paper';
import { Layout, Spacer, StyledScrollView } from 'components/Layout/Layout';
import {
  CustomSelectCountryDropdown,
  CustomTextInput,
} from 'components/CustomFormElements/CustomFormElements';
import { getCountryDropdown } from 'utils/countryList';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { ErrorCard } from 'components/ErrorCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from 'react-intl';
import { AppHeader } from 'components/AppHeader';
import { StyleSheet, View } from 'react-native';
import { NotificationToast } from 'components/NotificationToast';
import AuthContext from 'provider/AuthProvider';
import { useAddressInformation } from './AddressInformation.schema';

export const AddressInformation = ({ navigation }) => {
  const queryClient = useQueryClient();
  const intl = useIntl();
  const { userData } = useContext(AuthContext);
  const { schema } = useAddressInformation();
  const [showToast, setShowToast] = useState(false);

  const {
    mutate,
    isSuccess,
    isLoading: isUpdateUserLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: data => updateUser(data),
    onSuccess: () => {
      setShowToast(true);
      queryClient.invalidateQueries('getUser');
      setTimeout(() => {
        setShowToast(false);
        navigation.goBack();
      }, 800);
    },
    onError: regError => {
      console.log('error', regError);
    },
  });

  const defaultValues = {
    country: userData?.country,
    city: userData?.city,
    zipCode: userData?.zipCode,
    street: userData?.street,
  };

  const { control, handleSubmit, watch } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const watchCountry = watch('country') || '';

  const { isLoading, data: cityData } = useQuery(
    ['getCityByCountry', watchCountry?.label],
    () =>
      getCityofCountry(
        JSON.stringify({
          country: watchCountry?.label || userData?.country,
        })
      )
  );

  useEffect(() => {
    queryClient.invalidateQueries('getUser');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getZipLabel =
    watchCountry?.value === 'DE' || watchCountry?.value === 'US'
      ? `${intl.formatMessage({ id: 'register.form.zipCode' })}*`
      : intl.formatMessage({ id: 'register.form.zipCode' });

  const onSubmit = data => {
    const formData = {
      country: data.country.label,
      city: data.city.label,
      zipCode: data.zipCode,
      street: data.street,
      dob: userData?.dob,
    };
    mutate(formData);
  };

  return (
    <View
      style={{
        paddingBottom: 48,
      }}
    >
      <AppHeader
        goBack={() => navigation.goBack()}
        title={intl.formatMessage({
          id: 'register.title.addressInformation',
        })}
      />
      <StyledScrollView style={{ backgroundColor: 'white' }}>
        <Layout>
          <View>
            <View>
              <Text variant="labelLarge">
                {intl.formatMessage({
                  id: 'register.title.addressInformation',
                })}
              </Text>
              <Spacer />
              <View style={[style.inputWidth, style.marginBottom]}>
                <Text variant="labelMedium">{`${intl.formatMessage({
                  id: 'register.form.country',
                })}*`}</Text>
                <CustomSelectCountryDropdown
                  search={false}
                  name="country"
                  control={control}
                  selectPlaceholder={`${intl.formatMessage({
                    id: 'register.form.country',
                  })}*`}
                  data={getCountryDropdown}
                />
              </View>
              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomSelectCountryDropdown
                  // search={false}
                  rules={{ required: true }}
                  name="city"
                  control={control}
                  disabled={isLoading}
                  selectPlaceholder={
                    isLoading
                      ? 'Loading cities'
                      : `${intl.formatMessage({
                          id: 'register.form.city',
                        })}*`
                  }
                  data={
                    cityData?.data.data.map(list => {
                      return {
                        label: list,
                        value: list,
                      };
                    }) || []
                  }
                />
              </View>

              <View style={[style.inputWidth, style.marginBottom]}>
                <View style={{ flexDirection: 'row' }}>
                  <CustomTextInput
                    style={{ flex: 0.5, marginRight: 16 }}
                    control={control}
                    rules={{ required: true }}
                    name="zipCode"
                    placeholder={getZipLabel}
                  />

                  <CustomTextInput
                    style={{ flex: 1 }}
                    control={control}
                    rules={{ required: true }}
                    name="street"
                    placeholder={`${intl.formatMessage({
                      id: 'register.form.street',
                    })}*`}
                  />
                </View>
              </View>
            </View>
            <View>
              {isError && (
                <ErrorCard errMessage={error?.response.data.message} />
              )}
            </View>
            <View style={[style.inputWidth, style.marginBottom]}>
              <PrimaryButton
                isLoading={isUpdateUserLoading}
                onPress={handleSubmit(onSubmit)}
                style={{ marginBottom: 10 }}
              >
                {intl.formatMessage({
                  id: 'button.submit',
                })}
              </PrimaryButton>
            </View>
          </View>
        </Layout>
      </StyledScrollView>
      <NotificationToast
        type="Top"
        showToast={showToast}
        isLoading={isUpdateUserLoading}
        success={isSuccess}
        error={isError}
      />
    </View>
  );
};

const style = StyleSheet.create({
  inputWidth: {
    width: '100%',
  },
  center: {
    alignSelf: 'center',
  },
  inputMarginBottom: {
    marginBottom: 8,
  },
  marginBottom: {
    marginBottom: 16,
  },
});
