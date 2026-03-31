import React from "react";
import { View, ViewProps as RNViewProps, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { theme } from "@/theme";

interface CardProps extends RNViewProps {
  variant?: "default" | "elevated" | "outlined" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
}

export const Card = React.forwardRef<View, CardProps>(
  ({ variant = "elevated", padding = "md", style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.base,
          (styles as any)[variant],
          (styles as any)[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Card.displayName = "Card";

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
  },

  // Variants
  default: {
    backgroundColor: theme.colors.white,
  },
  elevated: {
    backgroundColor: theme.colors.white,
    ...theme.shadows.md,
  },
  outlined: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.grey7,
  },
  ghost: {
    backgroundColor: theme.colors.grey6,
  },

  // Padding
  paddingNone: {
    padding: 0,
  },
  paddingSm: {
    padding: theme.spacing.md,
  },
  paddingMd: {
    padding: theme.spacing.lg,
  },
  paddingLg: {
    padding: theme.spacing.xl,
  },
});
