import { Theme } from "@theme/types";
import { InputStyleProps } from "./Input.types";
import { ViewStyle, TextStyle, TextInput } from "react-native";

export const defaultInputStyles = (theme: Theme): InputStyleProps => {
  return {
    container: {} as ViewStyle,
    inputContainer: {
      position: "relative",
    },
    input: {
      borderWidth: 1,
      padding: theme.spacing.md,
      borderRadius: theme.spacing.md,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      borderColor: theme.colors.border,
      fontSize: theme.fontSizes.md,
    },
    iconContainer: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: [{ translateY: -10 }],
    },
    label: {
      textColor: theme.colors.text,
      labelColor: theme.colors.label,
      fontSize: theme.fontSizes.lg,
      labelFontSize: 12,
      borderRadius: 8,
    },
    errorText: {},
  };
};
