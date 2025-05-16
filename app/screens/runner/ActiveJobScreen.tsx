import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert } from 'react-native';
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

const MapContainer = styled.View`
  height: 200px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  justify-content: center;
  align-items: center;
`;

const MapPlaceholder = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

const StepContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const StepHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const StepIcon = styled.View<{ completed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ completed, theme }) =>
    completed ? theme.colors.success : theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const StepTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
`;

const StepContent = styled.View`
  margin-left: ${({ theme }) => theme.spacing.xl}px;
`;

const StepText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
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

const TimerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const TimerIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const TimerText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

// Mock data
const activeJob = {
  id: '1',
  orderNumber: '#ORD-001',
  seller: {
    name: 'Fresh Groceries',
    address: '123 Main St, City',
    phone: '+1 234 567 8900',
  },
  customer: {
    name: 'John Doe',
    address: '456 Oak Ave, City',
    phone: '+1 234 567 8901',
  },
  items: [
    { name: 'Organic Apples', quantity: 2 },
    { name: 'Whole Grain Bread', quantity: 1 },
  ],
  total: '$13.97',
  status: 'in_progress',
  currentStep: 'pickup',
  estimatedTime: '15 mins',
  startTime: '2024-03-20T10:00:00Z',
};

export default function ActiveJobScreen() {
  const [currentStep, setCurrentStep] = useState(activeJob.currentStep);

  const handleCompleteStep = (step: string) => {
    Alert.alert(
      'Complete Step',
      `Are you sure you want to mark the ${step} step as complete?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Complete',
          onPress: () => {
            // TODO: Implement step completion logic
            setCurrentStep(step === 'pickup' ? 'delivery' : 'completed');
          },
        },
      ]
    );
  };

  const handleCancelJob = () => {
    Alert.alert(
      'Cancel Job',
      'Are you sure you want to cancel this delivery job?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement job cancellation logic
            console.log('Cancel job');
          },
        },
      ]
    );
  };

  const getStepIcon = (step: string) => {
    switch (step) {
      case 'pickup':
        return 'basket-outline';
      case 'delivery':
        return 'location-outline';
      case 'completed':
        return 'checkmark-outline';
      default:
        return 'help-outline';
    }
  };

  const getStepTitle = (step: string) => {
    switch (step) {
      case 'pickup':
        return 'Pickup from Seller';
      case 'delivery':
        return 'Deliver to Customer';
      case 'completed':
        return 'Delivery Completed';
      default:
        return step;
    }
  };

  return (
    <Container>
      <Content>
        <MapContainer>
          <MapPlaceholder>Map View</MapPlaceholder>
        </MapContainer>

        <Card>
          <CardHeader>
            <CardTitle>{activeJob.orderNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <StepContainer>
              <StepHeader>
                <StepIcon completed={currentStep !== 'pickup'}>
                  <Ionicons
                    name={getStepIcon('pickup')}
                    size={20}
                    color="white"
                  />
                </StepIcon>
                <StepTitle>{getStepTitle('pickup')}</StepTitle>
              </StepHeader>
              <StepContent>
                <StepText>Seller: {activeJob.seller.name}</StepText>
                <LocationInfo>
                  <LocationIcon name="location-outline" size={16} />
                  <LocationText>{activeJob.seller.address}</LocationText>
                </LocationInfo>
                <LocationInfo>
                  <LocationIcon name="call-outline" size={16} />
                  <LocationText>{activeJob.seller.phone}</LocationText>
                </LocationInfo>
                {currentStep === 'pickup' && (
                  <Button
                    variant="primary"
                    size="small"
                    onPress={() => handleCompleteStep('pickup')}
                  >
                    Mark as Picked Up
                  </Button>
                )}
              </StepContent>
            </StepContainer>

            <StepContainer>
              <StepHeader>
                <StepIcon completed={currentStep === 'completed'}>
                  <Ionicons
                    name={getStepIcon('delivery')}
                    size={20}
                    color="white"
                  />
                </StepIcon>
                <StepTitle>{getStepTitle('delivery')}</StepTitle>
              </StepHeader>
              <StepContent>
                <StepText>Customer: {activeJob.customer.name}</StepText>
                <LocationInfo>
                  <LocationIcon name="location-outline" size={16} />
                  <LocationText>{activeJob.customer.address}</LocationText>
                </LocationInfo>
                <LocationInfo>
                  <LocationIcon name="call-outline" size={16} />
                  <LocationText>{activeJob.customer.phone}</LocationText>
                </LocationInfo>
                {currentStep === 'delivery' && (
                  <Button
                    variant="primary"
                    size="small"
                    onPress={() => handleCompleteStep('delivery')}
                  >
                    Mark as Delivered
                  </Button>
                )}
              </StepContent>
            </StepContainer>

            <TimerContainer>
              <TimerIcon name="time-outline" size={16} />
              <TimerText>Started: {new Date(activeJob.startTime).toLocaleTimeString()}</TimerText>
            </TimerContainer>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="small"
              onPress={handleCancelJob}
            >
              Cancel Job
            </Button>
          </CardFooter>
        </Card>
      </Content>
    </Container>
  );
} 