import { ThemeColors } from '@theme/types';
import { ViewStyle } from 'react-native';

export interface AnimatedGradientBorderStyleProps {
  /**
   * Width of the border
   */
  borderWidth?: number;
  
  /**
   * Border radius of the container
   */
  borderRadius?: number;
  
  /**
   * Array of colors for the gradient
   */
  gradientColors?: (keyof ThemeColors)[];
  
  /**
   * Duration of the animation in milliseconds
   */
  animationDuration?: number;
  
  /**
   * Additional container style properties
   */
  containerStyle?: ViewStyle;
}

export interface AnimatedGradientBorderProps extends AnimatedGradientBorderStyleProps {
  /**
   * Content to be wrapped by the animated gradient border
   */
  children: React.ReactNode;
  
  /**
   * Whether the animation should be running
   */
  isAnimating?: boolean;
}
