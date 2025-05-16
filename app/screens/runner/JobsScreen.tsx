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

const JobCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const JobStatus = styled.View<{ status: string }>`
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'available':
        return theme.colors.success;
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

// Mock data
const jobs = [
  {
    id: '1',
    orderNumber: '#ORD-001',
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
    status: 'available',
    distance: '2.5 km',
    estimatedTime: '15 mins',
  },
  {
    id: '2',
    orderNumber: '#ORD-002',
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
    status: 'available',
    distance: '1.8 km',
    estimatedTime: '10 mins',
  },
  {
    id: '3',
    orderNumber: '#ORD-003',
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
    status: 'available',
    distance: '3.2 km',
    estimatedTime: '20 mins',
  },
];

export default function JobsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'nearby' | 'high_value'>('all');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleAcceptJob = (jobId: string) => {
    Alert.alert(
      'Accept Job',
      'Are you sure you want to accept this delivery job?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: () => {
            // TODO: Implement accept job logic
            console.log('Accept job:', jobId);
          },
        },
      ]
    );
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'nearby' && parseFloat(job.distance) <= 3) ||
      (activeFilter === 'high_value' && parseFloat(job.total.replace('$', '')) >= 15);

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
              placeholder="Search jobs..."
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
            variant={activeFilter === 'nearby' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('nearby')}
          >
            Nearby
          </FilterButton>
          <FilterButton
            variant={activeFilter === 'high_value' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('high_value')}
          >
            High Value
          </FilterButton>
        </FilterContainer>

        {filteredJobs.map((job) => (
          <JobCard key={job.id}>
            <CardHeader>
              <CardTitle>{job.orderNumber}</CardTitle>
              <JobStatus status={job.status}>
                <StatusText>{getStatusText(job.status)}</StatusText>
              </JobStatus>
            </CardHeader>
            <CardContent>
              <JobInfo>
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
                <JobText>Estimated Time: {job.estimatedTime}</JobText>
                <JobPrice>{job.total}</JobPrice>
              </JobInfo>
            </CardContent>
            <CardFooter>
              <Button
                variant="primary"
                size="small"
                onPress={() => handleAcceptJob(job.id)}
              >
                Accept Job
              </Button>
            </CardFooter>
          </JobCard>
        ))}
      </Content>
    </Container>
  );
} 