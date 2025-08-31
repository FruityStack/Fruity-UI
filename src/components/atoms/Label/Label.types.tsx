import { TextStyle, TextProps } from "react-native";
import { ThemeColors } from "@theme/types";

export type LabelVariant = "default" | "secondary" | "caption";

export interface LabelStyleProps {
  base: TextStyle;
}

export interface LabelProps extends TextProps {
  children: React.ReactNode;
  variant?: LabelVariant;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  color?: keyof ThemeColors;
  textAlign?: TextStyle["textAlign"];
  numberOfLines?: number;
  selectable?: boolean;
  textStyle?: TextStyle;
  customStyle?: Partial<LabelStyleProps>;
}
