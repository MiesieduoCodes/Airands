import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// Import screens (we'll create these next)
import JobsScreen from '../screens/runner/JobsScreen';
import ActiveJobScreen from '../screens/runner/ActiveJobScreen';
import HistoryScreen from '../screens/runner/HistoryScreen';
import ProfileScreen from '../screens/runner/ProfileScreen';

export type RunnerTabParamList = {
  Jobs: undefined;
  ActiveJob: undefined;
  History: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RunnerTabParamList>();

export const RunnerTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabBarInactive,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ActiveJob"
        component={ActiveJobScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="navigate" size={size} color={color} />
          ),
          title: 'Active Job',
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 