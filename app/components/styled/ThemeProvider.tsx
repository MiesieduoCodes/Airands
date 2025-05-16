import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { useTheme } from '../../context/ThemeContext';

export const StyledComponentsThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors } = useTheme();

  const theme = {
    colors,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
    },
    typography: {
      h1: {
        fontSize: 32,
        fontWeight: 'bold',
      },
      h2: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      h3: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      body: {
        fontSize: 16,
      },
      caption: {
        fontSize: 14,
      },
    },
  };

  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
}; 