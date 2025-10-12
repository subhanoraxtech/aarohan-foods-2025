import React from "react";
import { Button, Dialog, Text, YStack } from "tamagui";

interface SelectRoleModalProps {
  isOpen: boolean;
  onClose: (selectedRole?: 'supplier' | 'delivery_agent') => void;
}

const SelectRoleModal = ({
  isOpen,
  onClose,
}: SelectRoleModalProps) => {
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
          mx="$6"
          br="$4"
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
          p="$4"
        >
          <YStack space m="$2">
            <Text fontSize={24} fontWeight="700" color="$black1" style={{ textAlign: 'center' }}>
              Select Your Role
            </Text>
          </YStack>

          <Text
            fontSize={16}
            fontWeight="400"
            color="$slate1"
            style={{ textAlign: 'center' }}
          >
            Please select your role to continue
          </Text>

          <YStack space="$4">
            <Button
              bg="$orange1"
              color="white"
              onPress={() => onClose('supplier')}
              size="$5"
            >
              Continue as Supplier
            </Button>

            <Button
              bg="$blue1"
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

export default SelectRoleModal;
