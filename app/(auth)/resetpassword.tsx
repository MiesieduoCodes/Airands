import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import InputField from '@/components/InputField'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CustomButton from '@/components/CustomButton';

const ResetPass = () => {
  const [form, setForm] = useState({
    usernameOrEmail: '',
  });

  interface FormState {
    usernameOrEmail: string;
  }

  const handleInputChange = (name: keyof FormState, value: string): void => {
    setForm({ ...form, [name]: value });
  };

  const onResetPasswordPress = async () => {

  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={require('../assets/signup-header.png')} // Replace with your image
            className="z-0 w-full h-[250px]"
          />
          <Text className="text-2xl text-white font-bold absolute bottom-5 left-5">
            Reset Password
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


          <CustomButton
          title="Send Email Link"
          onPress={onResetPasswordPress}
          className='mt-6' 
          />

        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPass;