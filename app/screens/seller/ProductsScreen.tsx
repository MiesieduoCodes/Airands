import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, RefreshControl, Alert } from 'react-native';
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

const ProductCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ProductInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProductDetails = styled.View`
  flex: 1;
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

const ProductPrice = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const ProductStock = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const ProductActions = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const ActionButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.xs}px;
`;

// Mock data
const products = [
  {
    id: '1',
    name: 'Organic Apples',
    description: 'Fresh organic apples from local farms',
    price: '$4.99',
    stock: 50,
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    name: 'Whole Grain Bread',
    description: 'Freshly baked whole grain bread',
    price: '$3.99',
    stock: 25,
    image: 'https://picsum.photos/200/301',
  },
  {
    id: '3',
    name: 'Free Range Eggs',
    description: 'Dozen free range eggs',
    price: '$5.99',
    stock: 30,
    image: 'https://picsum.photos/200/302',
  },
];

export default function ProductsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'in_stock' | 'low_stock'>('all');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleEditProduct = (productId: string) => {
    // TODO: Navigate to edit product screen
    console.log('Edit product:', productId);
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete logic
            console.log('Delete product:', productId);
          },
        },
      ]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'in_stock' && product.stock > 0) ||
      (activeFilter === 'low_stock' && product.stock <= 10);

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
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={<Ionicons name="search" size={20} color="#8E8E93" />}
            />
          </SearchContainer>
          <Button variant="primary">
            <Ionicons name="add" size={20} color="white" />
          </Button>
        </Header>

        <FilterContainer>
          <FilterButton
            variant={activeFilter === 'all' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton
            variant={activeFilter === 'in_stock' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('in_stock')}
          >
            In Stock
          </FilterButton>
          <FilterButton
            variant={activeFilter === 'low_stock' ? 'primary' : 'secondary'}
            onPress={() => setActiveFilter('low_stock')}
          >
            Low Stock
          </FilterButton>
        </FilterContainer>

        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage source={{ uri: product.image }} />
            <ProductInfo>
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price}</ProductPrice>
                <ProductStock>In Stock: {product.stock}</ProductStock>
              </ProductDetails>
              <ProductActions>
                <ActionButton
                  variant="secondary"
                  size="small"
                  onPress={() => handleEditProduct(product.id)}
                >
                  <Ionicons name="pencil" size={20} color="white" />
                </ActionButton>
                <ActionButton
                  variant="outline"
                  size="small"
                  onPress={() => handleDeleteProduct(product.id)}
                >
                  <Ionicons name="trash" size={20} color="#FF3B30" />
                </ActionButton>
              </ProductActions>
            </ProductInfo>
          </ProductCard>
        ))}
      </Content>
    </Container>
  );
} 