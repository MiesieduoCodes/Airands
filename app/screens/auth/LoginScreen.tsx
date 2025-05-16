import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Logo = styled.Text`
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const Form = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const Footer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;
`;

const SignupText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

const SignupLink = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      showToast('Invalid email or password', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Logo>Airands</Logo>
      <Form>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
        <Button onPress={handleLogin} loading={isLoading}>
          Log In
        </Button>
      </Form>
      <Footer>
        <SignupText>
          Don't have an account?{' '}
          <SignupLink onPress={() => navigation.navigate('Signup')}>
            Sign up
          </SignupLink>
        </SignupText>
      </Footer>
    </Container>
  );
} 