import { ViewStyle } from "react-native";
import { IconProps } from "../../atoms/Icons/Icon.types";
import { LabelProps } from "../../atoms/Label/Label.types";

export interface IconLabelStyleProps {
  spacing?: number;
  iconPosition?: "left" | "right";
  containerStyle?: ViewStyle;
}

export interface IconLabelProps extends IconLabelStyleProps {
  iconProps: IconProps;
  labelProps: LabelProps;
}
