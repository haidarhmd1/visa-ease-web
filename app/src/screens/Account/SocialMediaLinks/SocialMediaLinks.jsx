import React from 'react';
import { StyledCard } from 'components/Layout/Layout';
import { Linking } from 'react-native';
import { List } from 'react-native-paper';
import { useIntl } from 'react-intl';

const InstagramIcon = properties => (
  <List.Icon {...properties} icon="instagram" />
);
const FacebookIcon = properties => (
  <List.Icon {...properties} icon="facebook" />
);

const externalLink = (type, value) => {
  const typeValue = type === 'email' ? `mailTo:${value}` : `tel:${value}`;
  Linking.openURL(typeValue).catch(error => {
    console.error('Failed opening page because:', error);
    alert('Failed to open page');
  });
};

export const SocialMediaLinks = () => {
  const { formatMessage } = useIntl();
  return (
    <StyledCard>
      <List.Section>
        <List.Subheader>
          {formatMessage({ id: 'screen.account.socialMedia.title' })}
        </List.Subheader>
        <List.Item
          onPress={() => externalLink('phone', '+49 030 27578642')}
          title={formatMessage({ id: 'screen.account.socialMedia.instagram' })}
          right={InstagramIcon}
        />
        <List.Item
          onPress={() => externalLink('phone', '+49 170 8 90 8 770')}
          title={formatMessage({ id: 'screen.account.socialMedia.facebook' })}
          right={FacebookIcon}
        />
      </List.Section>
    </StyledCard>
  );
};
