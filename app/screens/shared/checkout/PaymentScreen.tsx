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

const PaymentCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const PaymentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const PaymentType = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const PaymentIcon = styled(Ionicons)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const PaymentDetails = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const PaymentActions = styled.View`
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

const AddPaymentButton = styled(Button)`
  margin: ${({ theme }) => theme.spacing.md}px;
`;

const OrderSummary = styled(Card)`
  margin: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const SummaryTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const SummaryLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const SummaryValue = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const TotalRow = styled(SummaryRow)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

const TotalLabel = styled(SummaryLabel)`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  opacity: 1;
`;

const TotalValue = styled(SummaryValue)`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Footer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

// Mock data
const paymentMethods = [
  {
    id: '1',
    type: 'Credit Card',
    icon: 'card-outline',
    details: 'Visa ending in 4242\nExpires 12/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'PayPal',
    icon: 'logo-paypal',
    details: 'john.doe@example.com',
    isDefault: false,
  },
];

const orderSummary = {
  subtotal: 25.97,
  deliveryFee: 2.99,
  tax: 2.90,
  total: 31.86,
};

export default function PaymentScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handlePaymentSelect = (id: string) => {
    setSelectedPayment(id);
  };

  const handleEditPayment = (id: string) => {
    // TODO: Navigate to edit payment screen
    Alert.alert('Edit Payment', 'Navigate to edit payment screen');
  };

  const handleDeletePayment = (id: string) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete payment logic
            Alert.alert('Success', 'Payment method deleted successfully');
          },
        },
      ]
    );
  };

  const handleAddPayment = () => {
    // TODO: Navigate to add payment screen
    Alert.alert('Add Payment', 'Navigate to add payment screen');
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    setLoading(true);
    // TODO: Implement place order logic
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Order placed successfully');
    }, 1000);
  };

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />;
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>Payment Method</Title>
        </Header>

        {paymentMethods.map((payment) => (
          <PaymentCard
            key={payment.id}
            onPress={() => handlePaymentSelect(payment.id)}
            style={{
              borderColor:
                selectedPayment === payment.id
                  ? '#007AFF'
                  : 'transparent',
              borderWidth: 2,
            }}
          >
            <PaymentHeader>
              <PaymentType>{payment.type}</PaymentType>
              <PaymentIcon name={payment.icon} />
            </PaymentHeader>
            <PaymentDetails>{payment.details}</PaymentDetails>
            <PaymentActions>
              <ActionButton onPress={() => handleEditPayment(payment.id)}>
                <Ionicons name="pencil" size={20} color="#007AFF" />
                <ActionText>Edit</ActionText>
              </ActionButton>
              <ActionButton onPress={() => handleDeletePayment(payment.id)}>
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                <ActionText>Delete</ActionText>
              </ActionButton>
            </PaymentActions>
          </PaymentCard>
        ))}

        <AddPaymentButton
          variant="secondary"
          onPress={handleAddPayment}
          icon="add"
        >
          Add New Payment Method
        </AddPaymentButton>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <SummaryLabel>Subtotal</SummaryLabel>
            <SummaryValue>${orderSummary.subtotal.toFixed(2)}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Delivery Fee</SummaryLabel>
            <SummaryValue>${orderSummary.deliveryFee.toFixed(2)}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Tax</SummaryLabel>
            <SummaryValue>${orderSummary.tax.toFixed(2)}</SummaryValue>
          </SummaryRow>
          <TotalRow>
            <TotalLabel>Total</TotalLabel>
            <TotalValue>${orderSummary.total.toFixed(2)}</TotalValue>
          </TotalRow>
        </OrderSummary>
      </Content>

      <Footer>
        <Button
          variant="primary"
          onPress={handlePlaceOrder}
          disabled={loading || !selectedPayment}
        >
          Place Order
        </Button>
      </Footer>
    </Container>
  );
} 