import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { Text } from "./Text";
import { theme } from "@/theme";

type SpacingValue = keyof typeof theme.spacing | number;

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
  m?: SpacingValue;
  mt?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  mr?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
}

function resolveSpacing(value: SpacingValue): number {
  if (typeof value === "number") return value;
  return theme.spacing[value] || 0;
}

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      style,
      textStyle,
      children,
      m,
      mt,
      mb,
      ml,
      mr,
      mx,
      my,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const marginStyle = {
      ...(m !== undefined && { margin: resolveSpacing(m) }),
      ...(mt !== undefined && { marginTop: resolveSpacing(mt) }),
      ...(mb !== undefined && { marginBottom: resolveSpacing(mb) }),
      ...(ml !== undefined && { marginLeft: resolveSpacing(ml) }),
      ...(mr !== undefined && { marginRight: resolveSpacing(mr) }),
      ...(mx !== undefined && { marginHorizontal: resolveSpacing(mx) }),
      ...(my !== undefined && { marginVertical: resolveSpacing(my) }),
    };

    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={0.8}
        disabled={isDisabled}
        style={[
          styles.base,
          styles[variant],
          styles[size],
          isDisabled && styles.disabled,
          isDisabled && variant === "primary" && styles.disabledPrimary,
          marginStyle,
          style,
        ]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === "primary" || variant === "danger" ? theme.colors.white : theme.colors.orange}
          />
        ) : (
          <View style={styles.content}>
            {leftIcon}
            <Text
              weight="semibold"
              style={[
                styles.text,
                styles[`${variant}Text`],
                size === "sm" && styles.smallText,
                textStyle,
              ]}
            >
              {children}
            </Text>
            {rightIcon}
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  text: {
    fontSize: theme.typography.sizes.base,
  },
  smallText: {
    fontSize: theme.typography.sizes.sm,
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.orange,
    ...theme.shadows.sm,
  },
  secondary: {
    backgroundColor: theme.colors.grey6,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: theme.colors.orange,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  danger: {
    backgroundColor: theme.colors.red1,
    ...theme.shadows.sm,
  },

  // Text colors
  primaryText: {
    color: theme.colors.white,
  },
  secondaryText: {
    color: theme.colors.text,
  },
  outlineText: {
    color: theme.colors.orange,
  },
  ghostText: {
    color: theme.colors.text,
  },
  dangerText: {
    color: theme.colors.white,
  },

  // Sizes
  sm: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 36,
  },
  md: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    minHeight: 48,
  },
  lg: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing["2xl"],
    minHeight: 56,
  },
  icon: {
    width: 48,
    height: 48,
    padding: 0,
    borderRadius: theme.borderRadius.full,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  disabledPrimary: {
    backgroundColor: theme.colors.grey2,
  },
});
