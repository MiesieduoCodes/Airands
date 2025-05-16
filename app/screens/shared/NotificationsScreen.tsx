import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const ClearButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const ClearText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.primary};
`;

const NotificationList = styled(FlatList)`
  flex: 1;
`;

const NotificationCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
`;

const NotificationIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ type }) => {
    switch (type) {
      case 'order':
        return '#007AFF';
      case 'promo':
        return '#FF9500';
      case 'system':
        return '#34C759';
      default:
        return '#8E8E93';
    }
  }};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const NotificationContent = styled.View`
  flex: 1;
`;

const NotificationTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const NotificationMessage = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const NotificationTime = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const FilterContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const FilterButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: 16px;
  background-color: ${({ active }) => (active ? '#007AFF' : '#E5E5EA')};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const FilterText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ active }) => (active ? '#FFFFFF' : '#000000')};
`;

// Mock data
const notifications = [
  {
    id: '1',
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order #123456 has been confirmed and is being prepared.',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'promo',
    title: 'Special Offer',
    message: 'Get 20% off on your next order! Use code: SPECIAL20',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'Account Update',
    message: 'Your account information has been successfully updated.',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'order',
    title: 'Delivery Update',
    message: 'Your order #123456 is out for delivery.',
    time: '3 hours ago',
    read: true,
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'order', label: 'Orders' },
  { id: 'promo', label: 'Promotions' },
];

export default function NotificationsScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [items, setItems] = useState(notifications);

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            setItems([]);
          },
        },
      ]
    );
  };

  const handleNotificationPress = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'unread':
        return items.filter((item) => !item.read);
      case 'order':
        return items.filter((item) => item.type === 'order');
      case 'promo':
        return items.filter((item) => item.type === 'promo');
      default:
        return items;
    }
  };

  const getIconName = (type: string) => {
    switch (type) {
      case 'order':
        return 'cart';
      case 'promo':
        return 'pricetag';
      case 'system':
        return 'settings';
      default:
        return 'notifications';
    }
  };

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon="notifications-off"
        title="No Notifications"
        message="You don't have any notifications at the moment"
      />
    );
  }

  return (
    <Container>
      <Header>
        <Title>Notifications</Title>
        <ClearButton onPress={handleClearAll}>
          <ClearText>Clear All</ClearText>
        </ClearButton>
      </Header>

      <FilterContainer>
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            active={activeFilter === filter.id}
            onPress={() => setActiveFilter(filter.id)}
          >
            <FilterText active={activeFilter === filter.id}>
              {filter.label}
            </FilterText>
          </FilterButton>
        ))}
      </FilterContainer>

      <NotificationList
        data={getFilteredNotifications()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationCard onPress={() => handleNotificationPress(item.id)}>
            <NotificationIcon type={item.type}>
              <Ionicons
                name={getIconName(item.type)}
                size={20}
                color="#FFFFFF"
              />
            </NotificationIcon>
            <NotificationContent>
              <NotificationTitle>{item.title}</NotificationTitle>
              <NotificationMessage>{item.message}</NotificationMessage>
              <NotificationTime>{item.time}</NotificationTime>
            </NotificationContent>
          </NotificationCard>
        )}
      />
    </Container>
  );
} 