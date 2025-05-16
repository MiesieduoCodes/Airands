import React from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled(ScrollView)`
  flex: 1;
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const SuccessIcon = styled(Ionicons)`
  font-size: 64px;
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  text-align: center;
`;

const OrderInfo = styled(Card)`
  margin: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const OrderNumber = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const OrderDetails = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const DetailRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const DetailLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const DetailValue = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
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

const AddressInfo = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const PaymentInfo = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
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
  date: 'March 20, 2024',
  time: '2:30 PM',
  status: 'Confirmed',
  items: [
    {
      name: 'Organic Apples',
      quantity: 2,
      price: '$4.99',
    },
    {
      name: 'Fresh Bananas',
      quantity: 1,
      price: '$3.99',
    },
    {
      name: 'Whole Grain Bread',
      quantity: 1,
      price: '$5.99',
    },
  ],
  subtotal: 25.97,
  deliveryFee: 2.99,
  tax: 2.90,
  total: 31.86,
  deliveryAddress: {
    type: 'Home',
    details: '123 Main St, Apt 4B\nNew York, NY 10001',
  },
  paymentMethod: {
    type: 'Credit Card',
    details: 'Visa ending in 4242',
  },
};

export default function OrderConfirmationScreen() {
  const handleTrackOrder = () => {
    // TODO: Navigate to order tracking screen
  };

  const handleContinueShopping = () => {
    // TODO: Navigate to home screen
  };

  return (
    <Container>
      <Content>
        <Header>
          <SuccessIcon name="checkmark-circle" />
          <Title>Order Confirmed!</Title>
          <Subtitle>
            Thank you for your order. We'll send you a confirmation email with
            your order details.
          </Subtitle>
        </Header>

        <OrderInfo>
          <OrderNumber>Order #{order.id}</OrderNumber>
          <OrderDetails>
            <DetailRow>
              <DetailLabel>Date</DetailLabel>
              <DetailValue>{order.date}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Time</DetailLabel>
              <DetailValue>{order.time}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Status</DetailLabel>
              <DetailValue>{order.status}</DetailValue>
            </DetailRow>
          </OrderDetails>

          <SectionTitle>Order Summary</SectionTitle>
          {order.items.map((item, index) => (
            <DetailRow key={index}>
              <DetailLabel>
                {item.quantity}x {item.name}
              </DetailLabel>
              <DetailValue>{item.price}</DetailValue>
            </DetailRow>
          ))}
          <DetailRow>
            <DetailLabel>Subtotal</DetailLabel>
            <DetailValue>${order.subtotal.toFixed(2)}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Delivery Fee</DetailLabel>
            <DetailValue>${order.deliveryFee.toFixed(2)}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Tax</DetailLabel>
            <DetailValue>${order.tax.toFixed(2)}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Total</DetailLabel>
            <DetailValue>${order.total.toFixed(2)}</DetailValue>
          </DetailRow>
        </OrderInfo>

        <DeliveryInfo>
          <SectionTitle>Delivery Information</SectionTitle>
          <AddressInfo>{order.deliveryAddress.details}</AddressInfo>
          <PaymentInfo>
            Paid with {order.paymentMethod.type} ({order.paymentMethod.details})
          </PaymentInfo>
        </DeliveryInfo>
      </Content>

      <Footer>
        <Button
          variant="primary"
          onPress={handleTrackOrder}
          style={{ marginBottom: 8 }}
        >
          Track Order
        </Button>
        <Button variant="secondary" onPress={handleContinueShopping}>
          Continue Shopping
        </Button>
      </Footer>
    </Container>
  );
} 