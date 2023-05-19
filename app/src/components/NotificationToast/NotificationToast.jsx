import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { styles } from './NotificationToast.styled';

const ToastType = {
  Top: 'Top',
  Bottom: 'Bottom',
};

export const NotificationToast = ({
  showToast,
  type,
  isLoading,
  error,
  success,
}) => {
  const positionY = useSharedValue(type === ToastType.Top ? -100 : 100);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(positionY.value) }],
    };
  });

  if (showToast) {
    if (type === ToastType.Top) {
      positionY.value = 0;
    }
    if (type === ToastType.Bottom) {
      positionY.value = -16;
    }
  }

  if (!showToast) {
    if (type === ToastType.Top) {
      positionY.value = -100;
    }
    if (type === ToastType.Bottom) {
      positionY.value = 100;
    }
  }

  return (
    <Animated.View
      style={[
        styles.commonToastStyle,
        type === ToastType.Top ? styles.topToastStyle : styles.bottomToastStyle,
        animatedStyle,
        success && styles.successStyle,
        error && styles.errorStyle,
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {isLoading && (
          <View
            style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
          >
            <ActivityIndicator
              animating
              size="small"
              color="green"
              style={{ alignSelf: 'center', marginRight: 16 }}
            />

            <Text variant="headlineSmall" style={{ textAlign: 'center' }}>
              Loading...
            </Text>
          </View>
        )}
        {success && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
              size={32}
              iconColor="green"
              icon="check-circle-outline"
              style={{ alignSelf: 'center' }}
            />
            <Text variant="headlineSmall" style={{ textAlign: 'center' }}>
              Success
            </Text>
          </View>
        )}
        {error && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
              iconColor="red"
              icon="alert-circle-outline"
              size={32}
              style={{ alignSelf: 'center' }}
            />
            <Text variant="headlineSmall" style={{ textAlign: 'center' }}>
              Error
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};
