// Button.styles.ts
import { Theme } from "../../../theme/types";
import { ButtonStyleProps } from "./Button.types";

export const defaultButtonStyles = (theme: Theme): ButtonStyleProps => ({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
  },
});
