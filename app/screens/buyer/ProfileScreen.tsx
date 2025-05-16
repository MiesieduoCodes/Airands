import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

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

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const AvatarText = styled.Text`
  font-size: 40px;
  color: white;
  font-weight: bold;
`;

const Name = styled.Text`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Email = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
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

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Container>
      <Content>
        <ProfileHeader>
          <Avatar>
            <AvatarText>{getInitials(user?.name || '')}</AvatarText>
          </Avatar>
          <Name>{user?.name}</Name>
          <Email>{user?.email}</Email>
        </ProfileHeader>

        <Section>
          <SectionTitle>Account</SectionTitle>
          <MenuCard>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="person-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Edit Profile</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="location-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Addresses</MenuText>
              <MenuArrow name="chevron-forward" size={20} />
            </MenuItem>
            <MenuItem>
              <MenuIcon>
                <Ionicons name="card-outline" size={20} color="#8E8E93" />
              </MenuIcon>
              <MenuText>Payment Methods</MenuText>
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