

import React from "react";
import { Button, Dialog, Text, XStack, YStack } from "tamagui";
import Icon from "./Icon"; 

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: (selectedRole?: 'supplier' | 'delivery_agent') => void;
}

const RoleSelectionModal = ({
  isOpen,
  onClose,
}: RoleSelectionModalProps) => {
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
          borderRadius="$4"
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
          padding="$4"
        >
          <XStack justifyContent="space-between" alignItems="center">
            <YStack flex={1} justifyContent="center" alignItems="center">
              <Text fontSize={24} fontWeight="700" color={"$black1"}>
                Select Your Role
              </Text>
            </YStack>
            <Icon
              type="material-community"
              name="close"
              size={24}
              color="$gray10"
              onPress={() => onClose()}
            />
          </XStack>

          <Text
            fontSize={16}
            fontWeight="400"
            color="$gray10"
            px={"$5"}
            textAlign="center"
          >
            Please select your role to continue
          </Text>

          <YStack space="$4">
            <Button
              bg="$orange"
              color="white"
              onPress={() => onClose('supplier')}
              size="$5"
            >
              Continue as Supplier
            </Button>

            <Button
              bg="$green10"
              color="white"
              onPress={() => onClose('delivery_agent')}
              size="$5"
            >
              Continue as Delivery Agent
            </Button>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default RoleSelectionModal;