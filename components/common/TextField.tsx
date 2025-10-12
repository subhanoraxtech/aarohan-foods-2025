import React, { ReactNode, useRef } from "react";
import {
  SizableText,
  Input as TamaguiInput,
  InputProps as TamaguiInputProps,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";

interface InputWithIconProps extends TamaguiInputProps {
  icon?: ReactNode;
  label?: string;
  error?: boolean;
  helperText?: string;
  gutterBottom?: boolean;
  prefix?: string; // New prop for country code
  style?: any;
}

const TextField = ({
  icon,
  placeholder = "Placeholder",
  label,
  error = false,
  helperText,
  gutterBottom = false,
  prefix,
  style,
  ...props
}: InputWithIconProps) => {
  const inputRef = useRef<any>(null);

  const handleFocus = () => {
    if (inputRef.current?.focus) {
      inputRef.current.focus();
    }
  };

  return (
    <View mb={gutterBottom ? "$2.5" : "$0"} style={style}>
      {label && (
        <Text fontSize={14} fontWeight="$5" color="$black1" pb={"$2"}>
          {label}
        </Text>
      )}
      <XStack
        onPress={handleFocus}
        items="center"
        borderWidth={1}
        borderColor={error ? "$red1" : "$gray8"}
        borderRadius={16}
        paddingHorizontal="$4"
        height={56}
        justifyContent="space-between"
        space="$2"
      >
        {prefix && (
          <XStack
            height="100%"
            alignItems="center"
            borderRightWidth={1}
            borderRightColor="$gray8"
            paddingRight="$2"
          >
            <Text fontSize={16} fontWeight="500" color="$gray3">
              {prefix}
            </Text>
          </XStack>
        )}
        <YStack flex={1}>
          <TamaguiInput
            ref={inputRef}
            placeholder={placeholder}
            unstyled
            fontSize={16}
            fontWeight="$5"
            color="$gray3"
            bg="transparent"
            p={0}
            m={0}
            {...props}
          />
        </YStack>
        {icon && icon}
      </XStack>

      {helperText && (
        <SizableText
          color={error ? "$red1" : "white"}
          fontWeight="$5"
          margin={"$1"}
        >
          {helperText}
        </SizableText>
      )}
    </View>
  );
};

export default TextField;
