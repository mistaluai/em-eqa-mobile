import React, { useRef } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { RADIUS, SPACING } from '../theme/styles';

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
    <View style={styles.container}>
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
      <View style={styles.paginationContainer}>
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
                styles.dot,
                { 
                  width: dotWidth, 
        
                  opacity, 
                  // Dot color uses the main primary/action color
                  backgroundColor: COLORS.primary ,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "50%", // Adjusted to provide space for pagination dots
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    // The bottom position might need further adjustment depending on the parent screen layout,
    // but the rest of the style properties remain appropriate.
    bottom: SPACING.s24 + 220, 
    left: 0,
    right: 0,
    zIndex: 10,
    marginBottom: -SPACING.s128,
  },
  dot: {
    height: SPACING.s8,
    borderRadius: RADIUS.full,
    marginHorizontal: SPACING.s4,
    // The background color is set dynamically above using COLORS.primary
  },
});

export default AppCarousel;