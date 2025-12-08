import React, { useRef } from 'react';
import { Animated, Dimensions, FlatList, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme';
import { CarouselComponentStyles } from '../theme/styles/components/CarouselComponentStyle';

const { width } = Dimensions.get('window');

interface AppCarouselProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  onScroll?: (offset: number) => void;
  flatListRef?: React.RefObject<FlatList<T>>;
}

const AppCarousel = <T extends any>({ data, renderItem, keyExtractor, onScroll, flatListRef }: AppCarouselProps<T>) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        if (onScroll) {
          onScroll(event.nativeEvent.contentOffset.x);
        }
      },
    },
  );

  return (
    <View style={CarouselComponentStyles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      />
      <View style={CarouselComponentStyles.paginationContainer}>
        {data.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [SPACING.s8, SPACING.s24, SPACING.s8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[
                CarouselComponentStyles.dot,
                { 
                  width: dotWidth, 
                  opacity, 
                  backgroundColor: COLORS.primary,
                  marginTop: SPACING.s128,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default AppCarousel;