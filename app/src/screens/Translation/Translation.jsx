import React from 'react';
import { AppHeader } from 'components/AppHeader';
import { ScrollView, View, Linking } from 'react-native';
import { Layout, StyledCard } from 'components/Layout/Layout';
import { Card, Divider, List, Text } from 'react-native-paper';
import { PrimaryButton } from 'components/Buttons';

const externalLink = (type, value) => {
  const typeValue = type === 'email' ? `mailTo:${value}` : `tel:${value}`;
  Linking.openURL(typeValue).catch(error => {
    console.error('Failed opening page because:', error);
    alert('Failed to open page');
  });
};

export const Translation = ({ navigation }) => {
  return (
    <>
      <AppHeader goBack={() => navigation.goBack()} title="Translation" />
      <ScrollView>
        <Layout>
          <StyledCard>
            <Card.Content>
              <Text variant="labelLarge" style={{ fontWeight: 'bold' }}>
                Nutzen Sie unseren Übersetzungsservice
              </Text>
              <View style={{ marginTop: 12, marginBottom: 12 }} />
              <Text>
                Manchmal ist es notwendig die Dokumente, die beglaubigt werden
                sollen, vorher übersetzen zu lassen.
              </Text>
              <View style={{ marginTop: 12, marginBottom: 12 }} />
              <Text>
                Im Bereich Wirtschaft (Handelsregisterauszug oder free sale
                certificate), Recht ( power of attorney oder z.B. board
                resolution) oder im privaten Bereich für z.B. Zeugnisse,
                Zertifikate oder Geburts- und Heiratsurkunden.
              </Text>
              <View style={{ marginTop: 12, marginBottom: 12 }} />
              <Text>
                Die Legalisierung/ Beglaubigung wird anschließend durch VISASTAR
                realisiert.
              </Text>
              <Divider style={{ marginTop: 21, marginBottom: 21 }} />
              <Text variant="labelLarge" style={{ fontWeight: 'bold' }}>
                Unsere beeidigten Übersetzer fertigen fachlich korrekte und
                preislich faire Übersetzungen zur Verwendung in den jeweiligen
                Ländern
              </Text>
              <View style={{ marginTop: 12, marginBottom: 12 }} />
              <Text variant="labelLarge">
                Die Legalisierung/ Beglaubigung wird anschließend durch VISASTAR
                realisiert.
              </Text>
              <List.Section>
                <List.Item title="englisch" />
                <List.Item title="französisch" />
                <List.Item title="arabisch" />
                <List.Item title="spanisch" />
                <List.Item title="italienisch" />
                <List.Item title="thailändisch" />
                <List.Item title="russisch" />
              </List.Section>
              <Divider style={{ marginTop: 21, marginBottom: 21 }} />
              <PrimaryButton
                onPress={() => externalLink('email', 'info@visastar.de')}
              >
                Direkt Anfragen
              </PrimaryButton>
            </Card.Content>
          </StyledCard>
        </Layout>
      </ScrollView>
    </>
  );
};
