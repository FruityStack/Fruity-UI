import { PressableProps, ViewStyle, TextStyle } from "react-native";
import { ThemeColors } from "../../../theme/types";

export type ButtonVariant = "primary" | "secondary" | "outline";

export interface ButtonStyleProps {
  container: ViewStyle;
  label: TextStyle;
}

export interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  onPress?: () => void;
  backgroundColor?: keyof ThemeColors;
  borderRadius?: number;
  padding?: number | { horizontal?: number; vertical?: number };
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  variant?: ButtonVariant;
  customStyle?: Partial<ButtonStyleProps>;
}
