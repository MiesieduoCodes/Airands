import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

import { AuthStack } from './AuthStack';
import { BuyerTabs } from './BuyerTabs';
import { SellerTabs } from './SellerTabs';
import { RunnerTabs } from './RunnerTabs';

export type RootStackParamList = {
  Auth: undefined;
  Buyer: undefined;
  Seller: undefined;
  Runner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { user, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    // TODO: Add a loading screen
    return null;
  }

  return (
    <NavigationContainer
      theme={{
        dark: colors.background === '#000000',
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.border,
          notification: colors.notification,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            {user.role === 'buyer' && (
              <Stack.Screen name="Buyer" component={BuyerTabs} />
            )}
            {user.role === 'seller' && (
              <Stack.Screen name="Seller" component={SellerTabs} />
            )}
            {user.role === 'runner' && (
              <Stack.Screen name="Runner" component={RunnerTabs} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 