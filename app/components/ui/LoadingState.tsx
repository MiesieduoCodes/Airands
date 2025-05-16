import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

const Message = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  text-align: center;
`;

export interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
}

export function LoadingState({ message, size = 'large' }: LoadingStateProps) {
  return (
    <Container>
      <ActivityIndicator size={size} color="#007AFF" />
      {message && <Message>{message}</Message>}
    </Container>
  );
} 