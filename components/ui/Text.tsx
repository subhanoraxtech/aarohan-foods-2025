import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";
import { theme } from "@/theme";

type SpacingValue = keyof typeof theme.spacing | number;

interface TextProps extends RNTextProps {
  variant?: "h1" | "h2" | "h3" | "lg" | "body" | "body-sm" | "caption" | "label";
  color?: keyof typeof theme.colors | string;
  weight?: "regular" | "medium" | "semibold" | "bold" | "light";
  align?: "left" | "center" | "right";
  p?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  pt?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  pr?: SpacingValue;
  m?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
  mt?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  mr?: SpacingValue;
}

function resolveSpacing(value: SpacingValue): number {
  if (typeof value === "number") return value;
  return (theme.spacing as any)[value] || 0;
}

export const Text = React.forwardRef<RNText, TextProps>(
  (
    {
      variant = "body",
      color = "text",
      weight,
      align,
      p,
      px,
      py,
      pt,
      pb,
      pl,
      pr,
      m,
      mx,
      my,
      mt,
      mb,
      ml,
      mr,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const colorValue = (theme.colors as any)[color] || color;

    const resolvedStyle = {
      ...(p !== undefined && { padding: resolveSpacing(p) }),
      ...(px !== undefined && { paddingHorizontal: resolveSpacing(px) }),
      ...(py !== undefined && { paddingVertical: resolveSpacing(py) }),
      ...(pt !== undefined && { paddingTop: resolveSpacing(pt) }),
      ...(pb !== undefined && { paddingBottom: resolveSpacing(pb) }),
      ...(pl !== undefined && { paddingLeft: resolveSpacing(pl) }),
      ...(pr !== undefined && { paddingRight: resolveSpacing(pr) }),
      ...(m !== undefined && { margin: resolveSpacing(m) }),
      ...(mx !== undefined && { marginHorizontal: resolveSpacing(mx) }),
      ...(my !== undefined && { marginVertical: resolveSpacing(my) }),
      ...(mt !== undefined && { marginTop: resolveSpacing(mt) }),
      ...(mb !== undefined && { marginBottom: resolveSpacing(mb) }),
      ...(ml !== undefined && { marginLeft: resolveSpacing(ml) }),
      ...(mr !== undefined && { marginRight: resolveSpacing(mr) }),
    };

    return (
      <RNText
        ref={ref}
        style={[
          styles.base,
          styles[variant as keyof typeof styles],
          weight && { fontFamily: theme.typography.fontFamily[weight as keyof typeof theme.typography.fontFamily] as string },
          align && { textAlign: align },
          { color: colorValue },
          resolvedStyle,
          style,
        ]}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

Text.displayName = "Text";

const styles = StyleSheet.create({
  base: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.sizes.base,
    lineHeight: theme.typography.lineHeight.base,
    color: theme.colors.text,
  },
  h1: {
    fontSize: theme.typography.sizes["5xl"],
    lineHeight: theme.typography.lineHeight["2xl"],
    fontFamily: theme.typography.fontFamily.bold,
  },
  h2: {
    fontSize: theme.typography.sizes["4xl"],
    lineHeight: theme.typography.lineHeight.xl,
    fontFamily: theme.typography.fontFamily.bold,
  },
  h3: {
    fontSize: theme.typography.sizes["2xl"],
    lineHeight: theme.typography.lineHeight.lg,
    fontFamily: theme.typography.fontFamily.semibold,
  },
  lg: {
    fontSize: theme.typography.sizes.lg,
    lineHeight: theme.typography.lineHeight.lg,
  },
  body: {
    fontSize: theme.typography.sizes.base,
    lineHeight: theme.typography.lineHeight.base,
  },
  "body-sm": {
    fontSize: theme.typography.sizes.md,
    lineHeight: theme.typography.lineHeight.md,
  },
  caption: {
    fontSize: theme.typography.sizes.sm,
    lineHeight: theme.typography.lineHeight.sm,
    color: theme.colors.textSecondary,
  },
  label: {
    fontSize: theme.typography.sizes.md,
    lineHeight: theme.typography.lineHeight.md,
    fontFamily: theme.typography.fontFamily.medium,
  },
});
