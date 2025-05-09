import { onboarding } from '@/constants';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper'; // Import the Swiper component

const Onboarding = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="h-full flex items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace('/(auth)/sign-up');
        }}
        className="w-full flex justify-end items-end p-6"
      >
        <Text className="text-black text-end font-Lato-Bold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#88FA41] " />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0CFA14] rounded-full" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 items-center justify-center p-5">
            <Image
              source={item.image} // Make sure this is a valid URI or require()
              className="w-full h-[300px] object-contain"
              resizeMode="contain"
            />
            <View className="flex items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl mx-10 text-center font-Lato-Bold">
                {item.title}
              </Text>
            </View>
            <Text className="text-gray-800 mt-3 text-lg mx-10 text-center font-Lato-Regular">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default Onboarding;