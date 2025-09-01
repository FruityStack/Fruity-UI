import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemeColors } from "../../../theme/types";
import { ViewStyle } from "react-native";

export type IconVariant = "default" | "outlined" | "filled";

export type IconLibrary = keyof typeof iconLibraries;

export const iconLibraries = {
  fontawesome: FontAwesome5,
  ionicons: Ionicons,
  material: MaterialIcons,
} as const;

export interface IconStyleProps {
  /**
   * Size of the icon
   */
  size?: number;

  /**
   * Color of the icon
   */
  color?: keyof ThemeColors;

  /**
   * Additional container style properties
   */
  containerStyle?: ViewStyle;
}

export interface IconProps {
  /**
   * Name of the icon in format "library/icon-name"
   * Supported libraries: fontawesome, ionicons, material
   */
  name: string;

  /**
   * Icon library to use
   */
  library: IconLibrary;

  /**
   * Whether the icon should be animated
   */
  animated?: boolean;

  /**
   * Duration of the animation in milliseconds (if animated)
   */
  animationDuration?: number;

  /**
   * Custom style properties for the icon
   */
  customStyles?: IconStyleProps;

  /**
   * Variant of the icon
   */
  variant?: IconVariant;
}
