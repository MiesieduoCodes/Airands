import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, RefreshControl } from 'react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled(ScrollView)`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const SearchContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Section = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const FeaturedScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-horizontal: -${({ theme }) => theme.spacing.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const FeaturedCard = styled(Card)`
  width: 280px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const SellerImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const SellerName = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const SellerDescription = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const QuickSearchContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const QuickSearchButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  flex-direction: row;
  align-items: center;
`;

const QuickSearchText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

// Mock data
const featuredSellers = [
  {
    id: '1',
    name: 'Fresh Groceries',
    description: 'Fresh fruits and vegetables',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    name: 'Bakery Delights',
    description: 'Freshly baked bread and pastries',
    image: 'https://picsum.photos/200/301',
  },
  {
    id: '3',
    name: 'Organic Market',
    description: 'Organic and natural products',
    image: 'https://picsum.photos/200/302',
  },
];

const quickSearches = [
  { id: '1', text: 'Groceries', icon: 'basket-outline' },
  { id: '2', text: 'Restaurants', icon: 'restaurant-outline' },
  { id: '3', text: 'Pharmacy', icon: 'medical-outline' },
  { id: '4', text: 'Electronics', icon: 'phone-portrait-outline' },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Container>
      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SearchContainer>
          <Input
            placeholder="Search for sellers or products..."
            leftIcon={<Ionicons name="search" size={20} color="#8E8E93" />}
          />
        </SearchContainer>

        <Section>
          <SectionTitle>Featured Sellers</SectionTitle>
          <FeaturedScroll>
            {featuredSellers.map((seller) => (
              <FeaturedCard key={seller.id}>
                <SellerImage source={{ uri: seller.image }} />
                <SellerName>{seller.name}</SellerName>
                <SellerDescription>{seller.description}</SellerDescription>
              </FeaturedCard>
            ))}
          </FeaturedScroll>
        </Section>

        <Section>
          <SectionTitle>Quick Search</SectionTitle>
          <QuickSearchContainer>
            {quickSearches.map((search) => (
              <QuickSearchButton key={search.id}>
                <Ionicons name={search.icon as any} size={20} color="#8E8E93" />
                <QuickSearchText>{search.text}</QuickSearchText>
              </QuickSearchButton>
            ))}
          </QuickSearchContainer>
        </Section>
      </Content>
    </Container>
  );
} 