import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
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

const HistoryCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const JobInfo = styled.View`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const JobText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const JobPrice = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
`;

const LocationInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const LocationIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const LocationText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding-top: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatValue = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
`;

const StatLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
`;

// Mock data
const history = [
  {
    id: '1',
    orderNumber: '#ORD-001',
    date: '2024-03-19T15:30:00Z',
    seller: {
      name: 'Fresh Groceries',
      address: '123 Main St, City',
    },
    customer: {
      name: 'John Doe',
      address: '456 Oak Ave, City',
    },
    items: [
      { name: 'Organic Apples', quantity: 2 },
      { name: 'Whole Grain Bread', quantity: 1 },
    ],
    total: '$13.97',
    distance: '2.5 km',
    duration: '15 mins',
    rating: 5,
  },
  {
    id: '2',
    orderNumber: '#ORD-002',
    date: '2024-03-19T14:00:00Z',
    seller: {
      name: 'Bakery Delights',
      address: '789 Pine St, City',
    },
    customer: {
      name: 'Jane Smith',
      address: '321 Elm St, City',
    },
    items: [
      { name: 'Croissants', quantity: 4 },
      { name: 'Coffee', quantity: 2 },
    ],
    total: '$18.50',
    distance: '1.8 km',
    duration: '10 mins',
    rating: 4,
  },
  {
    id: '3',
    orderNumber: '#ORD-003',
    date: '2024-03-19T12:30:00Z',
    seller: {
      name: 'Organic Market',
      address: '555 Market St, City',
    },
    customer: {
      name: 'Mike Johnson',
      address: '888 Park Ave, City',
    },
    items: [
      { name: 'Organic Milk', quantity: 1 },
      { name: 'Free Range Eggs', quantity: 1 },
    ],
    total: '$11.98',
    distance: '3.2 km',
    duration: '20 mins',
    rating: 5,
  },
];

export default function HistoryScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'week'>('all');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const filteredHistory = history.filter((job) => {
    const matchesSearch = 
      job.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const jobDate = new Date(job.date);
    const today = new Date();
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'today' && jobDate.toDateString() === today.toDateString()) ||
      (activeFilter === 'week' && (today.getTime() - jobDate.getTime()) <= 7 * 24 * 60 * 60 * 1000);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalDeliveries: history.length,
    totalEarnings: history.reduce((sum, job) => sum + parseFloat(job.total.replace('$', '')), 0).toFixed(2),
    averageRating: (history.reduce((sum, job) => sum + job.rating, 0) / history.length).toFixed(1),
  };

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
              placeholder="Search history..."
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
            variant={activeFilter === 'today' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('today')}
          >
            Today
          </FilterButton>
          <FilterButton
            variant={activeFilter === 'week' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('week')}
          >
            This Week
          </FilterButton>
        </FilterContainer>

        <Card>
          <CardContent>
            <StatsContainer>
              <StatItem>
                <StatValue>{stats.totalDeliveries}</StatValue>
                <StatLabel>Deliveries</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>${stats.totalEarnings}</StatValue>
                <StatLabel>Earnings</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{stats.averageRating}</StatValue>
                <StatLabel>Rating</StatLabel>
              </StatItem>
            </StatsContainer>
          </CardContent>
        </Card>

        {filteredHistory.map((job) => (
          <HistoryCard key={job.id}>
            <CardHeader>
              <CardTitle>{job.orderNumber}</CardTitle>
            </CardHeader>
            <CardContent>
              <JobInfo>
                <JobText>Date: {new Date(job.date).toLocaleString()}</JobText>
                <JobText>Seller: {job.seller.name}</JobText>
                <LocationInfo>
                  <LocationIcon name="location-outline" size={16} />
                  <LocationText>{job.seller.address}</LocationText>
                </LocationInfo>
                <JobText>Customer: {job.customer.name}</JobText>
                <LocationInfo>
                  <LocationIcon name="location-outline" size={16} />
                  <LocationText>{job.customer.address}</LocationText>
                </LocationInfo>
                {job.items.map((item, index) => (
                  <JobText key={index}>
                    {item.quantity}x {item.name}
                  </JobText>
                ))}
                <JobText>Distance: {job.distance}</JobText>
                <JobText>Duration: {job.duration}</JobText>
                <JobText>Rating: {'★'.repeat(job.rating)}</JobText>
                <JobPrice>{job.total}</JobPrice>
              </JobInfo>
            </CardContent>
          </HistoryCard>
        ))}
      </Content>
    </Container>
  );
} 