import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';

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

  const handleLogin = () => {
      navigation.navigate('Login' as never);  
  };

  // const handleSkip = () => {
  //   navigation.navigate('Home' as never);
  // };

  const handleSignUp = () => {
    navigation.navigate('Signup' as never);
  };

  return {
    flatListRef,
    currentIndex,
    handleScroll,
    handleLogin,
    //handleSkip,
    handleSignUp,
  };
};

