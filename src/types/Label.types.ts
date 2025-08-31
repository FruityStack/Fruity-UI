import { TextStyle } from 'react-native';

export interface LabelStyleProps {
  fontSize?: number;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  textAlign?: TextStyle['textAlign'];
  fontFamily?: string;
  lineHeight?: number;
  letterSpacing?: number;
  textDecorationLine?: TextStyle['textDecorationLine'];
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  textDecorationColor?: string;
  textTransform?: TextStyle['textTransform'];
}

export interface LabelProps extends LabelStyleProps {
  children: React.ReactNode;
  style?: TextStyle;
}
