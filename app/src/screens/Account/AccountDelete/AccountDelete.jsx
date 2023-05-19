import { DangerButton } from 'components/Buttons';
import { StyledCard } from 'components/Layout/Layout';
import { deleteUser } from 'services/api';
import AuthContext from 'provider/AuthProvider';
import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { useMutation } from 'react-query';

export const AccountDelete = () => {
  const { formatMessage } = useIntl();
  const { logout } = useContext(AuthContext);

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      logout();
    },
    onError: () => {
      Alert.alert(formatMessage({ id: 'general.error.message' }));
    },
  });

  const deleteUserHandler = () => {
    Alert.alert(
      formatMessage({ id: 'button.delete' }),
      formatMessage({ id: 'general.deleteConfirmation' }),
      [
        {
          text: formatMessage({ id: 'button.delete' }),
          onPress: () => {
            mutate();
          },
        },
        {
          text: formatMessage({ id: 'general.cancel' }),
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <StyledCard>
      <Card.Content>
        <DangerButton isLoading={isLoading} onPress={deleteUserHandler}>
          {formatMessage({ id: 'screen.profile.deleteAccount' })}
        </DangerButton>
      </Card.Content>
    </StyledCard>
  );
};
