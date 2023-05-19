import React, { useContext, useEffect, useState } from 'react';

import { PrimaryButton, SecondaryButton } from 'components/Buttons';
import { Background, Logo } from 'components/Login';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { styles } from 'screens/Auth/Login/Login.styled';
import { ROUTES } from 'helpers/constants/routes';
import { LoginIllustration } from 'assets/illustrations';
import { Image } from 'expo-image';
import { useForm } from 'react-hook-form';
import { CustomTextInput } from 'components/CustomFormElements/CustomFormElements';
import { blurhash } from 'helpers/constants/global';
import { ErrorCard } from 'components/ErrorCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from 'react-native-paper';
import { useIntl } from 'react-intl';
import AuthContext from 'provider/AuthProvider';
import { useLoginSchema } from './Login.schema';

const LoginRaw = ({ navigation }) => {
  const { formatMessage } = useIntl();

  const {
    isAuthenticated,
    login,
    isLoginLoading,
    IsLoginError,
    loginError,
    isEmailConfirmed,
  } = useContext(AuthContext);
  const { loginSchema } = useLoginSchema();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    reset({ email: '', password: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = values => {
    login(values);
  };

  // if (!isEmailConfirmed && !isAuthenticated) {
  //   return navigation.navigate(ROUTES.ENTER_OTP, {
  //     userId: loginError?.response.data.userId,
  //   });
  // }

  return (
    <Background>
      <View style={styles.centerItems}>
        <Logo />
        <Image
          style={styles.image}
          source={LoginIllustration}
          placeholder={blurhash}
          contentFit="contain"
          transition={1000}
        />
      </View>
      <View style={styles.formWrapper}>
        {IsLoginError && (
          <ErrorCard errMessage={loginError?.response.data.message} />
        )}
        <View>
          <View style={[styles.inputWidth, styles.marginBottom]}>
            <CustomTextInput
              name="email"
              placeholder={formatMessage({
                id: 'login.input.email.placeholder',
              })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              rules={{ required: true }}
              control={control}
              left={<TextInput.Icon icon="account-circle-outline" />}
            />
          </View>

          <View style={[styles.inputWidth, styles.marginBottom]}>
            <CustomTextInput
              name="password"
              placeholder={formatMessage({
                id: 'login.input.password.placeholder',
              })}
              control={control}
              secureTextEntry={isPasswordSecure}
              rules={{ required: true }}
              left={<TextInput.Icon icon="form-textbox-password" />}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                />
              }
            />
          </View>

          <TouchableWithoutFeedback>
            <Text
              style={styles.forgotPasswordButton}
              onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
            >
              {formatMessage({ id: 'button.forgotPassword' })}
            </Text>
          </TouchableWithoutFeedback>

          <PrimaryButton
            loading={isLoginLoading}
            style={[styles.buttonWidth, styles.marginBottom]}
            mode="contained"
            disabled={errors.password || errors.email}
            onPress={handleSubmit(onSubmit)}
          >
            {formatMessage({ id: 'button.login' })}
          </PrimaryButton>
          <SecondaryButton
            style={styles.buttonWidth}
            mode="outlined"
            onPress={() => navigation.navigate(ROUTES.REGISTRATION)}
          >
            {formatMessage({ id: 'register.button' })}
          </SecondaryButton>
        </View>
      </View>
    </Background>
  );
};

export const Login = React.memo(LoginRaw);
