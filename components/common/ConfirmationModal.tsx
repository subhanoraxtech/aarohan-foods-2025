import React from "react";
import {
  Button,
  Dialog,
  Text,
  useTheme,
  XStack,
  YStack,
  Spinner,
} from "tamagui";
import Icon from "./Icon";

interface ConfirmationDeleteModalProps {
  deleteTitle?: string;
  loading?: boolean;
  deleteMessage?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDeleteModal = ({
  isOpen,
  onConfirm,
  onCancel,
  deleteTitle = "Confirm Deletion",
  loading = false,
  deleteMessage = "Are you sure you want to delete this item? This action cannot be undone.",
}: ConfirmationDeleteModalProps) => {
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
              {deleteTitle}
            </Text>
          </YStack>
          <XStack justify={"center"} items={"center"}>
            <XStack
              justify={"center"}
              items={"center"}
              px={"$2"}
              py={"$2"}
              borderRadius={32}
              bg={"$red5"}
            >
              <Icon
                name="trash-2"
                type="feather"
                size={40}
                color={theme.red10.val}
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
            {deleteMessage}
          </Text>

          <XStack gap="$3" justifyContent="center">
            <Dialog.Close asChild>
              <Button onPress={onCancel} backgroundColor="$grey5">
                No
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                onPress={onConfirm}
                backgroundColor="$red10"
                color="white"
                disabled={loading}
                opacity={loading ? 0.6 : 1}
              >
                {loading ? <Spinner size="small" color="white" /> : "Yes"}
              </Button>
            </Dialog.Close>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default ConfirmationDeleteModal;
