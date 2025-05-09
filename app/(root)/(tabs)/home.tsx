import { Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-green-400">
      <Text className="text-red-500">Open Up App.js to start working on your app!</Text>
      <StatusBar
        backgroundColor="green" // Or any color you want
        barStyle="light-content" // Or 'dark-content'
        translucent={false} // Adjust as needed for your layout
      />
    </SafeAreaView>
  );
}