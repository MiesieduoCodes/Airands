import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './app/context/ThemeContext';
import { AuthProvider } from './app/context/AuthContext';
import { ToastProvider } from './app/context/ToastContext';
import { StyledComponentsThemeProvider } from './app/components/styled/ThemeProvider';
import { RootNavigator } from './app/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StyledComponentsThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <StatusBar style="auto" />
              <RootNavigator />
            </ToastProvider>
          </AuthProvider>
        </StyledComponentsThemeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
} 