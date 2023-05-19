import React from 'react';
import { AppHeader } from 'components/AppHeader';
import { ScrollView, View, Linking, Platform } from 'react-native';
import { Layout, StyledCard } from 'components/Layout/Layout';
import { Card, Divider, List, Snackbar, Text } from 'react-native-paper';
import { PrimaryButton } from 'components/Buttons';
import * as FileSystem from 'expo-file-system';

export const Rates = ({ navigation }) => {
  const [isDownloadFinish, setIsDownloadFinish] = React.useState(false);
  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS === 'android' ?? '');

  const downloadPDF = () => {
    FileSystem.downloadAsync(
      'https://visastar.de/wp-content/uploads/2020/07/Auftragsformular-Order-Formular-visastar-EN.pdf',
      `${downloadPath}Auftragsformular-Order-Formular-visastar-EN.pdf`
    )
      .then(({ uri }) => {
        console.log('Finished downloading to', uri);
        setIsDownloadFinish(true);
        setTimeout(() => {
          setIsDownloadFinish(false);
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        setIsDownloadFinish(false);
      });
  };

  return (
    <>
      <AppHeader goBack={() => navigation.goBack()} title="Rates" />
      <ScrollView>
        <Layout>
          <StyledCard>
            <Card.Content>
              <Text variant="labelLarge">Abweichende Gebühren</Text>
              <Text variant="titleMedium">Amts- und Konsulargebühren:</Text>
              <View style={{ marginTop: 12, marginBottom: 12 }} />
              <Text>
                Die Gebühren der zuständigen Stellen sind abhängig von der Art,
                Länge und Herkunft des Dokuments. Die Konsulatsgebühren erhalten
                Sie von uns auf Anfrage.
              </Text>
              <View style={{ marginTop: 12, marginBottom: 12 }} />
              <Text>
                Bitte senden Sie uns diesbezüglich Ihr Anliegen über unser
                Formular.
              </Text>
              <Divider style={{ marginTop: 21, marginBottom: 21 }} />
              <PrimaryButton icon="file-download-outline" onPress={downloadPDF}>
                Formular Herunterladen
              </PrimaryButton>

              <Divider style={{ marginTop: 21, marginBottom: 21 }} />

              <Text variant="labelLarge">Eigene Gebühren</Text>
              <Text variant="titleMedium">
                Dienstleistungsgebühren VisaStar
              </Text>
              <View style={{ marginTop: 12, marginBottom: 12 }} />
              <Text variant="labelLarge">
                Preise für den Service können auf Grund sehr langer Warte- und
                Bearbeitungszeiten bei einigen Botschaften minimal abweichen.
                Bei den Bezahlvorgängen in einigen Botschaften können die
                üblichen Zahlungsgebühren (payment fees) anfallen.
              </Text>
              <Divider style={{ marginTop: 21, marginBottom: 21 }} />
              <List.AccordionGroup>
                <List.Accordion title="Servicegebühren Legalisierung" id="1">
                  <List.Item
                    titleNumberOfLines={4}
                    title="Beglaubigung durch Konsulat (normale Bearbeitung) je Dokument"
                    description="Price: 38,50 €"
                  />
                  <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                  <List.Item
                    titleNumberOfLines={4}
                    title="Beglaubigung durch Konsulat (Expressbearbeitung) je Dokument"
                    description="Price: 58,50 €"
                  />
                  <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                  <List.Item
                    titleNumberOfLines={4}
                    title="Apostille nach Haager Konvention"
                    description="Price: 40,00 €"
                  />
                </List.Accordion>

                <List.Accordion title="Legalisierung" id="2">
                  <List.Item
                    titleNumberOfLines={4}
                    title="Kopien"
                    description="Price: 60,00 €"
                  />
                  <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                  <List.Item
                    titleNumberOfLines={4}
                    title="Beglaubigung Amtsgericht"
                    description="Price: 60,00 €"
                  />
                  <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                  <List.Item
                    titleNumberOfLines={4}
                    title="Beglaubigung Landgericht"
                    description="Price: 60,00 €"
                  />
                  <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                  <List.Item
                    titleNumberOfLines={4}
                    title="Beglaubigung BVA/ Expressbearbeitung auf Wunsch (aufpreispflichtig)"
                    description="Price: 79,00 €"
                  />
                  <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                  <List.Item
                    titleNumberOfLines={4}
                    title="Beglaubigung IHK/Ghorfa/Kulturbüro je Dokument (ab 2. Dokument Staffelpreise) "
                    description="Price: 60,00 €"
                  />
                </List.Accordion>
                <Text variant="labelMedium" style={{ textAlign: 'center' }}>
                  - Die Konsulatsgebühren werden bei Bearbeitungsbeginn in
                  Rechnung gestellt.
                </Text>
                <View style={{ marginTop: 8, marginBottom: 8 }} />
                <Text variant="labelMedium" style={{ textAlign: 'center' }}>
                  - Jedes Konsulat erhebt eigene Gebühren zur
                  Dokumentenbeglaubigung.
                </Text>
              </List.AccordionGroup>
            </Card.Content>
          </StyledCard>
          <Snackbar visible={isDownloadFinish}>Document Downloaded...</Snackbar>
        </Layout>
      </ScrollView>
    </>
  );
};
