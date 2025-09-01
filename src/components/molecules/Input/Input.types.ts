import { LabelStyleProps } from "../../atoms/Label/Label.types";
import { ThemeColors } from "../../../theme/types";
import { TextInputProps, TextStyle, ViewStyle } from "react-native";

export type InputVariant = "primary" | "secondary" | "tertiary";
export type ValidationResult = {
  valid: boolean;
  message?: string;
};

export type Validator = (value: string) => ValidationResult;
export type AsyncValidator = (value: string) => Promise<ValidationResult>;

export interface InputStyleProps {
  container: ViewStyle;
  input: TextStyle;
  inputContainer: ViewStyle;
  iconContainer: ViewStyle;
  label: {
    textColor: keyof ThemeColors;
    labelColor: keyof ThemeColors;
    fontSize: number;
    labelFontSize: number;
    borderRadius: number;
  };
  errorText: LabelStyleProps;
}

export interface InputProps extends TextInputProps {
  variant?: InputVariant;
  value: string;
  label?: string;
  onChangeText: (text: string) => void;
  onValidValue?: (text: string) => void;
  validators?: Validator[];
  asyncValidators?: AsyncValidator[];
  refreshTrigger?: any[];
  customStyles?: InputStyleProps;
}
