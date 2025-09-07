# Modal System Documentation

This document describes the new modal system components in Fruity-UI.

## Components

### Modal (Base Component)

A flexible modal component that serves as the foundation for other modal implementations.

```tsx
import { Modal } from 'fruity-ui';

<Modal
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  title="Modal Title"
  variant="default" // "default" | "fullscreen" | "bottom-sheet"
>
  <Text>Modal content goes here</Text>
</Modal>
```

**Props:**
- `visible`: Boolean to control modal visibility
- `onClose`: Callback when modal should close
- `title?`: Optional modal title
- `variant?`: Modal style variant (default: "default")
- `showCloseButton?`: Show/hide close button (default: true)
- `closeOnOverlayPress?`: Close on overlay tap (default: true)
- `footer?`: Custom footer content
- `customStyles?`: Custom styling overrides

### Popover

An action menu component that displays a list of actions in a popup overlay.

```tsx
import { Popover, type PopoverAction } from 'fruity-ui';

const actions: PopoverAction[] = [
  {
    id: 'create-plan',
    label: 'Crear plan',
    icon: 'add-circle',
    iconLibrary: 'ionicons',
    onPress: () => console.log('Create plan'),
  },
];

<Popover
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  actions={actions}
>
  <Button onPress={() => setIsVisible(true)}>
    Actions
  </Button>
</Popover>
```

**PopoverAction Props:**
- `id`: Unique identifier
- `label`: Display text
- `icon?`: Icon name
- `iconLibrary?`: Icon library ("ionicons" | "material" | "fontawesome")
- `onPress`: Action callback
- `destructive?`: Style as destructive action
- `disabled?`: Disable the action

### PlanCreationModal

A specialized modal for creating plans with form fields and validation.

```tsx
import { PlanCreationModal, type PlanFormData } from 'fruity-ui';

const handleCreatePlan = (planData: PlanFormData) => {
  console.log('Plan created:', planData);
  // Handle plan creation logic
};

<PlanCreationModal
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  onCreatePlan={handleCreatePlan}
  loading={isCreating}
/>
```

**PlanFormData Interface:**
```tsx
interface PlanFormData {
  title: string;
  description: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
}
```

## Integration Example

Here's how to integrate the Popover with PlanCreationModal:

```tsx
import React, { useState } from 'react';
import { 
  Button, 
  Popover, 
  PlanCreationModal,
  type PopoverAction,
  type PlanFormData 
} from 'fruity-ui';

const MyComponent = () => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);

  const actions: PopoverAction[] = [
    {
      id: 'create-plan',
      label: 'Crear plan',
      icon: 'add-circle',
      iconLibrary: 'ionicons',
      onPress: () => {
        setIsPlanModalVisible(true);
      },
    },
    // Add more actions...
  ];

  const handleCreatePlan = (planData: PlanFormData) => {
    // Handle plan creation
    console.log('Plan created:', planData);
    setIsPlanModalVisible(false);
  };

  return (
    <>
      <Popover
        visible={isPopoverVisible}
        onClose={() => setIsPopoverVisible(false)}
        actions={actions}
      >
        <Button onPress={() => setIsPopoverVisible(true)}>
          Actions
        </Button>
      </Popover>

      <PlanCreationModal
        visible={isPlanModalVisible}
        onClose={() => setIsPlanModalVisible(false)}
        onCreatePlan={handleCreatePlan}
      />
    </>
  );
};
```

## Styling

All components integrate with the theme system and accept custom styles:

```tsx
<Modal
  customStyles={{
    container: { backgroundColor: 'red' },
    header: { borderBottomColor: 'blue' }
  }}
>
  {/* content */}
</Modal>
```

## Features

- **Theme Integration**: All components work with the existing theme system
- **TypeScript Support**: Fully typed with comprehensive interfaces
- **Accessibility**: Proper modal behavior with overlay handling
- **Customizable**: Extensive styling and behavior customization
- **Validation**: Built-in form validation for PlanCreationModal
- **Responsive**: Adapts to different screen sizes and orientations