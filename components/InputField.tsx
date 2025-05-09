import { Image, Keyboard, Platform, TextInput } from "react-native";
import { Text, View } from "react-native";
import { KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";

interface InputFieldProps {
    label: string;
    labelStyle?: string;
    icon?: any; // Replace 'any' with the correct type for your icon
    placeholder?: string;
    secureTextEntry?: boolean;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
    [key: string]: any; // For additional props
}

const InputField = ({ 
    label,
    labelStyle,
    icon,
    placeholder,
    secureTextEntry = false,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props
    }: InputFieldProps) => (
<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className="my-2 w-full">
        <Text className={`text-lg font-Lato-Regular mb-3 ${labelStyle}`}>{label}</Text>
    <View className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-lg border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
        {icon && (
            <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`}/>
        )}
        <TextInput
            className={`rounded-full p-4 text-[15px] text-left flex-1 font-Lato-Regular ${inputStyle} ${className}`}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            {...props}
        />
    </View>
    </View>
    </TouchableWithoutFeedback>
</KeyboardAvoidingView>
)

export default InputField;