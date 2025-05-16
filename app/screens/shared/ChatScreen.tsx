import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const UserStatus = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const MessageList = styled(FlatList)`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const MessageBubble = styled.View`
  max-width: 80%;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: 16px;
  ${({ sent }) =>
    sent
      ? `
    background-color: #007AFF;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  `
      : `
    background-color: #E5E5EA;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  `}
`;

const MessageText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ sent }) => (sent ? '#FFFFFF' : '#000000')};
`;

const MessageTime = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ sent }) => (sent ? '#FFFFFF' : '#000000')};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  align-self: flex-end;
`;

const InputContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  align-items: center;
`;

const Input = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

const SendButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

// Mock data
const chat = {
  user: {
    name: 'Fresh Groceries',
    status: 'Online',
    avatar: 'https://picsum.photos/100/100',
  },
  messages: [
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      time: '10:30 AM',
      sent: false,
    },
    {
      id: '2',
      text: 'Hi! I have a question about my order #123456',
      time: '10:31 AM',
      sent: true,
    },
    {
      id: '3',
      text: 'Sure, I\'d be happy to help. What would you like to know?',
      time: '10:32 AM',
      sent: false,
    },
    {
      id: '4',
      text: 'I was wondering if you could tell me the estimated delivery time?',
      time: '10:33 AM',
      sent: true,
    },
    {
      id: '5',
      text: 'Your order is currently being prepared and should be delivered within 30-45 minutes.',
      time: '10:34 AM',
      sent: false,
    },
  ],
};

export default function ChatScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;

    // TODO: Implement send message logic
    setMessage('');
  };

  const handleBack = () => {
    // TODO: Navigate back
  };

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container>
        <Header>
          <BackButton onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </BackButton>
          <UserInfo>
            <UserName>{chat.user.name}</UserName>
            <UserStatus>{chat.user.status}</UserStatus>
          </UserInfo>
        </Header>

        <MessageList
          ref={flatListRef}
          data={chat.messages}
          keyExtractor={(item) => item.id}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          renderItem={({ item }) => (
            <MessageBubble sent={item.sent}>
              <MessageText sent={item.sent}>{item.text}</MessageText>
              <MessageTime sent={item.sent}>{item.time}</MessageTime>
            </MessageBubble>
          )}
        />

        <InputContainer>
          <Input
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <SendButton onPress={handleSend}>
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </SendButton>
        </InputContainer>
      </Container>
    </KeyboardAvoidingView>
  );
} 