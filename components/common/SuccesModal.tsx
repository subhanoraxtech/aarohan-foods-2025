import React from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { theme } from "@/theme";
import Icon, { IconType } from "./Icon";

export type NotificationModalType = "success" | "error" | "info" | "warning";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType?: NotificationModalType;
  modalTitle?: string;
  subTitle?: string;
  buttonTitle?: string;
  buttonColor?: string;
  iconName?: string;
  iconType?: IconType;
  iconColor?: string;
  iconBackgroundColor?: string;
}

const NotificationModal = ({
  isOpen,
  onClose,
  modalType = "success",
  modalTitle,
  subTitle,
  buttonTitle = "OK",
  buttonColor,
  iconName,
  iconType,
  iconColor,
  iconBackgroundColor,
}: NotificationModalProps) => {
  // Default configurations for each modal type
  const getDefaultConfig = () => {
    switch (modalType) {
      case "success":
        return {
          title: modalTitle || "Success",
          icon: iconName || "check",
          iconType: iconType || ("feather" as IconType),
          iconColor: iconColor || theme.colors.success0,
          iconBg: iconBackgroundColor || "#E8F5E9",
          btnColor: buttonColor || theme.colors.success0,
          textColor: theme.colors.success0,
        };
      case "error":
        return {
          title: modalTitle || "Error",
          icon: iconName || "x",
          iconType: iconType || ("feather" as IconType),
          iconColor: iconColor || theme.colors.red1,
          iconBg: iconBackgroundColor || "#FDEDEC",
          btnColor: buttonColor || theme.colors.red1,
          textColor: theme.colors.red1,
        };
      case "warning":
        return {
          title: modalTitle || "Warning",
          icon: iconName || "alert-triangle",
          iconType: iconType || ("feather" as IconType),
          iconColor: iconColor || theme.colors.orange,
          iconBg: iconBackgroundColor || "#FFF3E0",
          btnColor: buttonColor || theme.colors.orange,
          textColor: theme.colors.orange,
        };
      case "info":
        return {
          title: modalTitle || "Info",
          icon: iconName || "info",
          iconType: iconType || ("feather" as IconType),
          iconColor: iconColor || theme.colors.info,
          iconBg: iconBackgroundColor || "#E1F5FE",
          btnColor: buttonColor || theme.colors.info,
          textColor: theme.colors.info,
        };
      default:
        return {
          title: modalTitle || "Notification",
          icon: iconName || "bell",
          iconType: iconType || ("feather" as IconType),
          iconColor: iconColor || theme.colors.gray10,
          iconBg: iconBackgroundColor || "#F5F5F5",
          btnColor: buttonColor || theme.colors.gray10,
          textColor: theme.colors.gray10,
        };
    }
  };

  const config = getDefaultConfig();

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
                  {config.title}
                </Text>
              </View>

              <View center>
                <View
                  center
                  p="md"
                  radius="full"
                  style={[styles.iconContainer, { backgroundColor: config.iconBg }]}
                >
                  <Icon
                    name={config.icon}
                    type={config.iconType}
                    size={40}
                    color={config.iconColor}
                  />
                </View>
              </View>

              {subTitle && (
                <Text
                  variant="body"
                  align="center"
                  color="gray10"
                  px="md"
                >
                  {subTitle}
                </Text>
              )}

              <Button
                variant="primary"
                onPress={onClose}
                style={[styles.button, { backgroundColor: config.btnColor }]}
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

export default NotificationModal;
export { NotificationModal as SuccessModal };