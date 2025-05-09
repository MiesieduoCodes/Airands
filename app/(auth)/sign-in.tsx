import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import InputField from '@/components/InputField'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import OAuth from '@/components/OAuth';

const Signin = () => {
  const [form, setForm] = useState({
    usernameOrEmail: '',
    password: '',
  });

  interface FormState {
    name: string;
    email: string;
    usernameOrEmail: string;
    username: string;
    password: string;
  }

  const handleInputChange = (name: keyof FormState, value: string): void => {
    setForm({ ...form, [name]: value });
  };

  const onSignInPress = async () => {

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
            Welcome Back 👋🏾
          </Text>
        </View>
        <View className="p-5">

        <InputField
            label="Email or Username"
            placeholder="Enter your email or username"
            icon={() => <Icon name="user" size={20} color="#333" />} // Choose an appropriate icon
            value={form.usernameOrEmail}
            onChangeText={(value: string) => handleInputChange('usernameOrEmail', value)}
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
          title="Sign In"
          onPress={onSignInPress}
          className='mt-6' 
          />

        <OAuth />

          <Link
          className='text-lg text-gray-700 text-center mt-10 '
          href="/sign-up">
            <Text>New To Airands? </Text>
            <Text className='text-secondary-600'>Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signin;