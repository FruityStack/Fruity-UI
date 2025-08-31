import { ViewStyle } from "react-native";
import { ThemeColors } from "@theme/types";
import { IconProps } from "@components/atoms/Icons/Icon.types";

export interface TabItem {
  /**
   * Unique key for the tab
   */
  key: number;

  /**
   * Whether this tab is currently active
   */
  isActive?: boolean;

  /**
   * Title of the tab
   */
  title?: string;

  /**
   * Style properties for the tab icon
   */
  iconProps?: IconProps;

  /**
   * Component to render when the tab is active
   */
  screen: React.ComponentType<any>;
}

export interface BottomTabsStyleProps {
  /**
   * Background color of the bottom tabs container
   */
  backgroundColor?: keyof ThemeColors;

  /**
   * Height of the bottom tabs container
   */
  height?: number;

  /**
   * Whether to show a border on top of the tabs
   */
  showBorder?: boolean;

  /**
   * Color of the top border (if shown)
   */
  borderColor?: keyof ThemeColors;

  /**
   * Additional container style properties
   */
  containerStyle?: ViewStyle;
}

export interface BottomTabsProps {
  /**
   * Array of tab items to display
   */
  tabs: TabItem[];

  /**
   * Called when a tab is pressed
   */
  onTabPress: (tabKey: number) => void;

  /**
   * Custom styles for the bottom tabs
   */
  customStyles?: BottomTabsStyleProps;
}
