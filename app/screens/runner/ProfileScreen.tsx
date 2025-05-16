import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert, Switch } from 'react-native';
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

const ProfileHeader = styled.View`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const AvatarText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.h1.fontSize}px;
  font-weight: bold;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Email = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const StatItem = styled.View`
  flex: 1;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin: 0 ${({ theme }) => theme.spacing.xs}px;
`;

const StatValue = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const StatLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
`;

const Section = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const MenuItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const MenuItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MenuIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const MenuText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

const MenuValue = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

// Mock data
const runner = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  stats: {
    totalDeliveries: 156,
    totalEarnings: 2345.67,
    rating: 4.8,
  },
  preferences: {
    darkMode: true,
    notifications: true,
    autoAccept: false,
  },
};

export default function ProfileScreen() {
  const [preferences, setPreferences] = useState(runner.preferences);

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
          onPress: () => {
            // TODO: Implement sign out logic
            console.log('Sign out');
          },
        },
      ]
    );
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Container>
      <Content>
        <ProfileHeader>
          <Avatar>
            <AvatarText>{runner.name.charAt(0)}</AvatarText>
          </Avatar>
          <Name>{runner.name}</Name>
          <Email>{runner.email}</Email>
        </ProfileHeader>

        <StatsContainer>
          <StatItem>
            <StatValue>{runner.stats.totalDeliveries}</StatValue>
            <StatLabel>Deliveries</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>${runner.stats.totalEarnings}</StatValue>
            <StatLabel>Earnings</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{runner.stats.rating}</StatValue>
            <StatLabel>Rating</StatLabel>
          </StatItem>
        </StatsContainer>

        <Section>
          <SectionTitle>Account</SectionTitle>
          <MenuItem>
            <MenuItemLeft>
              <MenuIcon name="person-outline" size={24} />
              <MenuText>Edit Profile</MenuText>
            </MenuItemLeft>
            <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
          </MenuItem>
          <MenuItem>
            <MenuItemLeft>
              <MenuIcon name="card-outline" size={24} />
              <MenuText>Payment Methods</MenuText>
            </MenuItemLeft>
            <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
          </MenuItem>
          <MenuItem>
            <MenuItemLeft>
              <MenuIcon name="document-text-outline" size={24} />
              <MenuText>Documents</MenuText>
            </MenuItemLeft>
            <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
          </MenuItem>
        </Section>

        <Section>
          <SectionTitle>Preferences</SectionTitle>
          <MenuItem>
            <MenuItemLeft>
              <MenuIcon name="moon-outline" size={24} />
              <MenuText>Dark Mode</MenuText>
            </MenuItemLeft>
            <Switch
              value={preferences.darkMode}
              onValueChange={() => togglePreference('darkMode')}
            />
          </MenuItem>
          <MenuItem>
            <MenuItemLeft>
              <MenuIcon name="notifications-outline" size={24} />
              <MenuText>Notifications</MenuText>
            </MenuItemLeft>
            <Switch
              value={preferences.notifications}
              onValueChange={() => togglePreference('notifications')}
            />
          </MenuItem>
          <MenuItem>
            <MenuItemLeft>
              <MenuIcon name="flash-outline" size={24} />
              <MenuText>Auto-Accept Jobs</MenuText>
            </MenuItemLeft>
            <Switch
              value={preferences.autoAccept}
              onValueChange={() => togglePreference('autoAccept')}
            />
          </MenuItem>
        </Section>

        <Section>
          <SectionTitle>Support</SectionTitle>
          <MenuItem>
            <MenuItemLeft>
              <MenuIcon name="help-circle-outline" size={24} />
              <MenuText>Help Center</MenuText>
            </MenuItemLeft>
            <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
          </MenuItem>
          <MenuItem>
            <MenuItemLeft>
              <MenuIcon name="information-circle-outline" size={24} />
              <MenuText>About</MenuText>
            </MenuItemLeft>
            <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
          </MenuItem>
        </Section>

        <Button
          variant="secondary"
          onPress={handleSignOut}
          style={{ marginTop: 20 }}
        >
          Sign Out
        </Button>
      </Content>
    </Container>
  );
} 