import { TextStyle, TextProps } from "react-native";

export type LabelVariant = "default" | "secondary" | "caption";

export interface LabelStyleProps extends TextStyle {}

export interface LabelProps extends TextProps {
  children: React.ReactNode;
  variant?: LabelVariant;
  fontSize?: number;
  numberOfLines?: number;
  selectable?: boolean;
  customStyle?: LabelStyleProps;
}
