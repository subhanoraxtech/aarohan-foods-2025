//  React Imports
import React from "react";

//  Tamagui Imports
import { Button, Dialog, Text, useTheme, XStack, YStack } from "tamagui";

//  Custom Components Imports
import Icon, { IconType } from "./Icon";

export type NotificationModalType = 'success' | 'error' | 'info' | 'warning';

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
  modalType = 'success',
  modalTitle,
  subTitle,
  buttonTitle = 'OK',
  buttonColor,
  iconName,
  iconType,
  iconColor,
  iconBackgroundColor,
}: NotificationModalProps) => {
  const theme = useTheme();

  // Default configurations for each modal type
  const getDefaultConfig = () => {
    switch (modalType) {
      case 'success':
        return {
          title: modalTitle || 'Success',
          icon: iconName || 'check',
          iconType: iconType || 'feather' as IconType,
          iconColor: iconColor || theme.green10.val,
          iconBg: iconBackgroundColor || '$green5',
          btnColor: buttonColor || '$green10',
        };
      case 'error':
        return {
          title: modalTitle || 'Error',
          icon: iconName || 'x',
          iconType: iconType || 'feather' as IconType,
          iconColor: iconColor || theme.red10.val,
          iconBg: iconBackgroundColor || '$red5',
          btnColor: buttonColor || '$red10',
        };
      case 'warning':
        return {
          title: modalTitle || 'Warning',
          icon: iconName || 'alert-triangle',
          iconType: iconType || 'feather' as IconType,
          iconColor: iconColor || theme.orange.val,
          iconBg: iconBackgroundColor || '$orange5',
          btnColor: buttonColor || '$orange',
        };
      case 'info':
        return {
          title: modalTitle || 'Info',
          icon: iconName || 'info',
          iconType: iconType || 'feather' as IconType,
          iconColor: iconColor || theme.blue10.val,
          iconBg: iconBackgroundColor || '$blue5',
          btnColor: buttonColor || '$blue10',
        };
      default:
        return {
          title: modalTitle || 'Notification',
          icon: iconName || 'bell',
          iconType: iconType || 'feather' as IconType,
          iconColor: iconColor || theme.gray10.val,
          iconBg: iconBackgroundColor || '$gray5',
          btnColor: buttonColor || '$gray10',
        };
    }
  };

  const config = getDefaultConfig();

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
          {...({ borderRadius: 16 } as any)}
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
              {config.title}
            </Text>
          </YStack>
          
          <XStack justify={"center"} items={"center"}>
            <XStack
              justify={"center"}
              items={"center"}
              px={"$2"}
              py={"$2"}
              {...({ borderRadius: 32 } as any)}
              bg={config.iconBg as any}
            >
              <Icon
                name={config.icon}
                type={config.iconType}
                size={40}
                color={config.iconColor}
              />
            </XStack>
          </XStack>

          {subTitle && (
            <Text
              fontSize={16}
              fontWeight="400"
              color="$slate1"
              px={"$5"}
              {...({ textAlign: "center" } as any)}
            >
              {subTitle}
            </Text>
          )}

          <Dialog.Close asChild>
            <Button 
              {...({ backgroundColor: config.btnColor } as any)}
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

export default NotificationModal;

// Export as SuccessModal for backward compatibility
export { NotificationModal as SuccessModal };