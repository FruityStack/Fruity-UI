import React, { useState, useRef } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { CarouselProps, CarouselItem } from './Carousel.types';
import { createStyles } from './Carousel.styles';

export type { CarouselItem } from './Carousel.types';

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlayInterval,
  onSlideChange,
  showPagination = true,
  showOverlay = true,
  style,
  slideStyle,
  variant = 'default',
}) => {
  const theme = useTheme();
  const baseStyles = createStyles(theme);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(300);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentSlideX = useRef(new Animated.Value(0)).current;
  const nextSlideX = useRef(new Animated.Value(containerWidth)).current;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [nextSlideIndex, setNextSlideIndex] = useState(1);
  const [showNextSlide, setShowNextSlide] = useState(false);

  const isCarouselItem = (item: any): item is CarouselItem => {
    return item && typeof item === 'object' && 'content' in item;
  };

  const getItemData = (item: React.ReactNode | CarouselItem) => {
    if (isCarouselItem(item)) {
      return {
        content: item.content,
        overlay: item.overlay,
      };
    }
    return {
      content: item,
      overlay: null,
    };
  };

  const animateSlideTransition = (toIndex: number, direction: 'next' | 'prev') => {
    if (isAnimating || toIndex === activeIndex) return;
    
    setIsAnimating(true);
    setNextSlideIndex(toIndex);
    setShowNextSlide(true);

    const startX = direction === 'next' ? containerWidth : -containerWidth;
    nextSlideX.setValue(startX);
    currentSlideX.setValue(0);

    const endX = direction === 'next' ? -containerWidth : containerWidth;
    
    Animated.parallel([
      Animated.timing(currentSlideX, {
        toValue: endX,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(nextSlideX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveIndex(toIndex);
      setCurrentSlideIndex(toIndex);
      setShowNextSlide(false);
      setIsAnimating(false);
      
      currentSlideX.setValue(0);
      nextSlideX.setValue(containerWidth);
      
      onSlideChange?.(toIndex);
    });
  };

  const changeSlide = (newIndex: number) => {
    if (newIndex === activeIndex || isAnimating) return;
    
    const direction = newIndex > activeIndex ? 'next' : 'prev';
    animateSlideTransition(newIndex, direction);
  };

  React.useEffect(() => {
    if (!autoPlayInterval || isAnimating) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      animateSlideTransition(nextIndex, 'next');
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [activeIndex, autoPlayInterval, items.length, containerWidth, isAnimating]);

  React.useEffect(() => {
    nextSlideX.setValue(containerWidth);
  }, [containerWidth]);

  React.useEffect(() => {
    setCurrentSlideIndex(0);
  }, []);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const handleDotPress = (index: number) => {
    changeSlide(index);
  };

  return (
    <View style={[baseStyles.container, style]} onLayout={handleLayout}>
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: 'transparent' }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transform: [{ translateX: currentSlideX }],
              backgroundColor: 'transparent',
            },
            slideStyle,
          ]}
        >
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            {getItemData(items[currentSlideIndex]).content}
            {showOverlay && getItemData(items[currentSlideIndex]).overlay && (
              <View style={baseStyles.overlay}>
                {getItemData(items[currentSlideIndex]).overlay}
              </View>
            )}
          </View>
        </Animated.View>

        {showNextSlide && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transform: [{ translateX: nextSlideX }],
                backgroundColor: 'transparent',
              },
              slideStyle,
            ]}
          >
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
              {getItemData(items[nextSlideIndex]).content}
              {showOverlay && getItemData(items[nextSlideIndex]).overlay && (
                <View style={baseStyles.overlay}>
                  {getItemData(items[nextSlideIndex]).overlay}
                </View>
              )}
            </View>
          </Animated.View>
        )}
      </View>
      
      {showPagination && (
        <View style={baseStyles.pagination}>
          {items.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              style={[
                baseStyles.paginationDot,
                index === activeIndex && baseStyles.paginationDotActive,
              ]}
              activeOpacity={0.7}
              disabled={isAnimating}
            />
          ))}
        </View>
      )}
    </View>
  );
};

