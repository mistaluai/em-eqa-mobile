import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { onboardingData } from '../constants';

const { width } = Dimensions.get('window');

/**
 * Custom hook for OnboardingScreen logic
 * Handles carousel navigation and screen transitions
 */
export const useOnboardingLogic = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (offset: number) => {
    const newIndex = Math.round(offset / width);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      navigation.navigate('Login' as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Home' as never);
  };

  const handleSignUp = () => {
    navigation.navigate('Signup' as never);
  };

  return {
    flatListRef,
    currentIndex,
    handleScroll,
    handleNext,
    handleSkip,
    handleSignUp,
  };
};

