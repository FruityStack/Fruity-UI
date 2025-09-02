import { ViewStyle } from "react-native";
import { IconProps, IconStyleProps } from "../../atoms/Icons/Icon.types";

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
   * Container styles for the bottom tabs
   */
  container: ViewStyle;

  /**
   * Styles for each tab button
   */
  button: ViewStyle;

  /**
   * Styles for the inactive icon
   */
  icon: IconStyleProps;

  /**
   * Styles for the active icon
   */
  activeIcon: IconStyleProps;
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
