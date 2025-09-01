import { Theme } from "../../../theme/types";
import { IconStyleProps } from "./Icon.types";

export const defaultIconStyles = (theme: Theme): IconStyleProps => {
  return {
    size: theme.fontSizes.md,
    color: "text",
    containerStyle: {},
  };
};
