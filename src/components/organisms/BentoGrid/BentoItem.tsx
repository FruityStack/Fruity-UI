import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../../../theme/utils';

export interface BentoItemProps {
  width: 1 | 2 | 3;
  height: 1 | 2 | 3;
  style?: ViewStyle;
  onPress?: () => void;
  children: React.ReactNode;
}

const BentoItem: React.FC<BentoItemProps> = ({
  width,
  height,
  style,
  onPress,
  children
}) => {
  const { theme } = useAppTheme();

  return (
    <Pressable
      style={[
        styles.item,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.spacing.lg,
        },
        style
      ]}
      onPress={onPress}
      android_ripple={{ color: theme.colors.primary + "20" }}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
});

export default BentoItem;