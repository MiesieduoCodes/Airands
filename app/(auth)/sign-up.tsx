import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import InputField from '@/components/InputField'

const signup = () => {
  const [form, setForm] = useState({
    name:'',
    email:'',
    username:'',
    phone:'',
    password:'',
  })
  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image
          // source={}
          className='z-0 w-full h-[250px]'
          />
          <Text className='text-2xl text-black font-Lato-Bold absolute bottom-5 left-5'>Create Your Account</Text>
        </View>
        <View className='p-5'>
          <InputField
          label="Username"
          placeholder = "What Can We Call You?"
          icon="user"
          value={form.username}
          onChangeText={(value) => setForm({ ...form, username: value })}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default signup