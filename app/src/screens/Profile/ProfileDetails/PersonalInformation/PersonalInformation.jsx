import React, { useContext, useEffect, useState } from 'react';
import { PrimaryButton } from 'components/Buttons';
import { updateUser } from 'services/api';
import { Text } from 'react-native-paper';
import { Layout, Spacer, StyledScrollView } from 'components/Layout/Layout';
import {
  CustomDatePicker,
  CustomDropdown,
  CustomTextInput,
} from 'components/CustomFormElements/CustomFormElements';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { ErrorCard } from 'components/ErrorCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { AppHeader } from 'components/AppHeader';
import { StyleSheet, View } from 'react-native';
import { NotificationToast } from 'components/NotificationToast';
import AuthContext from 'provider/AuthProvider';
import { usePersonalInformation } from './PersonalInformation.schema';

export const PersonalInformation = ({ navigation }) => {
  const queryClient = useQueryClient();
  const intl = useIntl();
  const { userData } = useContext(AuthContext);
  const { schema } = usePersonalInformation();

  const [showToast, setShowToast] = useState(false);

  const { mutate, isSuccess, isLoading, isError, error } = useMutation({
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
    fullname: userData?.fullname,
    dob: moment(userData?.dob).toDate(),
    gender: userData?.gender,
    nationality: userData?.nationality,
    maritalStatus: userData?.maritalStatus,
    phone: userData?.phone,
    profession: userData?.profession,
  };

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    queryClient.invalidateQueries('getUser');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = data => {
    const formData = {
      dob: data.dob,
      gender: data.gender.value,
      maritalStatus: data.maritalStatus.value,
      phone: data.phone,
      profession: data.profession,
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
          id: 'register.title.personalInformation',
        })}
      />
      <StyledScrollView style={{ backgroundColor: 'white' }}>
        <Layout>
          <View>
            <Text variant="labelLarge">
              {intl.formatMessage({
                id: 'register.title.personalInformation',
              })}
            </Text>
            <Spacer />
            <View style={[style.inputWidth, style.marginBottom]}>
              <CustomTextInput
                disabled
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
              <CustomTextInput
                control={control}
                name="nationality"
                placeholder={userData?.nationality}
                disabled
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
          <View>
            {isError && <ErrorCard errMessage={error?.response.data.message} />}
          </View>
          <View style={[style.inputWidth, style.marginBottom]}>
            <PrimaryButton
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
              style={{ marginBottom: 10 }}
            >
              {intl.formatMessage({
                id: 'button.submit',
              })}
            </PrimaryButton>
          </View>
        </Layout>
      </StyledScrollView>
      <NotificationToast
        type="Top"
        showToast={showToast}
        isLoading={isLoading}
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
