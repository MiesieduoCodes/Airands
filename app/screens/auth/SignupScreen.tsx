import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const Form = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const Footer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;
`;

const LoginText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

const LoginLink = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

export default function SignupScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { showToast } = useToast();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password, 'buyer', name); // Default to buyer role
      navigation.navigate('RoleSelection');
    } catch (error) {
      showToast('Error creating account', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Form>
        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          autoCapitalize="words"
        />
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
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />
        <Button onPress={handleSignup} loading={isLoading}>
          Sign Up
        </Button>
      </Form>
      <Footer>
        <LoginText>
          Already have an account?{' '}
          <LoginLink onPress={() => navigation.navigate('Login')}>
            Log in
          </LoginLink>
        </LoginText>
      </Footer>
    </Container>
  );
} 