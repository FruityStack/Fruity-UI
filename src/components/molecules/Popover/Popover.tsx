import React, { useMemo, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { useAppTheme, getMergedStyles } from '../../../theme/utils';
import { Icon } from '../../atoms';
import { PopoverProps, PopoverStyleProps, PopoverVariant, PopoverAction } from './Popover.types';
import { defaultPopoverStyles } from './Popover.styles';

const Popover: React.FC<PopoverProps> = ({
  visible,
  onClose,
  actions,
  children,
  variant = 'default',
  customStyles,
  position = 'bottom',
  closeOnOutsidePress = true,
}) => {
  const { theme } = useAppTheme();
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const merged = useMemo(
    () => getMergedStyles<PopoverStyleProps, PopoverVariant>(
      theme,
      'Popover',
      defaultPopoverStyles(theme),
      variant,
      customStyles
    ),
    [theme, variant, customStyles]
  );

  const styles = useMemo(
    () => StyleSheet.create({
      overlay: merged.overlay,
      container: merged.container,
      arrow: merged.arrow,
      actionItem: merged.actionItem,
      actionText: merged.actionText,
      separator: merged.separator,
    }),
    [merged]
  );

  const handleTriggerPress = () => {
    if (!visible) {
      // Trigger would open popover - handle this externally
    }
  };

  const handleActionPress = (action: PopoverAction) => {
    if (!action.disabled) {
      action.onPress();
      onClose();
    }
  };

  const handleOverlayPress = () => {
    if (closeOnOutsidePress) {
      onClose();
    }
  };

  const renderAction = (action: PopoverAction, index: number) => {
    const isDestructive = action.destructive;
    const isDisabled = action.disabled;

    return (
      <React.Fragment key={action.id}>
        <TouchableOpacity
          style={[
            styles.actionItem,
            isDisabled && { opacity: 0.5 },
          ]}
          onPress={() => handleActionPress(action)}
          disabled={isDisabled}
          activeOpacity={0.7}
        >
          {action.icon && (
            <Icon
              name={action.icon}
              library={action.iconLibrary || 'ionicons'}
              customStyles={{
                fontSize: 18,
                color: isDestructive ? theme.colors.error : theme.colors.textSecondary,
              }}
            />
          )}
          <Text
            style={[
              styles.actionText,
              isDestructive && { color: theme.colors.error },
            ]}
          >
            {action.label}
          </Text>
        </TouchableOpacity>
        {index < actions.length - 1 && <View style={styles.separator} />}
      </React.Fragment>
    );
  };

  return (
    <>
      <TouchableOpacity onPress={handleTriggerPress}>
        {children}
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable style={styles.overlay} onPress={handleOverlayPress}>
          <View
            style={[
              styles.container,
              {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [
                  { translateX: -100 },
                  { translateY: -100 },
                ],
              },
            ]}
          >
            {actions.map((action, index) => renderAction(action, index))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default Popover;