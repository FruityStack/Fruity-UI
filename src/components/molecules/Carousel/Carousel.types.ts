import { ViewStyle, TextStyle } from 'react-native';

export interface CarouselItem {
  content: React.ReactNode;
  overlay: React.ReactNode;
}

export interface CarouselStyles {
  container: ViewStyle;
  slide: ViewStyle;
  pagination: ViewStyle;
  paginationDot: ViewStyle;
  paginationDotActive: ViewStyle;
  overlay: ViewStyle;
  overlayText: TextStyle;
}

export interface CarouselProps {
  /**
   * Array of components to be displayed in the carousel
   */
  items: (React.ReactNode | CarouselItem)[];
  
  /**
   * Auto-play interval in milliseconds. If not provided, auto-play is disabled
   */
  autoPlayInterval?: number;
  
  /**
   * Callback fired when the active slide changes
   */
  onSlideChange?: (index: number) => void;
  
  /**
   * Show pagination dots
   * @default true
   */
  showPagination?: boolean;

  /**
   * Show overlay component
   * @default true
   */
  showOverlay?: boolean;
  
  /**
   * Custom style for the container
   */
  style?: ViewStyle;
  
  /**
   * Custom style for individual slides
   */
  slideStyle?: ViewStyle;

  /**
   * Variant of the carousel
   * @default "default"
   */
  variant?: 'default' | 'minimal' | 'large';
}
