import React from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { theme } from "@/theme";
import Icon from "./Icon";

interface ErrorModalProps {
  modalTitle?: string;
  buttonTitle?: string;
  subTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal = ({
  isOpen,
  onClose,
  buttonTitle = "OK",
  subTitle,
  modalTitle = "Error",
}: ErrorModalProps) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
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
                  {modalTitle}
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
                    name="close"
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
                {subTitle}
              </Text>

              <Button
                variant="primary"
                onPress={onClose}
                style={[styles.button, { backgroundColor: theme.colors.red1 }]}
              >
                {buttonTitle}
              </Button>
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
    width: "100%",
  },
});

export default ErrorModal;
