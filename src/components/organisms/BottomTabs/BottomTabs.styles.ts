import { Theme } from "../../../theme/types";
import { BottomTabsStyleProps } from "./BottomTabs.types";

export const defaultBottomTabsStyles = (theme: Theme): BottomTabsStyleProps => {
  return {
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: theme.colors.surface,
      paddingVertical: theme.spacing.sm,
    },
    button: {
      alignItems: "center",
    },
    icon: {
      size: theme.fontSizes.xl,
      color: "textSecondary",
      containerStyle: {},
    },
    activeIcon: {
      size: theme.fontSizes.xl,
      color: "primary",
      containerStyle: {},
    },
  };
};
