import React, { useRef } from 'react';

import { View, Animated, StyleSheet } from 'react-native';
import { StickyHeaderWrapperImageContent } from './StickyHeaderWrapperImageContent';
import { StickyAppHeader } from '../AppHeader/StickyAppHeader';

export const StickyHeaderWrapper = ({
  showBackButton = true,
  appBarTitle,
  navigation,
  floatingCardContent = null,
  children,
  imageSrc,
  title,
}) => {
  const scrollA = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <StickyAppHeader
        showBackButton={showBackButton}
        scrollA={scrollA}
        goBack={() => navigation.goBack()}
        title={appBarTitle}
      />
      <Animated.ScrollView
        style={styles.whiteBackground}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <StickyHeaderWrapperImageContent
          scrollA={scrollA}
          floatingCardContent={floatingCardContent}
          imageSrc={imageSrc}
          title={title}
        />
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  whiteBackground: {
    backgroundColor: 'white',
  },
});
