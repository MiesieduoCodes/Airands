import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Dimensions, FlatList, ViewToken } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  width: 100%;
  height: 300px;
`;

const Image = styled.Image`
  width: ${Dimensions.get('window').width}px;
  height: 300px;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md}px;
  width: 100%;
`;

const PaginationDot = styled.View<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.border};
  margin: 0 ${({ theme }) => theme.spacing.xs}px;
`;

const NavigationButton = styled.TouchableOpacity<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ position }) => position}: ${({ theme }) => theme.spacing.md}px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  opacity: 0.8;
`;

const NavigationIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.text};
`;

export interface ImageCarouselProps {
  images: string[];
  onImagePress?: (index: number) => void;
}

export function ImageCarousel({ images, onImagePress }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const handlePrevious = () => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    if (activeIndex < images.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  return (
    <Container>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item }}
            onPress={() => onImagePress?.(index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <PaginationContainer>
        {images.map((_, index) => (
          <PaginationDot key={index} active={index === activeIndex} />
        ))}
      </PaginationContainer>
      {activeIndex > 0 && (
        <NavigationButton position="left" onPress={handlePrevious}>
          <NavigationIcon name="chevron-back" size={24} />
        </NavigationButton>
      )}
      {activeIndex < images.length - 1 && (
        <NavigationButton position="right" onPress={handleNext}>
          <NavigationIcon name="chevron-forward" size={24} />
        </NavigationButton>
      )}
    </Container>
  );
} 