import React from 'react';
import { StyledCard } from 'components/Layout/Layout';
import { Linking } from 'react-native';
import {
  FAQ,
  LEGALISIERUNG,
  NEWS,
  PREISE,
  TRANSLATION,
  VERSAND,
  VIP_TOUREN,
} from 'helpers/constants/links';
import { List } from 'react-native-paper';
import { useIntl } from 'react-intl';

const RightContent = properties => <List.Icon {...properties} icon="link" />;

const externalLink = url => {
  Linking.openURL(url).catch(error => {
    console.error('Failed opening page because:', error);
    alert('Failed to open page');
  });
};

export const AccountLinks = () => {
  const { formatMessage } = useIntl();
  return (
    <StyledCard>
      <List.Section>
        <List.Subheader>
          {formatMessage({ id: 'screen.account.externalLinks.title' })}
        </List.Subheader>
        <List.Item
          onPress={() => externalLink(FAQ)}
          title={formatMessage({ id: 'screen.account.externalLinks.faq' })}
          right={RightContent}
        />
        <List.Item
          onPress={() => externalLink(NEWS)}
          title={formatMessage({ id: 'screen.account.externalLinks.news' })}
          right={RightContent}
        />
        <List.Item
          onPress={() => externalLink(VIP_TOUREN)}
          title={formatMessage({ id: 'screen.account.externalLinks.vipTours' })}
          right={RightContent}
        />
        <List.Item
          onPress={() => externalLink(VERSAND)}
          title={formatMessage({ id: 'screen.account.externalLinks.shipment' })}
          right={RightContent}
        />
        <List.Item
          onPress={() => externalLink(PREISE)}
          title={formatMessage({ id: 'screen.account.externalLinks.prices' })}
          right={RightContent}
        />
        <List.Item
          onPress={() => externalLink(TRANSLATION)}
          title={formatMessage({
            id: 'screen.account.externalLinks.translations',
          })}
          right={RightContent}
        />
        <List.Item
          onPress={() => externalLink(LEGALISIERUNG)}
          title={formatMessage({
            id: 'screen.account.externalLinks.legalization',
          })}
          right={RightContent}
        />
      </List.Section>
    </StyledCard>
  );
};
