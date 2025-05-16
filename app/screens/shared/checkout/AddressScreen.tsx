import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { LoadingState } from '../../../components/ui/LoadingState';
import { ErrorState } from '../../../components/ui/ErrorState';

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
`;

const AddressCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const AddressHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const AddressTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const AddressType = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`;

const AddressDetails = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const AddressActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const ActionText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const AddAddressButton = styled(Button)`
  margin: ${({ theme }) => theme.spacing.md}px;
`;

const Footer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

// Mock data
const addresses = [
  {
    id: '1',
    type: 'Home',
    title: 'Home Address',
    details: '123 Main St, Apt 4B\nNew York, NY 10001',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Work',
    title: 'Office Address',
    details: '456 Business Ave, Suite 100\nNew York, NY 10002',
    isDefault: false,
  },
];

export default function AddressScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleAddressSelect = (id: string) => {
    setSelectedAddress(id);
  };

  const handleEditAddress = (id: string) => {
    // TODO: Navigate to edit address screen
    Alert.alert('Edit Address', 'Navigate to edit address screen');
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete address logic
            Alert.alert('Success', 'Address deleted successfully');
          },
        },
      ]
    );
  };

  const handleAddAddress = () => {
    // TODO: Navigate to add address screen
    Alert.alert('Add Address', 'Navigate to add address screen');
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a delivery address');
      return;
    }

    setLoading(true);
    // TODO: Implement continue to payment logic
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Proceeding to payment');
    }, 1000);
  };

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />;
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>Delivery Address</Title>
        </Header>

        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            onPress={() => handleAddressSelect(address.id)}
            style={{
              borderColor:
                selectedAddress === address.id
                  ? '#007AFF'
                  : 'transparent',
              borderWidth: 2,
            }}
          >
            <AddressHeader>
              <AddressTitle>{address.title}</AddressTitle>
              <AddressType>{address.type}</AddressType>
            </AddressHeader>
            <AddressDetails>{address.details}</AddressDetails>
            <AddressActions>
              <ActionButton onPress={() => handleEditAddress(address.id)}>
                <Ionicons name="pencil" size={20} color="#007AFF" />
                <ActionText>Edit</ActionText>
              </ActionButton>
              <ActionButton onPress={() => handleDeleteAddress(address.id)}>
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                <ActionText>Delete</ActionText>
              </ActionButton>
            </AddressActions>
          </AddressCard>
        ))}

        <AddAddressButton
          variant="secondary"
          onPress={handleAddAddress}
          icon="add"
        >
          Add New Address
        </AddAddressButton>
      </Content>

      <Footer>
        <Button
          variant="primary"
          onPress={handleContinue}
          disabled={loading || !selectedAddress}
        >
          Continue to Payment
        </Button>
      </Footer>
    </Container>
  );
} 