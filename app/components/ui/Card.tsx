import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

const getCardStyles = (variant: CardProps['variant'], theme: any) => {
  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: theme.colors.card,
        borderColor: 'transparent',
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      };
    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderColor: theme.colors.border,
        borderWidth: 1,
      };
    default:
      return {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderWidth: 1,
      };
  }
};

const StyledCard = styled.TouchableOpacity<{ variant: CardProps['variant'] }>`
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  ${({ variant, theme }) => getCardStyles(variant, theme)}
`;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  ...props
}) => {
  return (
    <StyledCard variant={variant} {...props}>
      {children}
    </StyledCard>
  );
};

// Card Header Component
export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

// Card Title Component
export const CardTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

// Card Content Component
export const CardContent = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

// Card Footer Component
export const CardFooter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`; 