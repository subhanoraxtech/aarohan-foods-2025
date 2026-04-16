import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../ui/Text";
import { theme } from "@/theme";
import Icon from "../common/Icon";

export interface HeaderProps {
  title?: string;
  onBack?: boolean;
  rightIcon?: any;
  onBackPress?: any;
}

const Header = ({
  title,
  onBack = true,
  rightIcon,
  onBackPress,
}: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button - positioned absolutely to the left */}
      {onBack && (
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <Icon name="angle-left" type="font-awesome" size={28} color={theme.colors.gray3} />
          </TouchableOpacity>
        </View>
      )}

      {/* Title in center */}
      {title && (
        <Text variant="h3" weight="medium" style={styles.title}>
          {title}
        </Text>
      )}

      {rightIcon && (
        <View style={styles.rightIconContainer}>
          {rightIcon}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    position: "relative",
    width: "100%",
  },
  backButtonContainer: {
    position: "absolute",
    left: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.grey1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: theme.colors.gray3,
  },
  rightIconContainer: {
    position: "absolute",
    right: 12,
  },
});

export default Header;
