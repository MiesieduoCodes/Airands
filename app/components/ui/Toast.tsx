import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
}

const getToastColor = (type: ToastType, theme: any) => {
  switch (type) {
    case 'success':
      return theme.colors.success;
    case 'error':
      return theme.colors.error;
    case 'warning':
      return theme.colors.warning;
    case 'info':
      return theme.colors.primary;
  }
};

const ToastContainer = styled(Animated.View)<{ type: ToastType }>`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl}px;
  left: ${({ theme }) => theme.spacing.md}px;
  right: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ type, theme }) => getToastColor(type, theme)};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  elevation: 5;
  shadow-color: ${({ theme }) => theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const ToastMessage = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onHide,
}) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  }, []);

  return (
    <ToastContainer type={type} style={{ opacity }}>
      <ToastMessage>{message}</ToastMessage>
    </ToastContainer>
  );
}; 