import React, { ReactNode, useRef } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInputProps,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import { theme } from "@/theme";

interface TextFieldProps extends TextInputProps {
  icon?: ReactNode;
  label?: string;
  error?: boolean;
  helperText?: string;
  gutterBottom?: boolean;
  prefix?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextField = ({
  icon,
  placeholder = "Placeholder",
  label,
  error = false,
  helperText,
  gutterBottom = false,
  prefix,
  containerStyle,
  ...props
}: TextFieldProps) => {
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.container, gutterBottom && styles.gutterBottom, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      <Pressable
        onPress={handleFocus}
        style={[
          styles.inputWrapper,
          { borderColor: error ? theme.colors.red1 : theme.colors.grey8 }
        ]}
      >
        {prefix && (
          <View style={styles.prefixContainer}>
            <Text style={styles.prefixText}>
              {prefix}
            </Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.grey2}
            style={styles.input}
            {...props}
          />
        </View>
        {icon && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}
      </Pressable>

      {helperText && (
        <Text
          style={[
            styles.helperText,
            { color: error ? theme.colors.red1 : theme.colors.grey2 }
          ]}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  gutterBottom: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.black1,
    marginBottom: 8,
    fontFamily: theme.typography.fontFamily.medium,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: theme.colors.white,
  },
  prefixContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: theme.colors.grey8,
    paddingRight: 8,
    marginRight: 8,
  },
  prefixText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.grey3,
    fontFamily: theme.typography.fontFamily.medium,
  },
  inputContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.grey3,
    padding: 0,
    margin: 0,
    height: "100%",
    fontFamily: theme.typography.fontFamily.medium,
  } as TextStyle,
  iconContainer: {
    marginLeft: 8,
  },
  helperText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
    marginLeft: 4,
    fontFamily: theme.typography.fontFamily.medium,
  },
});

export default TextField;
