import { ViewStyle } from "react-native";
import { WeekCalendarStyleProps } from "./WeekCalendar.types";
import { Theme } from "@theme/types";

export const defaultWeekCalendarStyles = (theme: Theme): WeekCalendarStyleProps => {
  return {
    weekContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dayContainer: {
      flex: 1,
      borderRadius: theme.spacing.sm,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      minHeight: 45,
      padding: theme.spacing.sm,
      marginHorizontal: theme.spacing.xxs,
    },
    refDayContainer: {
      borderWidth: theme.spacing.xs,
      padding: theme.spacing.xs,
      borderColor: theme.colors.primary,
    },
    dayNameLabel: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.xs,
      marginBottom: theme.spacing.xs,
      fontWeight: "500",
      textAlign: "center",
    },
    dayNumberLabel: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.md,
      fontWeight: "400",
      textAlign: "center",
    },
  };
};
