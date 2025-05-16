import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

const Icon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  text-align: center;
`;

const Message = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  text-align: center;
  opacity: 0.7;
`;

export interface EmptyStateProps {
  icon?: string;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = 'search',
  title = 'No results found',
  message = 'We couldn\'t find any content matching your criteria.',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Container>
      <Icon name={icon} size={64} />
      <Title>{title}</Title>
      <Message>{message}</Message>
      {actionLabel && onAction && (
        <Button variant="primary" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </Container>
  );
} 