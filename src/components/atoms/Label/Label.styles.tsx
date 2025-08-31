import { Theme } from "@theme/types";
import { LabelStyleProps } from "./Label.types";

export const defaultLabelStyles = (theme: Theme): LabelStyleProps => ({
  base: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.md,
  },
});
