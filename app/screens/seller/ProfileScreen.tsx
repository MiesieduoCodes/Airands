import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled(ScrollView)`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const ProfileHeader = styled.View`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const StoreImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const StoreName = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const StoreDescription = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const StoreStats = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl}px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatValue = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const StatLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const Section = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const MenuCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const MenuIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.card};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const MenuText = styled.Text`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

const MenuArrow = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
`;

// Mock data
const storeStats = [
  { label: 'Products', value: '45' },
  { label: 'Orders', value: '128' },
  { label: 'Rating', value: '4.8' },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [storeName, setStoreName] = useState('Fresh Groceries');
  const [storeDescription, setStoreDescription] = useState('Your one-stop shop for fresh and organic groceries');

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: signOut,
        },
      ]
    );
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSaveProfile = () => {
    // TODO: Implement save profile logic
    setIsEditing(false);
  };

  return (
    <Container>
      <Content>
        <ProfileHeader>
          <StoreImage source={{ uri: 'https://picsum.photos/200/200' }} />
          {isEditing ? (
            <>
              <Input
                value={storeName}
                onChangeText={setStoreName}
                placeholder="Store Name"
                style={{ marginBottom: 8 }}
              />
              <Input
                value={storeDescription}
                onChangeText={setStoreDescription}
                placeholder="Store Description"
                multiline
                numberOfLines={3}
                style={{ marginBottom: 16 }}
              />
              <Button variant="primary" onPress={handleSaveProfile}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <StoreName>{storeName}</StoreName>
              <StoreDescription>{storeDescription}</StoreDescription>
              <Button variant="outline" onPress={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </ProfileHeader>

        <StoreStats>
          {storeStats.map((stat, index) => (
            <StatItem key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StoreStats>

        <Section>
          <SectionTitle>Store Settings</SectionTitle>
          <MenuCard>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="time-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Business Hours</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="location-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Delivery Areas</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="card-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Payment Settings</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
          </MenuCard>
        </Section>

        <Section>
          <SectionTitle>Preferences</SectionTitle>
          <MenuCard>
            <MenuItem onPress={handleThemeToggle}>
              <MenuIcon>
                <Ionicons
                  name={theme === 'light' ? 'sunny-outline' : 'moon-outline'}
                  size={20}
                  color="#8E8E93"
                />
              </MenuIcon>
              <MenuText>Dark Mode</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="notifications-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Notifications</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="language-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Language</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
          </MenuCard>
        </Section>

        <Section>
          <SectionTitle>Support</SectionTitle>
          <MenuCard>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="help-circle-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Help Center</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="document-text-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Terms & Privacy</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
          </MenuCard>
        </Section>

        <Button variant="outline" onPress={handleSignOut}>
          Sign Out
        </Button>
      </Content>
    </Container>
  );
} 