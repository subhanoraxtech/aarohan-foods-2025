import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import { Text } from "./Text";
import { theme } from "@/theme";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: string;
  containerStyle?: ViewStyle;
  inputStyle?: StyleProp<TextStyle>;
  size?: "sm" | "md" | "lg";
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      prefix,
      leftIcon,
      rightIcon,
      containerStyle,
      inputStyle,
      size = "md",
      editable = true,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text variant="label" style={styles.label}>
            {label}
          </Text>
        )}
        <View
          style={[
            styles.inputContainer,
            styles[size],
            isFocused && styles.focused,
            error && styles.error,
            !editable && styles.disabled,
          ]}
        >
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          {prefix && (
            <Text variant="body" style={styles.prefix}>
              {prefix}
            </Text>
          )}
          <TextInput
            ref={ref}
            style={[styles.input, styles[`${size}Text`], inputStyle]}
            placeholderTextColor={theme.colors.grey2}
            editable={editable}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
        {error && (
          <Text variant="caption" color="red1" style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: theme.spacing.sm,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.grey6,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.grey8,
  },
  input: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text,
  },
  icon: {
    paddingHorizontal: theme.spacing.md,
  },
  prefix: {
    marginLeft: 12,
    color: theme.colors.gray10,
    fontSize: theme.typography.sizes.base,
  },

  // Sizes
  sm: {
    minHeight: 40,
    paddingHorizontal: theme.spacing.md,
  },
  md: {
    minHeight: 48,
    paddingHorizontal: theme.spacing.md,
  },
  lg: {
    minHeight: 56,
    paddingHorizontal: theme.spacing.lg,
  },

  smText: {
    fontSize: theme.typography.sizes.sm,
  },
  mdText: {
    fontSize: theme.typography.sizes.base,
  },
  lgText: {
    fontSize: theme.typography.sizes.lg,
  },

  // States
  focused: {
    borderColor: theme.colors.orange,
    backgroundColor: theme.colors.white,
  },
  error: {
    borderColor: theme.colors.red1,
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: theme.colors.grey,
  },
  errorText: {
    marginTop: theme.spacing.xs,
  },
});

