import React from 'react';

import { SecondaryButton } from 'components/Buttons';
import { BackButton } from 'components/Login';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { ForgotPasswordIllustration } from 'assets/illustrations';
import { Image } from 'expo-image';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomTextInput } from 'components/CustomFormElements/CustomFormElements';
import { useMutation } from 'react-query';
import { ErrorCard } from 'components/ErrorCard';
import { blurhash } from 'helpers/constants/global';
import { forgotPassword } from 'services/api';
import { SuccessCard } from 'components/SuccessCard';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ROUTES } from 'helpers/constants/routes';
import { useForgotPasswordSchema } from './ForgotPassword.schema';

const ForgotPasswordRaw = ({ navigation }) => {
  const { formatMessage } = useIntl();
  const { forgotPasswordSchema } = useForgotPasswordSchema();

  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    forgotPassword
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
    enableReinitialize: true,
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = values => {
    mutate(values);
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
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Image
              style={style.image}
              source={ForgotPasswordIllustration}
              placeholder={blurhash}
              contentFit="contain"
              transition={1000}
            />
          </View>
          <View style={{ width: 340, alignSelf: 'center' }}>
            {isError && <ErrorCard errMessage={error?.response.data.message} />}
            {isSuccess && (
              <SuccessCard
                successMsg={formatMessage({
                  id: 'forgotPassword.success.message',
                })}
              >
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate(ROUTES.LOGIN)}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}
                  >
                    {formatMessage({
                      id: 'forgotPassword.success.returnLogin',
                    })}
                  </Text>
                </TouchableWithoutFeedback>
              </SuccessCard>
            )}
            <View style={[style.inputWidth, style.marginBottom]}>
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
            <SecondaryButton
              isLoading={isLoading}
              style={style.buttonWidth}
              mode="outlined"
              onPress={handleSubmit(onSubmit)}
            >
              {formatMessage({ id: 'forgotPassword.resendButton' })}
            </SecondaryButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  inputWidth: {
    width: 340,
  },
  buttonWidth: {
    width: 340,
  },
  inputMarginBottom: {
    marginBottom: 8,
  },
  center: {
    alignSelf: 'center',
  },
  marginBottom: {
    marginBottom: 16,
  },
  image: {
    width: 250,
    height: 250,
    backgroundColor: '#fff',
  },
});

export const ForgotPassword = React.memo(ForgotPasswordRaw);
