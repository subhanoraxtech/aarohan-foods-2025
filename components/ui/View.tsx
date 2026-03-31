import React from "react";
import {
  View as RNView,
  ViewProps as RNViewProps,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { theme } from "@/theme";

type SpacingValue = keyof typeof theme.spacing | number;
type ColorValue = keyof typeof theme.colors | string;

interface ViewProps extends Omit<RNViewProps, "style"> {
  flex?: number | boolean;
  row?: boolean;
  wrap?: boolean;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  center?: boolean;
  gap?: SpacingValue;
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
  bg?: ColorValue;
  radius?: keyof typeof theme.borderRadius;
  w?: SpacingValue | string;
  h?: SpacingValue | string;
  minW?: SpacingValue | string;
  minH?: SpacingValue | string;
  borderWidth?: number;
  borderColor?: ColorValue;
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  style?: StyleProp<ViewStyle>;
}

function resolveSpacing(value: SpacingValue): number {
  if (typeof value === "number") return value;
  return theme.spacing[value] || 0;
}

function resolveColor(value: ColorValue): string {
  if (typeof value !== "string") return String(value);
  return (theme.colors as Record<string, string>)[value] || value;
}

export const View = React.forwardRef<RNView, ViewProps>(
  (
    {
      flex,
      row,
      wrap,
      flexWrap: flexWrapProp,
      center,
      gap,
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
      bg,
      radius,
      w,
      h,
      minW,
      minH,
      borderWidth,
      borderColor,
      align,
      justify,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedStyle: ViewStyle = {
      ...(flex === true && { flex: 1 }),
      ...(typeof flex === "number" && { flex }),
      ...(row && { flexDirection: "row" }),
      ...(wrap && { flexWrap: "wrap" }),
      ...(flexWrapProp && { flexWrap: flexWrapProp }),
      ...(center && { alignItems: "center", justifyContent: "center" }),
      ...(gap !== undefined && { gap: resolveSpacing(gap) }),
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
      ...(bg !== undefined && { backgroundColor: resolveColor(bg) }),
      ...(radius !== undefined && { borderRadius: theme.borderRadius[radius] }),
      ...(w !== undefined && { width: resolveSpacing(w as any) }),
      ...(h !== undefined && { height: resolveSpacing(h as any) }),
      ...(minW !== undefined && { minWidth: resolveSpacing(minW as any) }),
      ...(minH !== undefined && { minHeight: resolveSpacing(minH as any) }),
      ...(borderWidth !== undefined && { borderWidth }),
      ...(borderColor !== undefined && { borderColor: resolveColor(borderColor) }),
      ...(align !== undefined && { alignItems: align }),
      ...(justify !== undefined && { justifyContent: justify }),
    };

    return (
      <RNView ref={ref} style={[styles.base, resolvedStyle, style]} {...props}>
        {children}
      </RNView>
    );
  }
);

View.displayName = "View";

const styles = StyleSheet.create({
  base: {
    // Base view styles
  },
});
