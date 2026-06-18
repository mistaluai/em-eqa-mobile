import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from 'react-native-reanimated';

export const PulsingDot = ({ color, size = 12, isPulsing = true }: { color: string, size?: number, isPulsing?: boolean }) => {
  const opacity = useSharedValue(isPulsing ? 0.3 : 1);
  const scale = useSharedValue(isPulsing ? 0.8 : 1);

  useEffect(() => {
    if (isPulsing) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.8, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      opacity.value = withTiming(1);
      scale.value = withTiming(1);
    }
  }, [isPulsing]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.dot, { backgroundColor: color }, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  }
});
