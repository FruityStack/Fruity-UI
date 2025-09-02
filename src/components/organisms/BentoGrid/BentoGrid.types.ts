import { ViewStyle } from 'react-native';

export interface BentoGridStyleProps {
  container: ViewStyle;
}

export interface BentoGridProps {
  children: React.ReactNode;
  gridMargin?: number;
  gridGap?: number;
  gridColumns?: number;
  customStyles?: Partial<BentoGridStyleProps>;
}
