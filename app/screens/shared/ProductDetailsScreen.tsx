import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Rating } from '../../components/ui/Rating';
import { ImageCarousel } from '../../components/ui/ImageCarousel';
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
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Price = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Description = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const SellerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const SellerAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const SellerName = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const Section = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ReviewItem = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const ReviewHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const ReviewerName = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const ReviewDate = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const ReviewText = styled.Text`
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

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const QuantityButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.card};
  justify-content: center;
  align-items: center;
`;

const QuantityText = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 ${({ theme }) => theme.spacing.md}px;
`;

// Mock data
const product = {
  id: '1',
  name: 'Organic Apples',
  description: 'Fresh organic apples from local farms. Grown without pesticides and harvested at peak ripeness for maximum flavor and nutrition.',
  price: '$4.99',
  images: [
    'https://picsum.photos/400/400',
    'https://picsum.photos/400/401',
    'https://picsum.photos/400/402',
  ],
  rating: 4.5,
  reviewCount: 128,
  seller: {
    name: 'Fresh Groceries',
    avatar: 'https://picsum.photos/100/100',
    rating: 4.8,
  },
  reviews: [
    {
      id: '1',
      user: {
        name: 'John Doe',
        avatar: 'https://picsum.photos/50/50',
      },
      rating: 5,
      comment: 'Best apples I\'ve ever had! Very fresh and juicy.',
      date: '2024-03-19',
    },
    {
      id: '2',
      user: {
        name: 'Jane Smith',
        avatar: 'https://picsum.photos/51/51',
      },
      rating: 4,
      comment: 'Good quality apples, but a bit expensive.',
      date: '2024-03-18',
    },
  ],
};

export default function ProductDetailsScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setLoading(true);
    // TODO: Implement add to cart logic
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Product added to cart');
    }, 1000);
  };

  const handleBuyNow = () => {
    setLoading(true);
    // TODO: Implement buy now logic
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Proceeding to checkout');
    }, 1000);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />;
  }

  return (
    <Container>
      <Content>
        <ImageCarousel images={product.images} />
        <Header>
          <Title>{product.name}</Title>
          <Price>{product.price}</Price>
          <Rating value={product.rating} reviewCount={product.reviewCount} />
          <Description>{product.description}</Description>
          <SellerInfo>
            <SellerAvatar source={{ uri: product.seller.avatar }} />
            <SellerName>{product.seller.name}</SellerName>
          </SellerInfo>
        </Header>

        <Section>
          <SectionTitle>Reviews</SectionTitle>
          {product.reviews.map((review) => (
            <ReviewItem key={review.id}>
              <ReviewHeader>
                <ReviewerName>{review.user.name}</ReviewerName>
                <ReviewDate>{review.date}</ReviewDate>
              </ReviewHeader>
              <Rating value={review.rating} size={16} />
              <ReviewText>{review.comment}</ReviewText>
            </ReviewItem>
          ))}
        </Section>
      </Content>

      <Footer>
        <QuantityContainer>
          <QuantityButton onPress={() => handleQuantityChange(-1)}>
            <Ionicons name="remove" size={24} color="#007AFF" />
          </QuantityButton>
          <QuantityText>{quantity}</QuantityText>
          <QuantityButton onPress={() => handleQuantityChange(1)}>
            <Ionicons name="add" size={24} color="#007AFF" />
          </QuantityButton>
        </QuantityContainer>
        <Button
          variant="primary"
          onPress={handleAddToCart}
          disabled={loading}
          style={{ marginBottom: 8 }}
        >
          Add to Cart
        </Button>
        <Button
          variant="secondary"
          onPress={handleBuyNow}
          disabled={loading}
        >
          Buy Now
        </Button>
      </Footer>
    </Container>
  );
} 