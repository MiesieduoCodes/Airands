import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
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
`;

const CartItem = styled(Card)`
  margin: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const ItemHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ItemImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const ItemInfo = styled.View`
  flex: 1;
`;

const ItemName = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const ItemPrice = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const ItemActions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const QuantityButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  justify-content: center;
  align-items: center;
`;

const QuantityText = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 ${({ theme }) => theme.spacing.sm}px;
`;

const RemoveButton = styled.TouchableOpacity`
  margin-left: auto;
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const Summary = styled(Card)`
  margin: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
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
const cartItems = [
  {
    id: '1',
    name: 'Organic Apples',
    price: '$4.99',
    image: 'https://picsum.photos/400/400',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Fresh Bananas',
    price: '$3.99',
    image: 'https://picsum.photos/400/401',
    quantity: 1,
  },
  {
    id: '3',
    name: 'Whole Grain Bread',
    price: '$5.99',
    image: 'https://picsum.photos/400/402',
    quantity: 1,
  },
];

export default function CartScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState(cartItems);

  const handleQuantityChange = (id: string, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          if (newQuantity >= 1 && newQuantity <= 10) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const handleCheckout = () => {
    setLoading(true);
    // TODO: Implement checkout logic
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Proceeding to checkout');
    }, 1000);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon="cart-outline"
        title="Your cart is empty"
        message="Add some items to your cart to get started"
        actionLabel="Start Shopping"
        onAction={() => {
          // TODO: Navigate to products screen
        }}
      />
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>Shopping Cart</Title>
        </Header>

        {items.map((item) => (
          <CartItem key={item.id}>
            <ItemHeader>
              <ItemImage source={{ uri: item.image }} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}</ItemPrice>
              </ItemInfo>
            </ItemHeader>
            <ItemActions>
              <QuantityButton onPress={() => handleQuantityChange(item.id, -1)}>
                <Ionicons name="remove" size={20} color="#007AFF" />
              </QuantityButton>
              <QuantityText>{item.quantity}</QuantityText>
              <QuantityButton onPress={() => handleQuantityChange(item.id, 1)}>
                <Ionicons name="add" size={20} color="#007AFF" />
              </QuantityButton>
              <RemoveButton onPress={() => handleRemoveItem(item.id)}>
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
              </RemoveButton>
            </ItemActions>
          </CartItem>
        ))}

        <Summary>
          <SummaryRow>
            <SummaryLabel>Subtotal</SummaryLabel>
            <SummaryValue>${subtotal.toFixed(2)}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Delivery Fee</SummaryLabel>
            <SummaryValue>${deliveryFee.toFixed(2)}</SummaryValue>
          </SummaryRow>
          <TotalRow>
            <TotalLabel>Total</TotalLabel>
            <TotalValue>${total.toFixed(2)}</TotalValue>
          </TotalRow>
        </Summary>
      </Content>

      <Footer>
        <Button
          variant="primary"
          onPress={handleCheckout}
          disabled={loading}
        >
          Proceed to Checkout
        </Button>
      </Footer>
    </Container>
  );
} 