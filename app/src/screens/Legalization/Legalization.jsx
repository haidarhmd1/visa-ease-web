import React from 'react';
import { AppHeader } from 'components/AppHeader';
import { useIntl } from 'react-intl';
import { ScrollView, View, Platform } from 'react-native';
import { Layout, StyledCard } from 'components/Layout/Layout';
import { Card, Divider, List, Snackbar, Text } from 'react-native-paper';
import { PrimaryButton } from 'components/Buttons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const Legalization = ({ navigation }) => {
  const intl = useIntl();
  const [isDownloadFinish, setIsDownloadFinish] = React.useState(false);
  const [isUploadFinish, setIsUploadFinish] = React.useState(false);

  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS === 'android' ?? '');

  const downloadPDF = documentLang => {
    FileSystem.downloadAsync(
      `https://visastar.de/wp-content/uploads/${
        documentLang === 'DE'
          ? '2020/01/Auftragsformular-Order-Formular'
          : '2020/07/Auftragsformular-Order-Formular-visastar-EN.pdf'
      }.pdf`,
      `${downloadPath}Auftragsformular-Order-Formular${
        documentLang === 'DE' ? '_de' : '_en'
      }.pdf`
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

  const documentUpload = async () => {
    const document = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: 'application/pdf',
    });
    console.log('document', document);
    if (document.type === 'success') {
      setIsUploadFinish(true);
      setTimeout(() => {
        setIsUploadFinish(false);
      }, 2000);
    }
  };

  return (
    <>
      <AppHeader
        title={intl.formatMessage({
          id: 'visastar.home.services.legalization',
        })}
        goBack={() => navigation.goBack()}
      />
      <ScrollView>
        <Layout>
          <StyledCard>
            <Card.Content>
              <Text variant="labelLarge" style={{ padding: 16 }}>
                Already filled it out? Upload here...
              </Text>

              <Divider style={{ marginTop: 5, marginBottom: 21 }} />
              <PrimaryButton
                style={{ marginBottom: 16 }}
                icon="upload"
                onPress={documentUpload}
              >
                Upload
              </PrimaryButton>
            </Card.Content>
          </StyledCard>
          <StyledCard>
            <Card.Content>
              <Text variant="labelLarge" style={{ padding: 16 }}>
                Was benötigen wir von Ihnen? / What do we require from you?
              </Text>
              <List.AccordionGroup>
                <List.Accordion title="Deutsch" id="1">
                  <List.Item
                    titleNumberOfLines={4}
                    title="Das vollständig ausgefüllte Auftragsformular-Order
              Formular."
                    description={
                      <View>
                        <Text variant="labelLarge" />
                        <Text>
                          Hinweis! Jede Botschaft, jedes Konsulat hat eigene,
                          individuelle Richtlinien. Deshalb ist es sinnvoll
                          unseren erstklassigen Dokumentenservice zu nutzen.
                          Sprechen Sie uns an!
                        </Text>
                      </View>
                    }
                  />
                </List.Accordion>
                <List.Accordion title="English" id="2">
                  <List.Item
                    titleNumberOfLines={4}
                    title="The completely filled out order form. (English Version)"
                    description={
                      <View>
                        <Text variant="labelLarge" />
                        <Text>
                          Note! Every embassy, every consulate has its own
                          individual guidelines. Therefore, it makes sense to
                          use our first-class document service. Please contact
                          us!
                        </Text>
                        <Divider style={{ marginTop: 21, marginBottom: 21 }} />
                        <Text variant="labelMedium">
                          1. Please fill out & print the order form-Order form
                          on your PC!
                        </Text>
                        <View style={{ marginTop: 6, marginBottom: 6 }} />
                        <Text variant="labelMedium">
                          2. Then simply send it by mail to VISASTAR,
                          Friedrichstr. 95, 10117 Berlin or scan it and send it
                          as .pdf or .jpeg file to info@visastar.de{' '}
                        </Text>
                      </View>
                    }
                  />
                </List.Accordion>
              </List.AccordionGroup>
              <Divider style={{ marginTop: 21, marginBottom: 21 }} />

              <List.AccordionGroup>
                <List.Accordion
                  title="Schritt für Schritt zur Beglaubigung"
                  id="1"
                >
                  <List.Item
                    description={
                      <View>
                        <Text variant="labelLarge" />
                        <Text>
                          Die vorbeglaubigten Dokumente. (Notar, Landgerichten
                          oder IHK./ Die Botschaften verlangen teilweise
                          unterschiedliche Vorbeglaubigungen.) Auf Wunsch
                          erledigen wir auch die Vorbeglaubigungen für Sie.
                          Notarielle und Landgerichtsvorbeglaubigungen können
                          wir, wenn möglich, im Expressverfahren erledigen. Auch
                          die Legalisierung beim Bundesverwaltungsamt BVA
                          erfolgt Standardmäßig im Expressverfahren.
                        </Text>
                        <Divider style={{ marginTop: 21, marginBottom: 21 }} />
                        <Text>
                          Einfach das Auftragsformular herunterladen, ausfüllen
                          und zurücksenden. (per Post oder Mail)
                        </Text>
                        <Divider style={{ marginTop: 21, marginBottom: 21 }} />
                        <Text>
                          Senden Sie uns alle (vorbeglaubigten) Dokumente auf
                          dem Postweg zu. Auch das Auftragsformular, sollten Sie
                          es nicht schon vorab per Mail an uns verschickt haben.
                          VISASTAR, Friedrichstr. 95, 10117 Berlin
                        </Text>
                        <Divider style={{ marginTop: 21, marginBottom: 21 }} />
                        <Text>
                          Bei Erhalt der Dokumente teilen wir Ihnen dann die
                          Höhe der Botschaftsgebühren (bei Handelsrechnungen)mit
                          da diese nicht fix sind und sich nach dem Wechselkurs
                          richten. (abhängig vom jeweiligen Konsulat)
                        </Text>
                        <Divider style={{ marginTop: 21, marginBottom: 21 }} />
                        <Text>
                          Wir gehen mit den Botschaftsgebühren in Vorleistung
                          und wickeln alles mit den Botschaften/ Konsulaten ab.
                        </Text>

                        <Divider style={{ marginTop: 21, marginBottom: 21 }} />
                        <Text>
                          Sie bekommen Statusmitteilungen der Bearbeitung und
                          haben die Dokumente beglaubigt in wenigen Tagen auf
                          Ihrem Schreibtisch. Anschließend bekommen Sie eine
                          Rechnung über die Botschaftsgebühren und der
                          Dienstleistungen von VISA Star.
                        </Text>
                      </View>
                    }
                  />
                </List.Accordion>
              </List.AccordionGroup>

              <Divider style={{ marginTop: 21, marginBottom: 21 }} />

              <List.AccordionGroup>
                <List.Accordion
                  title="Nötige Dokumente für die Botschaft"
                  id="2"
                >
                  <List.Item
                    description={
                      <View>
                        <Text variant="labelLarge" />
                        <Text>1. Kopie der Rechnung/en</Text>
                        <Divider style={{ marginTop: 21, marginBottom: 21 }} />
                        <Text variant="labelMedium">
                          2. Kopie des Ursprungszeugnisses
                        </Text>
                        <Divider style={{ marginTop: 21, marginBottom: 21 }} />
                        <Text variant="labelMedium">
                          3. Kopien aller anderen Dokumente
                        </Text>
                        <Divider style={{ marginTop: 21, marginBottom: 21 }} />

                        <Text variant="labelMedium">
                          4. evtl. Kopien der Gebührenüberweisungen
                        </Text>
                      </View>
                    }
                  />
                </List.Accordion>
              </List.AccordionGroup>
            </Card.Content>
          </StyledCard>
          <StyledCard>
            <Card.Content>
              <PrimaryButton
                style={{ marginBottom: 21 }}
                icon="file-download-outline"
                // onPress={documentUpload}
                onPress={() => downloadPDF('DE')}
              >
                Download Auftragsformular-Order Formular
              </PrimaryButton>
              <PrimaryButton
                icon="file-download-outline"
                onPress={() => downloadPDF('EN')}
              >
                Download order form (English Version)
              </PrimaryButton>
            </Card.Content>
          </StyledCard>
        </Layout>
      </ScrollView>
      <Snackbar visible={isDownloadFinish}>Document Downloaded...</Snackbar>
      <Snackbar visible={isUploadFinish}>Document Uploaded...</Snackbar>
    </>
  );
};
