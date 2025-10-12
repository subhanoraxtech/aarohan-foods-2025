import { useRouter } from "expo-router";
import React from "react";
import { Text, useTheme, XStack } from "tamagui";
import Icon from "../common/Icon";
import Button from "./Button";

export interface HeaderProps {
  title?: string;
  onBack?: boolean;
  rightIcon?: any;
  onBackPress?: any;
}

const Header = ({
  title,
  onBack = true,
  rightIcon,
  onBackPress,
}: HeaderProps) => {
  const theme = useTheme();
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <XStack
      alignItems="center"
      justifyContent="center"
      py="$3"
      position="relative"
    >
      {/* Back Button - positioned absolutely to the left */}
      {onBack && (
        <XStack position="absolute" left="$3">
          <Button
            icon={<Icon name="angle-left" type="font-awesome" size={30} />}
            bg="$grey1"
            size="$3.5"
            onPress={handleBack}
          />
        </XStack>
      )}

      {/* Title in center */}
      {title && (
        <Text fontSize={20} fontWeight="$5" color="$gray3">
          {title}
        </Text>
      )}

      {rightIcon && (
        <XStack position="absolute" r="$3">
          {rightIcon}
        </XStack>
      )}
    </XStack>
  );
};

export default Header;
