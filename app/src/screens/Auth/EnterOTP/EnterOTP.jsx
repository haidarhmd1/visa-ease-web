import React, { useContext, useEffect } from 'react';

import { SecondaryButton } from 'components/Buttons';
import { BackButton } from 'components/Login';
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { OTPIllustration } from 'assets/illustrations';
import { Image } from 'expo-image';
import { colorPalette } from 'styles/theme/theme.extended';
import { useForm } from 'react-hook-form';
import { CustomTextInput } from 'components/CustomFormElements/CustomFormElements';
import { useMutation } from 'react-query';
import { enterOTP, reSendOTP } from 'services/api';
import { ROUTES } from 'helpers/constants/routes';
import { useIntl } from 'react-intl';
import { blurhash } from 'helpers/constants/global';
import AuthContext from 'provider/AuthProvider';

const defaultValues = {
  token: '',
};

const EnterOTPRaw = ({ route, navigation }) => {
  const { formatMessage } = useIntl();
  const { setIsEmailConfirmed } = useContext(AuthContext);
  const { userId } = route.params;
  useEffect(() => {
    if (userId) return;
    navigation.navigate(ROUTES.LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: ({ data }) => enterOTP({ data, id: userId }),
    onSuccess: () => {
      setIsEmailConfirmed(true);
      navigation.navigate(ROUTES.LOGIN);
    },
  });

  const { mutate, isLoading: isResendLoading } = useMutation({
    mutationFn: () => reSendOTP(userId),
  });

  const { control, handleSubmit } = useForm({
    defaultValues,
    enableReinitialize: true,
  });

  const onSubmit = async values => {
    await mutateAsync({ data: values });
  };

  return (
    <View style={style.enterOTPWrapper}>
      <BackButton
        goBack={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.LOGIN }],
          })
        }
      />
      <View style={style.flexContentCenter}>
        <View style={style.center}>
          <Image
            style={style.image}
            source={OTPIllustration}
            placeholder={blurhash}
            contentFit="contain"
            transition={1000}
          />
        </View>
        <View style={style.formWrapper}>
          <HelperText type="error">
            {isError && formatMessage({ id: 'enterOTP.input.error' })}
          </HelperText>
          <>
            <View style={[style.inputWidth, style.marginBottom]}>
              <CustomTextInput
                control={control}
                name="token"
                placeholder={formatMessage({
                  id: 'enterOTP.input.placeholder',
                })}
                autoCapitalize="none"
                autoCorrect={false}
                rules={{ required: true }}
                left={<TextInput.Icon icon="account-circle-outline" />}
              />
            </View>
            <SecondaryButton
              isLoading={isLoading || isResendLoading}
              style={style.buttonWidth}
              mode="outlined"
              onPress={handleSubmit(onSubmit)}
            >
              {formatMessage({ id: 'button.submit' })}
            </SecondaryButton>
          </>
          <TouchableWithoutFeedback onPress={mutate}>
            <Text style={style.resendTokenStyles}>
              {formatMessage({ id: 'enterOTP.resendCode' })}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  enterOTPWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  formWrapper: { width: 340, alignSelf: 'center' },
  flexContentCenter: { flex: 1, justifyContent: 'center' },
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
  resendTokenStyles: {
    fontSize: 12,
    textAlign: 'center',
    color: colorPalette.turquoise.t700,
    marginTop: 8,
  },
});

export const EnterOTP = React.memo(EnterOTPRaw);
