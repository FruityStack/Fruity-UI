import { ViewStyle, ModalProps as RNModalProps } from 'react-native';

export type ModalVariant = 'default' | 'fullscreen' | 'bottom-sheet';

export interface ModalStyleProps {
  overlay: ViewStyle;
  container: ViewStyle;
  content: ViewStyle;
  header: ViewStyle;
  body: ViewStyle;
  footer: ViewStyle;
}

export interface ModalProps extends Omit<RNModalProps, 'children'> {
  /**
   * Whether the modal is visible
   */
  visible: boolean;

  /**
   * Callback when the modal requests to be closed
   */
  onClose: () => void;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Modal title
   */
  title?: string;

  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Whether clicking the overlay closes the modal
   * @default true
   */
  closeOnOverlayPress?: boolean;

  /**
   * Modal variant
   * @default "default"
   */
  variant?: ModalVariant;

  /**
   * Custom styles for the modal
   */
  customStyles?: Partial<ModalStyleProps>;

  /**
   * Footer content
   */
  footer?: React.ReactNode;
}