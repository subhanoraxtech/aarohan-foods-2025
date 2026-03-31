import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { theme } from "@/theme";

interface ButtonProps {
  onPress?: () => void;
  backgroundColor?: string;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  borderRadius?: number | string;
  size?: number | string;
  loading?: boolean;
  iconAfter?: React.ReactNode | (() => React.ReactNode);
  disabled?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Button = ({
  onPress,
  backgroundColor = "orange",
  color = "white",
  fontWeight = "600",
  borderRadius = "12",
  size = "5",
  loading = false,
  iconAfter,
  disabled = false,
  children,
  style,
}: ButtonProps) => {
  // Map theme tokens if they start with $
  const getThemeValue = (val: any, themeCategory: keyof typeof theme) => {
    if (typeof val === "string" && val.startsWith("$")) {
      const key = val.substring(1);
      return (theme[themeCategory] as any)[key] || val;
    }
    // Also handle direct mapping if the value is in the theme
    if (typeof val === "string" && (theme[themeCategory] as any)[val]) {
      return (theme[themeCategory] as any)[val];
    }
    return val;
  };

  const bgColor = getThemeValue(backgroundColor, "colors");
  const textColor = getThemeValue(color, "colors");
  const radius = getThemeValue(borderRadius, "borderRadius");
  const paddingVal = getThemeValue(size, "spacing");

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      style={[
        styles.button,
        {
          backgroundColor: (loading || disabled) ? theme.colors.grey2 : bgColor,
          borderRadius: typeof radius === "number" ? radius : 12,
          paddingVertical: typeof paddingVal === "number" ? paddingVal : 12,
          paddingHorizontal: typeof paddingVal === "number" ? paddingVal * 2 : 24,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontWeight,
            fontFamily: theme.typography.fontFamily.semibold,
          },
        ]}
      >
        {children}
      </Text>
      {loading ? (
        <ActivityIndicator color={textColor} style={styles.icon} />
      ) : iconAfter ? (
        <React.Fragment>
           {typeof iconAfter === "function" ? iconAfter() : iconAfter}
        </React.Fragment>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
  icon: {
    marginLeft: 8,
  },
});

export default Button;
