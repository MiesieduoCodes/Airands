import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';

// Import screens (we'll create these next)
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  RoleSelection: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Create Account' }}
      />
      <Stack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
        options={{ title: 'Select Role' }}
      />
    </Stack.Navigator>
  );
}; 