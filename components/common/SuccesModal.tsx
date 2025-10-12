//  React Imports
import React from "react";

//  Expo Imports

//  Tamagui Imports
import { Button, Dialog, Text, useTheme, XStack, YStack } from "tamagui";

//  Custom Components Imports

//  Utils Imports
import Icon from "./Icon";

interface SuccesModalProps {
  modalTitle?: string;
  buttonTitle?: string;
  subTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  buttonColor?: string; // Add this prop for button color
}

const SuccessModal = ({
  isOpen,
  onClose,
  buttonTitle,
  subTitle,
  modalTitle,
  buttonColor, // Default to orange
}: SuccesModalProps) => {
  const theme = useTheme();

  return (
    <Dialog modal open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          bg="$overlay"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ opacity: 0, scale: 0.95 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          bg="white"
          mx={"$6"}
          borderRadius={16}
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <YStack justify={"center"} items={"center"}>
            <Text fontSize={24} fontWeight="700" color={"$black1"}>
              {modalTitle}
            </Text>
          </YStack>
          <XStack justify={"center"} items={"center"}>
            <XStack
              justify={"center"}
              items={"center"}
              px={"$2"}
              py={"$2"}
              borderRadius={32}
              bg={"$green5"}
            >
              <Icon
                name="check"
                type="feather"
                size={40}
                color={theme.green10.val}
              />
            </XStack>
          </XStack>

          <Text
            fontSize={16}
            fontWeight="400"
            color="$slate1"
            px={"$5"}
            textAlign="center"
          >
            {subTitle}
          </Text>

          <Dialog.Close asChild>
            <Button 
              backgroundColor={buttonColor}
              color="white"
              onPress={onClose}
            >
              {buttonTitle}
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default SuccessModal;