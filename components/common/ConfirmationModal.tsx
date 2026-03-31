import React from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { theme } from "@/theme";
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
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay} bg="rgba(0,0,0,0.5)">
          <TouchableWithoutFeedback>
            <View
              bg="white"
              p="xl"
              radius="lg"
              style={styles.content}
              gap="lg"
            >
              <View center>
                <Text variant="h3" weight="bold" color="text">
                  {deleteTitle}
                </Text>
              </View>

              <View center>
                <View
                  center
                  p="md"
                  radius="full"
                  bg="red5"
                  style={styles.iconContainer}
                >
                  <Icon
                    name="trash-2"
                    type="feather"
                    size={40}
                    color={theme.colors.red1}
                  />
                </View>
              </View>

              <Text
                variant="body"
                align="center"
                color="gray10"
                px="md"
              >
                {deleteMessage}
              </Text>

              <View row gap="md" justify="center">
                <Button
                  variant="secondary"
                  onPress={onCancel}
                  style={styles.button}
                >
                  No
                </Button>
                <Button
                  variant="primary"
                  onPress={onConfirm}
                  loading={loading}
                  style={[styles.button, { backgroundColor: theme.colors.red1 }]}
                >
                  Yes
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    ...theme.shadows.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
  },
  button: {
    flex: 1,
    minWidth: 100,
  },
});

export default ConfirmationDeleteModal;
