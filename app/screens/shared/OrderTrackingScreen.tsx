import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled(ScrollView)`
  flex: 1;
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const OrderNumber = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const StatusCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const StatusHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const StatusIcon = styled(Ionicons)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const StatusText = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Timeline = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const TimelineItem = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const TimelineIcon = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.border};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const TimelineContent = styled.View`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const TimelineTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const TimelineTime = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const TimelineDescription = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const DeliveryInfo = styled(Card)`
  margin: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const InfoLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const InfoValue = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const Footer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

// Mock data
const order = {
  id: 'ORD-123456',
  status: 'In Transit',
  currentStep: 2,
  timeline: [
    {
      id: '1',
      title: 'Order Placed',
      time: '2:30 PM',
      description: 'Your order has been confirmed',
      active: true,
    },
    {
      id: '2',
      title: 'Order Confirmed',
      time: '2:35 PM',
      description: 'The seller has confirmed your order',
      active: true,
    },
    {
      id: '3',
      title: 'In Transit',
      time: '3:00 PM',
      description: 'Your order is being delivered',
      active: true,
    },
    {
      id: '4',
      title: 'Delivered',
      time: 'Estimated 3:45 PM',
      description: 'Your order will be delivered',
      active: false,
    },
  ],
  delivery: {
    runner: {
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
    },
    estimatedTime: '3:45 PM',
    distance: '2.5 miles',
  },
};

export default function OrderTrackingScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContactRunner = () => {
    // TODO: Implement contact runner logic
    Alert.alert('Contact Runner', 'Calling runner...');
  };

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement cancel order logic
            Alert.alert('Success', 'Order cancelled successfully');
          },
        },
      ]
    );
  };

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />;
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>Track Order</Title>
          <OrderNumber>Order #{order.id}</OrderNumber>
        </Header>

        <StatusCard>
          <StatusHeader>
            <StatusIcon name="car" />
            <StatusText>{order.status}</StatusText>
          </StatusHeader>

          <Timeline>
            {order.timeline.map((item) => (
              <TimelineItem key={item.id}>
                <TimelineIcon active={item.active}>
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={item.active ? '#FFFFFF' : '#CCCCCC'}
                  />
                </TimelineIcon>
                <TimelineContent>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineTime>{item.time}</TimelineTime>
                  <TimelineDescription>{item.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </StatusCard>

        <DeliveryInfo>
          <SectionTitle>Delivery Information</SectionTitle>
          <InfoRow>
            <InfoLabel>Runner</InfoLabel>
            <InfoValue>{order.delivery.runner.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Phone</InfoLabel>
            <InfoValue>{order.delivery.runner.phone}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Rating</InfoLabel>
            <InfoValue>{order.delivery.runner.rating} / 5.0</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Estimated Delivery</InfoLabel>
            <InfoValue>{order.delivery.estimatedTime}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Distance</InfoLabel>
            <InfoValue>{order.delivery.distance}</InfoValue>
          </InfoRow>
        </DeliveryInfo>
      </Content>

      <Footer>
        <Button
          variant="primary"
          onPress={handleContactRunner}
          style={{ marginBottom: 8 }}
        >
          Contact Runner
        </Button>
        <Button variant="secondary" onPress={handleCancelOrder}>
          Cancel Order
        </Button>
      </Footer>
    </Container>
  );
} 