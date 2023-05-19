import React from 'react';
import { Linking } from 'react-native';
import { StyledCard } from 'components/Layout/Layout';
import { List } from 'react-native-paper';
import { useIntl } from 'react-intl';

const PhoneIcon = properties => <List.Icon {...properties} icon="phone" />;
const CellPhoneIcon = properties => (
  <List.Icon {...properties} icon="cellphone" />
);
const MailIcon = properties => <List.Icon {...properties} icon="mail" />;

const externalLink = (type, value) => {
  const typeValue = type === 'email' ? `mailTo:${value}` : `tel:${value}`;
  Linking.openURL(typeValue).catch(error => {
    console.error('Failed opening page because:', error);
    alert('Failed to open page');
  });
};

export const ContactLinks = () => {
  const { formatMessage } = useIntl();
  return (
    <StyledCard>
      <List.Section>
        <List.Subheader>
          {formatMessage({ id: 'screen.account.contact.title' })}
        </List.Subheader>
        <List.Item
          onPress={() => externalLink('phone', '+49 030 27578642')}
          title="+49 030 27578642"
          right={PhoneIcon}
        />
        <List.Item
          onPress={() => externalLink('phone', '+49 170 8 90 8 770')}
          title="+49 170 8 90 8 770"
          right={CellPhoneIcon}
        />
        <List.Item
          onPress={() => externalLink('email', 'contactus@visastar.de')}
          title="contactus@visastar.de"
          right={MailIcon}
        />
      </List.Section>
    </StyledCard>
  );
};
