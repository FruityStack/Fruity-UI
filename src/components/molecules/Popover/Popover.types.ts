import { ViewStyle, TextStyle } from 'react-native';

export interface PopoverAction {
  /**
   * Action identifier
   */
  id: string;

  /**
   * Action label
   */
  label: string;

  /**
   * Action icon name
   */
  icon?: string;

  /**
   * Icon library
   */
  iconLibrary?: 'ionicons' | 'material' | 'fontawesome';

  /**
   * Callback when action is pressed
   */
  onPress: () => void;

  /**
   * Whether the action is destructive (shown in red)
   */
  destructive?: boolean;

  /**
   * Whether the action is disabled
   */
  disabled?: boolean;
}

export type PopoverVariant = 'default' | 'menu' | 'tooltip';

export interface PopoverStyleProps {
  overlay: ViewStyle;
  container: ViewStyle;
  arrow: ViewStyle;
  actionItem: ViewStyle;
  actionText: TextStyle;
  separator: ViewStyle;
}

export interface PopoverProps {
  /**
   * Whether the popover is visible
   */
  visible: boolean;

  /**
   * Callback when the popover requests to be closed
   */
  onClose: () => void;

  /**
   * List of actions to display
   */
  actions: PopoverAction[];

  /**
   * Children element that triggers the popover
   */
  children: React.ReactNode;

  /**
   * Popover variant
   * @default "default"
   */
  variant?: PopoverVariant;

  /**
   * Custom styles for the popover
   */
  customStyles?: Partial<PopoverStyleProps>;

  /**
   * Position of the popover relative to the trigger
   * @default "bottom"
   */
  position?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Whether clicking outside closes the popover
   * @default true
   */
  closeOnOutsidePress?: boolean;
}