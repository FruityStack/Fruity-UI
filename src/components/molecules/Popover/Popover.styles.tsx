import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/types';
import { PopoverStyleProps } from './Popover.types';

export const defaultPopoverStyles = (theme: Theme): PopoverStyleProps => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingVertical: theme.spacing.xs,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  actionText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.text,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.secondary,
    marginVertical: theme.spacing.xs,
  },
});