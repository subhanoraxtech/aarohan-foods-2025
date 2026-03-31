import React from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { theme } from "@/theme";
import Icon from "./Icon";

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: (selectedRole?: "supplier" | "delivery_agent" | "security") => void;
}

const RoleSelectionModal = ({
  isOpen,
  onClose,
}: RoleSelectionModalProps) => {
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
              <View row justify="space-between" align="center">
                <View flex center>
                  <Text variant="h3" weight="bold" color="text">
                    Select Your Role
                  </Text>
                </View>
                <Icon
                  type="material-community"
                  name="close"
                  size={24}
                  color={theme.colors.gray10}
                  onPress={() => onClose()}
                />
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
                  style={[styles.button, { backgroundColor: theme.colors.success0 }]}
                >
                  Continue as Delivery Agent
                </Button>

                <Button
                  variant="primary"
                  onPress={() => onClose("security")}
                  style={[styles.button, { backgroundColor: theme.colors.gray10 }]}
                >
                  Continue as Security
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

export default RoleSelectionModal;