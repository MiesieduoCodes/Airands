import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { Rating } from './Rating';

const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ProductInfo = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const ProductName = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const ProductDescription = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const StockStatus = styled.Text<{ inStock: boolean }>`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ inStock, theme }) => inStock ? theme.colors.success : theme.colors.error};
`;

const SellerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const SellerAvatar = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;

const SellerName = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  inStock: boolean;
  seller: {
    name: string;
    avatar: string;
  };
  onPress?: () => void;
}

export function ProductCard({
  name,
  description,
  price,
  image,
  rating,
  inStock,
  seller,
  onPress,
}: ProductCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <ProductImage source={{ uri: image }} />
        <ProductInfo>
          <ProductName>{name}</ProductName>
          <ProductDescription>{description}</ProductDescription>
          <PriceContainer>
            <Price>{price}</Price>
            <StockStatus inStock={inStock}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </StockStatus>
          </PriceContainer>
          <Rating value={rating} />
          <SellerInfo>
            <SellerAvatar source={{ uri: seller.avatar }} />
            <SellerName>{seller.name}</SellerName>
          </SellerInfo>
        </ProductInfo>
      </Card>
    </TouchableOpacity>
  );
} 