import { View, Text, Image } from 'react-native'
import CustomButton from './CustomButton'

const OAuth = () =>{
    const handleGoogleSignIn = async () => {};
    return (
    <View>
       <View className='flex flex-row justify-center items-center mt-4 gap-x-3'>
        <View className='flex-1 h-[1px] bg-gray-300' />
        <Text className='text-lg'>Or</Text>
        <View className='flex-1 h-[1px] bg-gray-300' />
    </View>

    <CustomButton
                title="Log In with Google"
                textVariant='primary'
                bgVariant='outline'
                onPress={handleGoogleSignIn} 
                className='mt-5 w-full shadow-none'
                IconLeft={() => (
                    <Image
                        source={require('../assets/google.png')}
                        className='w-5 h-5 mx-2'
                        resizeMode='contain'
                       />)}
    />
    </View>
 
  )
}

export default OAuth