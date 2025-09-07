import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Button, 
  Popover, 
  PlanCreationModal, 
  useAppTheme,
  type PopoverAction,
  type PlanFormData 
} from '../index';

/**
 * Example component demonstrating the modal system with Popover and PlanCreationModal
 */
const ModalSystemExample: React.FC = () => {
  const { theme } = useAppTheme();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    },
    actionButton: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
  });

  const handleCreatePlan = (planData: PlanFormData) => {
    console.log('Plan created:', planData);
    // Here you would typically handle the plan creation
    // For now, just close the modal
    setIsPlanModalVisible(false);
  };

  const popoverActions: PopoverAction[] = [
    {
      id: 'create-plan',
      label: 'Crear plan',
      icon: 'add-circle',
      iconLibrary: 'ionicons',
      onPress: () => {
        setIsPlanModalVisible(true);
      },
    },
    {
      id: 'create-task',
      label: 'Crear tarea',
      icon: 'checkmark-circle',
      iconLibrary: 'ionicons',
      onPress: () => {
        console.log('Create task action');
      },
    },
    {
      id: 'create-note',
      label: 'Crear nota',
      icon: 'document-text',
      iconLibrary: 'ionicons',
      onPress: () => {
        console.log('Create note action');
      },
    },
    {
      id: 'separator',
      label: '',
      onPress: () => {},
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: 'settings',
      iconLibrary: 'ionicons',
      onPress: () => {
        console.log('Settings action');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Popover
        visible={isPopoverVisible}
        onClose={() => setIsPopoverVisible(false)}
        actions={popoverActions}
        position="bottom"
      >
        <Button
          onPress={() => setIsPopoverVisible(true)}
          variant="primary"
          customStyle={{
            container: styles.actionButton,
          }}
        >
          Acciones
        </Button>
      </Popover>

      <PlanCreationModal
        visible={isPlanModalVisible}
        onClose={() => setIsPlanModalVisible(false)}
        onCreatePlan={handleCreatePlan}
      />
    </View>
  );
};

export default ModalSystemExample;