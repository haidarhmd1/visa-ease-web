import React, { useState } from 'react';
import { PrimaryButton } from 'components/Buttons';
import { getCityofCountry, registerUserProfile } from 'services/api';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Text, TextInput } from 'react-native-paper';
import { BackButton } from 'components/Login';
import { Layout, Spacer } from 'components/Layout/Layout';
import { SpacerDivider } from 'components/SpacerDivider';
import { RegisterHeader } from 'screens/Auth/Registration/RegisterHeader';
import {
  CustomCheckbox,
  CustomDatePicker,
  CustomDropdown,
  CustomTextInput,
} from 'components/CustomFormElements/CustomFormElements';
import { getCountryDropdown } from 'utils/countryList';
import { useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { RESPONSE } from 'helpers/constants/global';
import { ROUTES } from 'helpers/constants/routes';
import { ErrorCard } from 'components/ErrorCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { useRegistrationValidationSchema } from './Registration.schema';

const defaultValues = {
  fullname: '',
  gender: null,
  maritalStatus: null,
  password: '',
  passwordConfirmation: '',
  dob: moment().toDate(),
  nationality: null,
  country: null,
  email: '',
  phone: '',
  acceptTermsAndConditions: false,
};
export const Registration = ({ navigation }) => {
  const intl = useIntl();
  const { registrationValidationSchema } = useRegistrationValidationSchema();
  const { mutate, isLoading: isRegisterLoading, isError, error } = useMutation(
    registerUserProfile,
    {
      onSuccess: data => {
        if (data.status !== RESPONSE.OK) return;
        navigation.navigate(ROUTES.ENTER_OTP, {
          userId: data.data.id,
        });
      },
      onError: regError => {
        console.log('error', regError);
      },
    }
  );
  const { control, handleSubmit, watch } = useForm({
    defaultValues,
    enableReinitialize: true,
    resolver: yupResolver(registrationValidationSchema),
  });

  const watchCountry = watch('country') || '';
  const watchCheck = watch('acceptTermsAndConditions');

  const { isLoading, data: cityData } = useQuery(
    ['getCityByCountry', watchCountry?.label],
    () => getCityofCountry(JSON.stringify({ country: watchCountry?.label }))
  );

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [
    isPasswordConfirmationSecure,
    setIsPasswordConfirmationSecure,
  ] = useState(true);

  const getZipLabel =
    watchCountry?.value === 'DE' || watchCountry?.value === 'US'
      ? `${intl.formatMessage({ id: 'register.form.zipCode' })}*`
      : intl.formatMessage({ id: 'register.form.zipCode' });

  const onSubmit = data => {
    const formData = {
      email: data.email,
      password: data.password,
      fullname: data.fullname,
      dob: data.dob,
      gender: data.gender.value,
      nationality: data.nationality.label,
      maritalStatus: data.maritalStatus.value,
      phone: data.phone,
      profession: data.profession,
      country: data.country.label,
      city: data.city.label,
      zipCode: data.zipCode,
      street: data.street,
      acceptTermsAndConditions: data.acceptTermsAndConditions,
    };
    mutate(formData);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <BackButton goBack={() => navigation.goBack()} />
      <ScrollView>
        <Layout>
          <RegisterHeader />
          <View>
            <Spacer />
            <View>
              <Text variant="labelLarge">
                {intl.formatMessage({
                  id: 'register.title.loginInformation',
                })}
              </Text>
              <Spacer />
              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomTextInput
                  control={control}
                  name="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoCompleteType="email"
                  rules={{ required: true }}
                  placeholder={`${intl.formatMessage({
                    id: 'register.form.email',
                  })}*`}
                />
              </View>

              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomTextInput
                  control={control}
                  rules={{ required: true }}
                  name="password"
                  placeholder={`${intl.formatMessage({
                    id: 'register.form.password',
                  })}*`}
                  autoCorrect={false}
                  secureTextEntry={isPasswordSecure}
                  right={
                    <TextInput.Icon
                      onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                      icon="eye"
                    />
                  }
                />
              </View>

              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomTextInput
                  control={control}
                  rules={{ required: true }}
                  name="passwordConfirmation"
                  placeholder={`${intl.formatMessage({
                    id: 'register.form.passwordConfirmation',
                  })}*`}
                  secureTextEntry={isPasswordConfirmationSecure}
                  right={
                    <TextInput.Icon
                      onPress={() =>
                        setIsPasswordConfirmationSecure(
                          !isPasswordConfirmationSecure
                        )
                      }
                      icon="eye"
                    />
                  }
                />
              </View>
            </View>
            <SpacerDivider />
            <View>
              <Text variant="labelLarge">
                {intl.formatMessage({
                  id: 'register.title.personalInformation',
                })}
              </Text>
              <Spacer />
              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomTextInput
                  control={control}
                  rules={{ required: true }}
                  name="fullname"
                  autoCorrect={false}
                  placeholder={`${intl.formatMessage({
                    id: 'register.form.fullname',
                  })}*`}
                />
              </View>

              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomDatePicker
                  control={control}
                  name="dob"
                  placeholder={`${intl.formatMessage({
                    id: 'register.form.dob',
                  })}*`}
                />
              </View>

              <View style={[style.inputWidth, style.marginBottom]}>
                <Text variant="labelMedium">{`${intl.formatMessage({
                  id: 'register.form.gender',
                })}*`}</Text>
                <CustomDropdown
                  name="gender"
                  rules={{ required: true }}
                  control={control}
                  selectPlaceholder={`${intl.formatMessage({
                    id: 'register.form.gender',
                  })}*`}
                  data={[
                    {
                      label: intl.formatMessage({
                        id: 'registration.form.gender.male',
                      }),
                      value: 'MALE',
                    },
                    {
                      label: intl.formatMessage({
                        id: 'registration.form.gender.female',
                      }),
                      value: 'FEMALE',
                    },
                  ]}
                />
              </View>

              <View style={[style.inputWidth, style.marginBottom]}>
                <Text variant="labelMedium">{`${intl.formatMessage({
                  id: 'register.form.nationality',
                })}*`}</Text>
                <CustomDropdown
                  name="nationality"
                  control={control}
                  selectPlaceholder={`${intl.formatMessage({
                    id: 'register.form.nationality',
                  })}*`}
                  data={getCountryDropdown}
                />
              </View>

              <View style={[style.inputWidth, style.marginBottom]}>
                <Text variant="labelMedium">{`${intl.formatMessage({
                  id: 'register.form.maritalStatus',
                })}*`}</Text>

                <CustomDropdown
                  name="maritalStatus"
                  rules={{ required: true }}
                  control={control}
                  selectPlaceholder={`${intl.formatMessage({
                    id: 'register.form.maritalStatus',
                  })}*`}
                  data={[
                    {
                      label: intl.formatMessage({
                        id: 'registration.form.maritalStatus.single',
                      }),
                      value: 'SINGLE',
                    },
                    {
                      label: intl.formatMessage({
                        id: 'registration.form.maritalStatus.married',
                      }),
                      value: 'MARRIED',
                    },
                    {
                      label: intl.formatMessage({
                        id: 'registration.form.maritalStatus.widowed',
                      }),
                      value: 'WIDOWED',
                    },
                    {
                      label: intl.formatMessage({
                        id: 'registration.form.maritalStatus.divorced',
                      }),
                      value: 'DIVORCED',
                    },
                  ]}
                />
              </View>

              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomTextInput
                  control={control}
                  rules={{ required: true }}
                  name="phone"
                  placeholder={`${intl.formatMessage({
                    id: 'register.form.phoneNumber',
                  })}*`}
                />
              </View>

              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomTextInput
                  control={control}
                  rules={{ required: true }}
                  name="profession"
                  placeholder={`${intl.formatMessage({
                    id: 'register.form.profession',
                  })}*`}
                />
              </View>
            </View>
            <Spacer />
            <Divider />
            <Spacer />
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
                <CustomDropdown
                  name="country"
                  control={control}
                  selectPlaceholder={`${intl.formatMessage({
                    id: 'register.form.country',
                  })}*`}
                  data={getCountryDropdown}
                />
              </View>
              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomDropdown
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
            <Spacer />
            <Divider />
            <Spacer />
            <View style={[style.inputWidth, style.marginBottom]}>
              <Spacer />
              <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
                {intl.formatMessage({
                  id: 'register.form.title.privacy',
                })}
              </Text>
              <Spacer />
              <Text variant="bodyMedium">
                {intl.formatMessage({
                  id: 'register.form.description.privacy',
                })}
              </Text>
              <Spacer />
              <CustomCheckbox
                name="acceptTermsAndConditions"
                control={control}
                title={intl.formatMessage({
                  id: 'register.form.acceptTermsAndConditions.title',
                })}
              />
              <Spacer />
            </View>
            <View>
              {isError && (
                <ErrorCard errMessage={error?.response.data.message} />
              )}
            </View>
            <View style={[style.inputWidth, style.marginBottom]}>
              <PrimaryButton
                isLoading={isRegisterLoading}
                disabled={!watchCheck}
                onPress={handleSubmit(onSubmit)}
                style={{ marginBottom: 10 }}
              >
                {intl.formatMessage({
                  id: 'register.button',
                })}
              </PrimaryButton>
            </View>
          </View>
        </Layout>
      </ScrollView>
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
