import React from 'react';
import { Layout, Spacer, StyledCard } from 'components/Layout/Layout';
import { useIntl } from 'react-intl';
import { ActivityIndicator, Divider, List, Text } from 'react-native-paper';
import { ROUTES } from 'helpers/constants/routes';
import { StyleSheet, View } from 'react-native';
import { PalmImage } from 'assets/images';
import { StickyHeaderWrapper } from 'components/StickyHeaderWrapper';
import { useQuery } from 'react-query';
import { getSingleVisaInformation } from 'services/api';
import { SpacerDivider } from 'components/SpacerDivider';
import { MyTheme } from 'styles/theme/theme.extended';
import { useVisaStatus } from 'utils/useVisaStatus';
import { VisaItemButton } from './VisaItemButton';
import { CancelVisa } from './CancelVisa';
import { SubmitVisa } from './SubmitVisa';
import { RevokeVisa } from './RevokeVisa';

const visaCountryData = {
  id: '102cb0ca-9163-4230-bec0-6a50056dbc10',
  title: 'UAE',
  information: `Gültigkeit des Visa 2 Monate
    14 Tage einfache Einreise
    30 Tage einfache und mehrfache Einreise (z.B. bei einer Kreuzfahrt notwendig)
    90 Tage mehrfache Einreise (z.B. bei einer Kreuzfahrt notwendig)`,
  what_we_need: `wir benötigen eine Farbkopie Ihres Reisepasses in guter Qualität (Reisepass muss mindestens 6 Monate gültig bei Rückreise sein)
    Kopie Aufenthaltserlaubnis
    Passbild (biometrisch)
    ausgefülltes Formular
    alle Dokumente eingescannt per E-Mail an visa@visastar.de`,
  slug: 'uae',
};

const filterSpecificDocumentType = (type, visaItem) => {
  if (!visaItem.length) return false;
  const filteredVisaItem = visaItem.filter(
    item => item.documentNameType === type
  );
  if (!filteredVisaItem.length) return false;
  return filteredVisaItem;
};
const useIsVisaApplicationComplete = () => {
  const isVisaApplicationComplete = visaApplication =>
    !!visaApplication.FlightInformation &&
    !!filterSpecificDocumentType('PASSPORT', visaApplication.Documents) &&
    !!filterSpecificDocumentType(
      'RESIDENCE_PERMIT',
      visaApplication.Documents
    ) &&
    !!filterSpecificDocumentType('BIOMETRIC_IMAGE', visaApplication.Documents);

  return { isVisaApplicationComplete };
};

export const VisaApplication = ({ navigation, route }) => {
  const { formatMessage } = useIntl();
  const { isVisaApplicationComplete } = useIsVisaApplicationComplete();
  const { visaStatus } = useVisaStatus();
  const { visaId } = route.params;
  const {
    data: singleVisaApplication,
    isLoading: isSignleVisaApplicationLoading,
  } = useQuery('getSingleVisaApplication', () =>
    getSingleVisaInformation(visaId)
  );

  if (isSignleVisaApplicationLoading) {
    return <ActivityIndicator animating size={12} />;
  }

  const checkIfCompleted =
    singleVisaApplication?.data.status === 'READY' ||
    singleVisaApplication?.data.status === 'COMPLETED' ||
    singleVisaApplication?.data.status === 'PAID';

  return (
    <StickyHeaderWrapper
      appBarTitle={formatMessage({ id: 'screen.visaApplication.title' })}
      navigation={navigation}
      imageSrc={PalmImage}
      title={singleVisaApplication?.data.country.toUpperCase()}
    >
      <Spacer />
      <List.Item
        style={[styles.list, { margin: 12 }]}
        title={formatMessage({ id: 'general.currentVisaStatus' })}
        description={visaStatus(singleVisaApplication?.data.status)}
      />
      <SpacerDivider />
      <Layout style={styles.marginTop(12)}>
        <Text variant="labelLarge" style={styles.marginBottom(8)}>
          {formatMessage({ id: 'visaApplication.steps.information.infoTitle' })}
        </Text>
        <VisaItemButton
          title={formatMessage({ id: 'general.flightInformation' })}
          navigation={navigation}
          route={ROUTES.VISA_INFORMATION.flightInformation}
          isProgessCompleted={singleVisaApplication?.data.FlightInformation}
          visaId={visaId}
          visaItem={singleVisaApplication?.data.FlightInformation}
        />
        <Divider marginBottom={12} marginTop={12} />
        <Text variant="labelLarge" style={styles.marginBottom(8)}>
          {formatMessage({ id: 'general.documents' })}
        </Text>
        <VisaItemButton
          title={formatMessage({ id: 'general.passportPicture' })}
          navigation={navigation}
          route={ROUTES.VISA_INFORMATION.passportPicture}
          visaId={visaId}
          visaItem={filterSpecificDocumentType(
            'PASSPORT',
            singleVisaApplication?.data.Documents
          )}
          isProgessCompleted={filterSpecificDocumentType(
            'PASSPORT',
            singleVisaApplication?.data.Documents
          )}
        />

        <VisaItemButton
          title={formatMessage({ id: 'general.residencePermit' })}
          navigation={navigation}
          route={ROUTES.VISA_INFORMATION.residencePermit}
          visaId={visaId}
          visaItem={filterSpecificDocumentType(
            'RESIDENCE_PERMIT',
            singleVisaApplication?.data.Documents
          )}
          isProgessCompleted={filterSpecificDocumentType(
            'RESIDENCE_PERMIT',
            singleVisaApplication?.data.Documents
          )}
        />

        <VisaItemButton
          title={formatMessage({ id: 'general.biometricImage' })}
          navigation={navigation}
          route={ROUTES.VISA_INFORMATION.biometricImage}
          visaId={visaId}
          visaItem={filterSpecificDocumentType(
            'BIOMETRIC_IMAGE',
            singleVisaApplication?.data.Documents
          )}
          isProgessCompleted={filterSpecificDocumentType(
            'BIOMETRIC_IMAGE',
            singleVisaApplication?.data.Documents
          )}
        />

        <StyledCard>
          <List.Section>
            <List.Accordion
              style={styles.backgroundWhite}
              title={formatMessage({
                id: 'visaApplication.steps.information.infoTitle',
              })}
            >
              <List.Item
                descriptionNumberOfLines={100}
                title=""
                description={visaCountryData?.information}
              />
            </List.Accordion>

            <Divider marginBottom={12} marginTop={12} />
            <List.Accordion
              style={styles.backgroundWhite}
              title={formatMessage({
                id: 'visaApplication.steps.information.whatWeNeedBox.title',
              })}
            >
              <List.Item
                descriptionNumberOfLines={100}
                title=""
                description={visaCountryData?.what_we_need}
              />
            </List.Accordion>
          </List.Section>
        </StyledCard>
        {!checkIfCompleted && (
          <View>
            <SubmitVisa
              isVisaApplicationComplete={isVisaApplicationComplete(
                singleVisaApplication?.data
              )}
              isCancelled={
                singleVisaApplication?.data.status === 'CANCELLED'
                // singleVisaApplication?.data.status === 'PENDING'
              }
              navigation={navigation}
              visaId={singleVisaApplication?.data.id}
            />
            <Spacer />
          </View>
        )}
        {singleVisaApplication?.data.status === 'CANCELLED' ? (
          <RevokeVisa
            navigation={navigation}
            isVisaApplicationComplete={isVisaApplicationComplete(
              singleVisaApplication?.data
            )}
            visaId={singleVisaApplication?.data.id}
          />
        ) : (
          <CancelVisa navigation={navigation} route={route} />
        )}
      </Layout>
    </StickyHeaderWrapper>
  );
};

const styles = StyleSheet.create({
  marginTop: units => ({ marginTop: units }),
  marginBottom: units => ({ marginBottom: units }),
  backgroundWhite: { backgroundColor: 'white' },

  list: {
    borderWidth: 1,
    marginBottom: 8,
    borderColor: MyTheme.colors.primaryBrand,
    borderRadius: 12,
  },
});
