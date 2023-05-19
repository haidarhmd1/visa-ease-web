import React, { useMemo, useRef, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Portal, Text } from 'react-native-paper';
import { useIntl } from 'react-intl';

export const ModalSheet = ({
  title,
  children,
  visible,
  contentMore = false,
  setVisible,
  detached = true,
  loadFullHeight = false,
  ...properties
}) => {
  const { formatMessage } = useIntl();
  // ref
  const bottomSheetReference = useRef(null);
  // variables
  const snapPoints = useMemo(
    () =>
      contentMore ? ['25%', '50%', '90%'] : loadFullHeight ? ['90%'] : ['25%'],
    [contentMore, loadFullHeight]
  );

  useEffect(() => {
    if (!visible) {
      bottomSheetReference.current?.close();
      return;
    }
    bottomSheetReference.current?.present();
  }, [visible]);

  // renders
  return (
    <Portal>
      <BottomSheetModalProvider>
        <BottomSheetModal
          {...properties}
          ref={bottomSheetReference}
          snapPoints={snapPoints}
          detached={detached}
          style={[detached && styles.sheetContainer, styles.shadow]}
        >
          <View style={title ? styles.header : styles.noTitleHeader}>
            {title && <Text variant="labelMedium">{title}</Text>}
            <Button
              title={formatMessage({ id: 'general.close' })}
              onPress={() => setVisible(false)}
            />
          </View>
          <View style={styles.contentContainer}>{children}</View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    marginHorizontal: 24,
  },
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  noTitleHeader: {
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
