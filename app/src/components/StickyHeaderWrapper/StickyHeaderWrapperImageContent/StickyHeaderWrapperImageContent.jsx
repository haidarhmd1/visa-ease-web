import React from 'react';
import { FloatingCard } from 'components/FloatingCard';
import { Animated, StyleSheet, View } from 'react-native';
import { BANNER_H } from 'helpers/constants/environment';
import { Text } from 'react-native-paper';

export const StickyHeaderWrapperImageContent = ({
  scrollA,
  imageSrc,
  floatingCardContent,
  title,
}) => {
  return (
    <View style={styles.relative}>
      <View style={styles.bannerContainer}>
        <Animated.Image style={styles.banner(scrollA)} source={imageSrc} />
      </View>
      {title && (
        <Text variant="headlineMedium" style={styles.text}>
          {title}
        </Text>
      )}
      {floatingCardContent && (
        <FloatingCard>{floatingCardContent}</FloatingCard>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
  },
  text: {
    position: 'absolute',
    bottom: 0,
    padding: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 900,
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  banner: scrollA => ({
    height: BANNER_H,
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
});
