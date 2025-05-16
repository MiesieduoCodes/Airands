import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled(ScrollView)`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const SearchContainer = styled.View`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.md}px;
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
      case 'cancelled':
        return theme.colors.error;
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

const CustomerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const CustomerAvatar = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const CustomerInitials = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-weight: bold;
`;

const CustomerName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

// Mock data
const orders = [
  {
    id: '1',
    orderNumber: '#ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    items: [
      { name: 'Organic Apples', quantity: 2, price: '$4.99' },
      { name: 'Whole Grain Bread', quantity: 1, price: '$3.99' },
    ],
    total: '$13.97',
    status: 'pending',
    date: '2024-03-20 10:30 AM',
  },
  {
    id: '2',
    orderNumber: '#ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    items: [
      { name: 'Free Range Eggs', quantity: 2, price: '$5.99' },
    ],
    total: '$11.98',
    status: 'in_progress',
    date: '2024-03-20 09:15 AM',
  },
  {
    id: '3',
    orderNumber: '#ORD-003',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
    },
    items: [
      { name: 'Organic Apples', quantity: 1, price: '$4.99' },
      { name: 'Free Range Eggs', quantity: 1, price: '$5.99' },
      { name: 'Whole Grain Bread', quantity: 2, price: '$3.99' },
    ],
    total: '$18.96',
    status: 'completed',
    date: '2024-03-19 02:45 PM',
  },
];

export default function OrdersScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    Alert.alert(
      'Update Order Status',
      'Are you sure you want to update the order status?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => {
            // TODO: Implement status update logic
            console.log('Update order:', orderId, 'to status:', newStatus);
          },
        },
      ]
    );
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <Container>
      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header>
          <SearchContainer>
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={<Ionicons name="search" size={20} color="#8E8E93" />}
            />
          </SearchContainer>
        </Header>

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
              <CardTitle>{order.orderNumber}</CardTitle>
              <OrderStatus status={order.status}>
                <StatusText>{getStatusText(order.status)}</StatusText>
              </OrderStatus>
            </CardHeader>
            <CardContent>
              <CustomerInfo>
                <CustomerAvatar>
                  <CustomerInitials>{getInitials(order.customer.name)}</CustomerInitials>
                </CustomerAvatar>
                <CustomerName>{order.customer.name}</CustomerName>
              </CustomerInfo>
              <OrderInfo>
                {order.items.map((item, index) => (
                  <OrderText key={index}>
                    {item.quantity}x {item.name} - {item.price}
                  </OrderText>
                ))}
                <OrderText>Date: {order.date}</OrderText>
                <OrderPrice>{order.total}</OrderPrice>
              </OrderInfo>
            </CardContent>
            <CardFooter>
              {order.status === 'pending' && (
                <Button
                  variant="primary"
                  size="small"
                  onPress={() => handleUpdateStatus(order.id, 'in_progress')}
                >
                  Accept Order
                </Button>
              )}
              {order.status === 'in_progress' && (
                <Button
                  variant="primary"
                  size="small"
                  onPress={() => handleUpdateStatus(order.id, 'completed')}
                >
                  Mark as Completed
                </Button>
              )}
              {order.status === 'pending' && (
                <Button
                  variant="outline"
                  size="small"
                  onPress={() => handleUpdateStatus(order.id, 'cancelled')}
                >
                  Cancel Order
                </Button>
              )}
            </CardFooter>
          </OrderCard>
        ))}
      </Content>
    </Container>
  );
} 