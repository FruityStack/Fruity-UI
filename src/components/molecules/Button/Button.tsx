// Button.tsx
import React, { useMemo } from "react";
import { ActivityIndicator, Pressable, Text, StyleSheet } from "react-native";

import { ButtonProps, ButtonStyleProps, ButtonVariant } from "./Button.types";
import { defaultButtonStyles } from "./Button.styles";

import { useAppTheme, getMergedStyles } from "../../../theme/utils";

const Button = ({
  children,
  onPress,
  backgroundColor,
  borderRadius,
  padding,
  disabled = false,
  loading = false,
  containerStyle,
  labelStyle,
  variant = "primary",
  customStyle,
  ...props
}: ButtonProps) => {
  const { theme } = useAppTheme();

  const merged = useMemo(
    () => getMergedStyles<ButtonStyleProps, ButtonVariant>(theme, "Button", defaultButtonStyles(theme), variant, customStyle),
    [theme, variant, customStyle]
  );

  const paddingStyle =
    typeof padding === "number"
      ? { padding }
      : {
          paddingVertical: padding?.vertical,
          paddingHorizontal: padding?.horizontal,
        };

  const containerMerged = {
    ...merged.container,
    ...(backgroundColor && { backgroundColor: theme.colors[backgroundColor] }),
    ...(borderRadius && { borderRadius }),
    ...paddingStyle,
    ...(containerStyle || {}),
    opacity: disabled ? 0.5 : 1,
  };

  const labelMerged = {
    ...merged.label,
    ...(labelStyle || {}),
  };

  const styles = StyleSheet.create({
    container: containerMerged,
    label: labelMerged,
  });

  return (
    <Pressable onPress={onPress} disabled={disabled || loading} style={({ pressed }) => [styles.container, pressed && { opacity: 0.75 }]} {...props}>
      {loading ? (
        <ActivityIndicator color={theme.colors.surface} />
      ) : typeof children === "string" ? (
        <Text style={styles.label}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;
