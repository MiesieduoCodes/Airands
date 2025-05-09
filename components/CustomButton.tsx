import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

interface ButtonProps {
    bgVariant?: "primary" | "secondary" | "danger" | "warning" | "success" | "outline" | "default";
    title: string;
    onPress: () => void;
    className?: string;
    textVariant?: string;
}

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) =>{
    switch (variant) {
        case "primary":
            return "bg-[#0CFA14]"
        case "secondary":
            return "bg-[#88FA41]"
        case "danger":
            return "bg-[#FF0000]"
        case "warning":
            return "bg-[#FFA500]"
        case "success":
            return "bg-[#00FF00]"
        case "default":
            return "bg-[#0cfa14]"    
        case "outline":
            return "bg-transparent border-neutral-300 border-[0.5px]"
    }};

const getTextVariantStyle = (variant: string) => {
    switch (variant) {
        case "default":
            return "text-black";
        case "secondary":
            return "text-gray-300";
        case "danger":
            return "text-red-300";
        case "success":
            return "text-green-300";
        default:
            return "text-white";
    }
};

const CustomButton = ({
onPress,
title,
bgVariant = "secondary" ,
textVariant = "default", 
className, 
IconLeft, 
IconRight,...props}: ButtonProps & { IconLeft?: React.ComponentType; IconRight?: React.ComponentType }) => 

<TouchableOpacity onPress={onPress}
    className={`w-full h-[60px] flex-row items-center justify-center rounded-full shadow-md shadow-neutral-400/700 ${getBgVariantStyle(bgVariant)} ${className}`} {...props}>
    {IconLeft && <IconLeft />}
    <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
    {IconRight && <IconRight />}
</TouchableOpacity>

export default CustomButton;