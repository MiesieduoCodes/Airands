import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled(ScrollView)`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const FilterButton = styled(Button)`
  flex: 1;
`;

const OrderCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const OrderStatus = styled.View<{ status: string }>`
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'pending':
        return theme.colors.warning;
      case 'in_progress':
        return theme.colors.primary;
      case 'completed':
        return theme.colors.success;
      default:
        return theme.colors.border;
    }
  }};
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  align-self: flex-start;
`;

const StatusText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-weight: bold;
`;

const OrderInfo = styled.View`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const OrderText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const OrderPrice = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
`;

// Mock data
const orders = [
  {
    id: '1',
    seller: 'Fresh Groceries',
    items: ['Apples', 'Bananas', 'Oranges'],
    status: 'pending',
    price: '$25.99',
    date: '2024-03-20',
  },
  {
    id: '2',
    seller: 'Bakery Delights',
    items: ['Bread', 'Croissants'],
    status: 'in_progress',
    price: '$15.50',
    date: '2024-03-19',
  },
  {
    id: '3',
    seller: 'Organic Market',
    items: ['Organic Milk', 'Eggs'],
    status: 'completed',
    price: '$12.75',
    date: '2024-03-18',
  },
];

export default function OrdersScreen() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const filteredOrders = orders.filter(
    (order) => activeFilter === 'all' || order.status === activeFilter
  );

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <Container>
      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FilterContainer>
          <FilterButton
            variant={activeFilter === 'all' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton
            variant={activeFilter === 'pending' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('pending')}
          >
            Pending
          </FilterButton>
          <FilterButton
            variant={activeFilter === 'in_progress' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('in_progress')}
          >
            In Progress
          </FilterButton>
          <FilterButton
            variant={activeFilter === 'completed' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('completed')}
          >
            Completed
          </FilterButton>
        </FilterContainer>

        {filteredOrders.map((order) => (
          <OrderCard key={order.id}>
            <CardHeader>
              <CardTitle>{order.seller}</CardTitle>
              <OrderStatus status={order.status}>
                <StatusText>{getStatusText(order.status)}</StatusText>
              </OrderStatus>
            </CardHeader>
            <CardContent>
              <OrderInfo>
                <OrderText>Items: {order.items.join(', ')}</OrderText>
                <OrderText>Date: {order.date}</OrderText>
                <OrderPrice>{order.price}</OrderPrice>
              </OrderInfo>
            </CardContent>
            <CardFooter>
              {order.status === 'in_progress' && (
                <Button variant="primary" size="small">
                  Track Order
                </Button>
              )}
              {order.status === 'completed' && (
                <Button variant="secondary" size="small">
                  View Details
                </Button>
              )}
            </CardFooter>
          </OrderCard>
        ))}
      </Content>
    </Container>
  );
} 