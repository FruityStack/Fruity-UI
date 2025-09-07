export interface PlanFormData {
  /**
   * Plan title
   */
  title: string;

  /**
   * Plan description
   */
  description: string;

  /**
   * Plan category
   */
  category?: string;

  /**
   * Plan priority
   */
  priority?: 'low' | 'medium' | 'high';

  /**
   * Plan due date
   */
  dueDate?: Date;
}

export interface PlanCreationModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;

  /**
   * Callback when the modal requests to be closed
   */
  onClose: () => void;

  /**
   * Callback when the plan is created
   */
  onCreatePlan: (planData: PlanFormData) => void;

  /**
   * Initial form data
   */
  initialData?: Partial<PlanFormData>;

  /**
   * Whether the creation is in progress
   */
  loading?: boolean;
}