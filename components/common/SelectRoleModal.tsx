import React from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { theme } from "@/theme";

interface SelectRoleModalProps {
  isOpen: boolean;
  onClose: (selectedRole?: "supplier" | "delivery_agent") => void;
}

const SelectRoleModal = ({
  isOpen,
  onClose,
}: SelectRoleModalProps) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => onClose()}
    >
      <TouchableWithoutFeedback onPress={() => onClose()}>
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
                <Text variant="h3" weight="bold" color="text" align="center">
                  Select Your Role
                </Text>
              </View>

              <Text
                variant="body"
                align="center"
                color="gray10"
                px="md"
              >
                Please select your role to continue
              </Text>

              <View gap="md">
                <Button
                  variant="primary"
                  onPress={() => onClose("supplier")}
                  style={styles.button}
                >
                  Continue as Supplier
                </Button>

                <Button
                  variant="primary"
                  onPress={() => onClose("delivery_agent")}
                  style={[styles.button, { backgroundColor: theme.colors.info }]}
                >
                  Continue as Delivery Agent
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
  button: {
    width: "100%",
  },
});

export default SelectRoleModal;
