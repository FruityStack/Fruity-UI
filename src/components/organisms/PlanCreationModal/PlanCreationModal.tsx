import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '../../../theme/utils';
import Modal from '../Modal/Modal';
import { Button, Input } from '../../molecules';
import { PlanCreationModalProps, PlanFormData } from './PlanCreationModal.types';

const PlanCreationModal: React.FC<PlanCreationModalProps> = ({
  visible,
  onClose,
  onCreatePlan,
  initialData,
  loading = false,
}) => {
  const { theme } = useAppTheme();
  
  const [formData, setFormData] = useState<PlanFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate,
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const styles = useMemo(
    () => StyleSheet.create({
      form: {
        gap: theme.spacing.md,
      },
      fieldGroup: {
        gap: theme.spacing.xs,
      },
      label: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
      },
      priorityContainer: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
      },
      priorityButton: {
        flex: 1,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        alignItems: 'center',
      },
      priorityButtonActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
      },
      priorityText: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.textSecondary,
      },
      priorityTextActive: {
        color: theme.colors.surface,
        fontWeight: '600',
      },
      footer: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
        justifyContent: 'flex-end',
      },
      errorContainer: {
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.error + '10',
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.error,
      },
      errorText: {
        color: theme.colors.error,
        fontSize: theme.fontSizes.sm,
      },
    }),
    [theme]
  );

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.title.trim()) {
      errors.push('El título es requerido');
    }

    if (!formData.description.trim()) {
      errors.push('La descripción es requerida');
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleCreatePlan = () => {
    if (validateForm()) {
      onCreatePlan(formData);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: undefined,
    });
    setFormErrors([]);
    onClose();
  };

  const updateFormData = (field: keyof PlanFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (formErrors.length > 0) {
      setFormErrors([]);
    }
  };

  const titleValidator = (value: string) => ({
    valid: value.trim().length > 0,
    message: value.trim().length === 0 ? 'El título es requerido' : undefined,
  });

  const descriptionValidator = (value: string) => ({
    valid: value.trim().length > 0,
    message: value.trim().length === 0 ? 'La descripción es requerida' : undefined,
  });

  const renderPrioritySelector = () => {
    const priorities: Array<{ value: PlanFormData['priority'], label: string }> = [
      { value: 'low', label: 'Baja' },
      { value: 'medium', label: 'Media' },
      { value: 'high', label: 'Alta' },
    ];

    return (
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Prioridad</Text>
        <View style={styles.priorityContainer}>
          {priorities.map((priority) => (
            <Button
              key={priority.value}
              onPress={() => updateFormData('priority', priority.value)}
              variant={formData.priority === priority.value ? 'primary' : 'outline'}
              customStyle={{
                container: {
                  flex: 1,
                  paddingVertical: theme.spacing.sm,
                },
              }}
            >
              {priority.label}
            </Button>
          ))}
        </View>
      </View>
    );
  };

  const footer = (
    <View style={styles.footer}>
      <Button
        onPress={handleCancel}
        variant="outline"
        disabled={loading}
      >
        Cancelar
      </Button>
      <Button
        onPress={handleCreatePlan}
        variant="primary"
        loading={loading}
        disabled={loading}
      >
        Crear Plan
      </Button>
    </View>
  );

  return (
    <Modal
      visible={visible}
      onClose={handleCancel}
      title="Crear Nuevo Plan"
      footer={footer}
      closeOnOverlayPress={!loading}
    >
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {formErrors.length > 0 && (
          <View style={styles.errorContainer}>
            {formErrors.map((error, index) => (
              <Text key={index} style={styles.errorText}>• {error}</Text>
            ))}
          </View>
        )}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Título del Plan *</Text>
          <Input
            value={formData.title}
            onChangeText={(text) => updateFormData('title', text)}
            placeholder="Ingresa el título del plan"
            variant="tertiary"
            validators={[titleValidator]}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Descripción *</Text>
          <Input
            value={formData.description}
            onChangeText={(text) => updateFormData('description', text)}
            placeholder="Describe tu plan"
            variant="tertiary"
            multiline
            numberOfLines={4}
            validators={[descriptionValidator]}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Categoría</Text>
          <Input
            value={formData.category}
            onChangeText={(text) => updateFormData('category', text)}
            placeholder="Ej: Trabajo, Personal, Estudio"
            variant="tertiary"
          />
        </View>

        {renderPrioritySelector()}
      </ScrollView>
    </Modal>
  );
};

export default PlanCreationModal;