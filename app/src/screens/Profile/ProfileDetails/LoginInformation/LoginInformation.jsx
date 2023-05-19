import React, { useContext, useEffect, useState } from 'react';
import { PrimaryButton } from 'components/Buttons';
import { changePassword } from 'services/api';
import { Card, Text, TextInput } from 'react-native-paper';
import {
  Layout,
  Spacer,
  StyledCard,
  StyledScrollView,
} from 'components/Layout/Layout';
import { CustomTextInput } from 'components/CustomFormElements/CustomFormElements';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { ErrorCard } from 'components/ErrorCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from 'react-intl';
import { AppHeader } from 'components/AppHeader';
import { StyleSheet, View } from 'react-native';
import { NotificationToast } from 'components/NotificationToast';
import AuthContext from 'provider/AuthProvider';
import { useLoginInformation } from './LoginPersonalInformation.schema';

const usePassErrorResponseMessage = () => {
  const { formatMessage } = useIntl();
  const passErrorResponseMessage = statusCode => {
    switch (statusCode) {
      case 405:
        return formatMessage({ id: 'screen.loginEdit.passwordError.405' });
      case 401:
        return formatMessage({ id: 'screen.loginEdit.passwordError.401' });
      default:
        return formatMessage({ id: 'screen.loginEdit.passwordError.default' });
    }
  };

  return { passErrorResponseMessage };
};

export const LoginInformation = ({ navigation }) => {
  const queryClient = useQueryClient();
  const intl = useIntl();
  const { userData } = useContext(AuthContext);
  const { schema } = useLoginInformation();
  const { passErrorResponseMessage } = usePassErrorResponseMessage();

  const [showToast, setShowToast] = useState(false);

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [
    isPasswordConfirmationSecure,
    setIsPasswordConfirmationSecure,
  ] = useState(true);

  const { mutate, isSuccess, isLoading, isError, error } = useMutation({
    mutationFn: data => changePassword(data),
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
    email: userData?.email,
    oldPassword: '',
    newPassword: '',
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
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
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
          id: 'register.title.loginInformation',
        })}
      />
      <StyledScrollView style={{ backgroundColor: 'white' }}>
        <Layout>
          <View>
            <View>
              <Text variant="labelLarge">
                {intl.formatMessage({
                  id: 'register.title.loginInformation',
                })}
              </Text>
              <Spacer />
              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomTextInput
                  disabled
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
              <StyledCard mode="elevated">
                <Card.Content>
                  <Text variant="labelLarge" style={style.fontBold}>
                    {intl.formatMessage({ id: 'general.attention' })}
                  </Text>
                  <Text style={style.marginTop}>
                    If you forgot your password and changed it, please insert
                    the password you received in your email inbox and insert
                    into the Old Password field
                  </Text>
                </Card.Content>
              </StyledCard>

              <View style={[style.inputWidth, style.marginBottom]}>
                <CustomTextInput
                  control={control}
                  rules={{ required: true }}
                  name="oldPassword"
                  placeholder="Old Password"
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
                  name="newPassword"
                  placeholder="New Password"
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
            <View>
              {isError && (
                <ErrorCard
                  errMessage={passErrorResponseMessage(error?.response?.status)}
                />
              )}
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
