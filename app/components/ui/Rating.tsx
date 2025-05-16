import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StarsContainer = styled.View`
  flex-direction: row;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const Star = styled(Ionicons)<{ filled: boolean }>`
  color: ${({ filled, theme }) => filled ? theme.colors.warning : theme.colors.border};
  margin-right: 2px;
`;

const ReviewCount = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

export interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: number;
}

export function Rating({ value, reviewCount, size = 16 }: RatingProps) {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          name="star"
          size={size}
          filled={true}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <Star
          key={i}
          name="star-half"
          size={size}
          filled={true}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          name="star-outline"
          size={size}
          filled={false}
        />
      );
    }
  }

  return (
    <Container>
      <StarsContainer>
        {stars}
      </StarsContainer>
      {reviewCount !== undefined && (
        <ReviewCount>({reviewCount} reviews)</ReviewCount>
      )}
    </Container>
  );
} 