// Simple import test to verify all components can be imported correctly
import React from 'react';
import { View } from 'react-native';

// Test importing all new modal system components
import { 
  Modal, 
  Popover, 
  PlanCreationModal,
  type ModalProps,
  type PopoverProps,
  type PopoverAction,
  type PlanCreationModalProps,
  type PlanFormData
} from '../index';

// Test component to verify imports work
const ImportTest: React.FC = () => {
  // Type tests
  const modalProps: ModalProps = {
    visible: false,
    onClose: () => {},
    children: null,
  };

  const popoverAction: PopoverAction = {
    id: 'test',
    label: 'Test',
    onPress: () => {},
  };

  const popoverProps: PopoverProps = {
    visible: false,
    onClose: () => {},
    actions: [popoverAction],
    children: null,
  };

  const planFormData: PlanFormData = {
    title: 'Test Plan',
    description: 'Test Description',
    priority: 'medium',
  };

  const planModalProps: PlanCreationModalProps = {
    visible: false,
    onClose: () => {},
    onCreatePlan: (data: PlanFormData) => {},
  };

  console.log('Import test successful!');
  console.log('Modal:', Modal);
  console.log('Popover:', Popover);
  console.log('PlanCreationModal:', PlanCreationModal);

  return (
    <View>
      {/* Empty view for testing purposes */}
    </View>
  );
};

export default ImportTest;