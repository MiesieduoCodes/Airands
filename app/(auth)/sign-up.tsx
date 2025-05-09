import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import InputField from '@/components/InputField'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import OAuth from '@/components/OAuth';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  interface FormState {
    name: string;
    email: string;
    username: string;
    password: string;
  }

  const handleInputChange = (name: keyof FormState, value: string): void => {
    setForm({ ...form, [name]: value });
  };

  const onSignUpPress = async () => {

  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={require('../assets/signup-header.png')} // Replace with your image
            className="z-0 w-full h-[250px]"
          />
          <Text className="text-2xl text-white font-bold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your full name"
            icon={() => <Icon name="user" size={20} color="#333" />} 
            value={form.name}
            onChangeText={(value: string) => handleInputChange('name', value)}
          />

          <InputField
            label="Username"
            placeholder="What can we call you?"
            icon={() => <Icon name="at" size={20} color="#333" />} 
            value={form.username}
            onChangeText={(value: string) => handleInputChange('username', value)}
          />

          <InputField
            label="Email"
            placeholder="Enter your email address"
            icon={() => <Icon name="envelope" size={20} color="#333" />} 
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value: string) => handleInputChange('email', value)}
          />

          <InputField
            label="Password"
            placeholder="Protect your airands"
            icon={() => <Icon name="lock" size={20} color="#333" />}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value: string) => handleInputChange('password', value)}
          />

          <CustomButton
          title="Join Airands"
          onPress={onSignUpPress}
          className='mt-6' 
          />

        <OAuth />

          <Link
          className='text-lg text-gray-700 text-center mt-10 '
          href="/sign-in">
            <Text>Already have an account? </Text>
            <Text className='text-secondary-600'>Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;