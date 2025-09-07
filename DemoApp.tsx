import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  ThemeProvider,
  defaultTheme,
  Button, 
  Popover, 
  Modal,
  PlanCreationModal,
  useAppTheme,
  type PopoverAction,
  type PlanFormData 
} from '../src/index';

/**
 * Demo App component showcasing the modal system
 */
const DemoContent: React.FC = () => {
  const { theme } = useAppTheme();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);
  const [isBasicModalVisible, setIsBasicModalVisible] = useState(false);
  const [modalVariant, setModalVariant] = useState<'default' | 'fullscreen' | 'bottom-sheet'>('default');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.fontSizes.xxl,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    section: {
      marginBottom: theme.spacing.xl,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: theme.fontSizes.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    sectionDescription: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
      lineHeight: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    demoBadge: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: 6,
      alignSelf: 'flex-start',
      marginBottom: theme.spacing.sm,
    },
    demoBadgeText: {
      color: theme.colors.surface,
      fontSize: theme.fontSizes.sm,
      fontWeight: '600',
    },
  });

  const handleCreatePlan = (planData: PlanFormData) => {
    Alert.alert(
      'Plan Creado',
      `Título: ${planData.title}\nDescripción: ${planData.description}\nCategoría: ${planData.category || 'Sin categoría'}\nPrioridad: ${planData.priority}`,
      [{ text: 'OK' }]
    );
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
        Alert.alert('Acción', 'Crear tarea seleccionado');
      },
    },
    {
      id: 'create-note',
      label: 'Crear nota',
      icon: 'document-text',
      iconLibrary: 'ionicons',
      onPress: () => {
        Alert.alert('Acción', 'Crear nota seleccionado');
      },
    },
    {
      id: 'delete',
      label: 'Eliminar',
      icon: 'trash',
      iconLibrary: 'ionicons',
      destructive: true,
      onPress: () => {
        Alert.alert('Acción Destructiva', 'Eliminar seleccionado');
      },
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Fruity-UI Modal System</Text>
      
      <View style={styles.demoBadge}>
        <Text style={styles.demoBadgeText}>DEMO</Text>
      </View>

      {/* Popover Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popover Component</Text>
        <Text style={styles.sectionDescription}>
          Un componente de menú de acciones que muestra opciones en una ventana flotante. 
          Incluye la acción "Crear plan" que abre el modal de creación.
        </Text>
        
        <Popover
          visible={isPopoverVisible}
          onClose={() => setIsPopoverVisible(false)}
          actions={popoverActions}
          position="bottom"
        >
          <Button
            onPress={() => setIsPopoverVisible(true)}
            variant="primary"
          >
            Mostrar Acciones
          </Button>
        </Popover>
      </View>

      {/* Basic Modal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Modal Base</Text>
        <Text style={styles.sectionDescription}>
          Modal básico con diferentes variantes: predeterminado, pantalla completa y hoja inferior.
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              setModalVariant('default');
              setIsBasicModalVisible(true);
            }}
            variant="outline"
          >
            Modal Normal
          </Button>
          
          <Button
            onPress={() => {
              setModalVariant('fullscreen');
              setIsBasicModalVisible(true);
            }}
            variant="outline"
          >
            Pantalla Completa
          </Button>
          
          <Button
            onPress={() => {
              setModalVariant('bottom-sheet');
              setIsBasicModalVisible(true);
            }}
            variant="outline"
          >
            Hoja Inferior
          </Button>
        </View>
      </View>

      {/* Plan Creation Modal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Modal de Creación de Plan</Text>
        <Text style={styles.sectionDescription}>
          Modal especializado para crear planes con validación de formulario y campos personalizados.
        </Text>
        
        <Button
          onPress={() => setIsPlanModalVisible(true)}
          variant="secondary"
        >
          Crear Plan Directamente
        </Button>
      </View>

      {/* Basic Modal */}
      <Modal
        visible={isBasicModalVisible}
        onClose={() => setIsBasicModalVisible(false)}
        title={`Modal ${modalVariant}`}
        variant={modalVariant}
        footer={
          <Button
            onPress={() => setIsBasicModalVisible(false)}
            variant="primary"
          >
            Cerrar
          </Button>
        }
      >
        <Text style={{ color: theme.colors.text, fontSize: theme.fontSizes.md }}>
          Este es un ejemplo de modal {modalVariant}. {'\n\n'}
          Características:{'\n'}
          • Overlay con transparencia{'\n'}
          • Cierre por toque en overlay{'\n'}
          • Botón de cierre en header{'\n'}
          • Footer personalizable{'\n'}
          • Variantes de presentación
        </Text>
      </Modal>

      {/* Plan Creation Modal */}
      <PlanCreationModal
        visible={isPlanModalVisible}
        onClose={() => setIsPlanModalVisible(false)}
        onCreatePlan={handleCreatePlan}
      />
    </ScrollView>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <DemoContent />
    </ThemeProvider>
  );
};

export default App;