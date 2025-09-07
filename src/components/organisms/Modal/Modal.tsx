import React, { useMemo } from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { useAppTheme, getMergedStyles } from '../../../theme/utils';
import { Icon } from '../../atoms';
import { ModalProps, ModalStyleProps, ModalVariant } from './Modal.types';
import { defaultModalStyles } from './Modal.styles';

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnOverlayPress = true,
  variant = 'default',
  customStyles,
  footer,
  ...props
}) => {
  const { theme } = useAppTheme();

  const merged = useMemo(
    () => getMergedStyles<ModalStyleProps, ModalVariant>(
      theme,
      'Modal',
      defaultModalStyles(theme),
      variant,
      customStyles
    ),
    [theme, variant, customStyles]
  );

  const styles = useMemo(
    () => StyleSheet.create({
      overlay: {
        ...merged.overlay,
        ...(variant === 'fullscreen' && {
          padding: 0,
        }),
        ...(variant === 'bottom-sheet' && {
          justifyContent: 'flex-end',
          padding: 0,
        }),
      },
      container: {
        ...merged.container,
        ...(variant === 'fullscreen' && {
          maxWidth: '100%',
          maxHeight: '100%',
          width: '100%',
          height: '100%',
          borderRadius: 0,
        }),
        ...(variant === 'bottom-sheet' && {
          maxWidth: '100%',
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }),
      },
      content: merged.content,
      header: merged.header,
      body: merged.body,
      footer: merged.footer,
    }),
    [merged, variant]
  );

  const handleOverlayPress = () => {
    if (closeOnOverlayPress) {
      onClose();
    }
  };

  return (
    <RNModal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      {...props}
    >
      <Pressable style={styles.overlay} onPress={handleOverlayPress}>
        <Pressable style={styles.container} onPress={() => {}}>
          <View style={styles.content}>
            {(title || showCloseButton) && (
              <View style={styles.header}>
                {title && (
                  <Text style={{
                    fontSize: theme.fontSizes.lg,
                    fontWeight: '600',
                    color: theme.colors.text,
                  }}>
                    {title}
                  </Text>
                )}
                {showCloseButton && (
                  <TouchableOpacity onPress={onClose}>
                    <Icon
                      name="close"
                      library="ionicons"
                      customStyles={{
                        fontSize: 24,
                        color: theme.colors.textSecondary,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
            
            <View style={styles.body}>
              {children}
            </View>
            
            {footer && (
              <View style={styles.footer}>
                {footer}
              </View>
            )}
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

export default Modal;