import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { SPACING, RADIUS } from '@/theme';
import { useThemeStyles } from "@/theme/useThemeStyles";

/**
 * TypingIndicator - Displays a modern, animated three-dot indicator
 * matching the AI message bubble aesthetics.
 */
export const TypingIndicator: React.FC = () => {
  const styles = useThemeStyles(createStyles);
  
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  const animateDot = (value: Animated.Value, delay: number) => {
    return Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, {
          toValue: 1,
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0.3,
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(800 - delay),
      ])
    );
  };

  useEffect(() => {
    const animations = [
      animateDot(dot1, 0),
      animateDot(dot2, 200),
      animateDot(dot3, 400),
    ];
    
    animations.forEach(anim => anim.start());
    
    return () => animations.forEach(anim => anim.stop());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Animated.View style={[styles.dot, { opacity: dot1 }]} />
        <Animated.View style={[styles.dot, { opacity: dot2 }]} />
        <Animated.View style={[styles.dot, { opacity: dot3 }]} />
      </View>
    </View>
  );
};

const createStyles = (COLORS: any) => StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginVertical: SPACING.s8,
    maxWidth: '85%',
  },
  bubble: {
    backgroundColor: COLORS.backgroundNeutral,
    paddingVertical: SPACING.s12,
    paddingHorizontal: SPACING.s16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: RADIUS.large,
    borderTopRightRadius: RADIUS.large,
    borderBottomRightRadius: RADIUS.large,
    borderBottomLeftRadius: SPACING.s4, // Matches AI bubble tail
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    minWidth: 60,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textSecondary,
    marginHorizontal: 3,
  },
});
