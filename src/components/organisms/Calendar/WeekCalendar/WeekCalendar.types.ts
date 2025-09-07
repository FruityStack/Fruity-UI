import { LabelStyleProps } from "@components/atoms/Label/Label.types";
import { ViewStyle } from "react-native";

export type WeekCalendarVariant = "dotted" | "filled";

export interface WeekCalendarStyleProps {
  dayContainer: ViewStyle;
  dayNumberLabel: LabelStyleProps;
  dayNameLabel: LabelStyleProps;
  weekContainer: ViewStyle;
  refDayContainer: ViewStyle;
}

export interface WeekCalendarProps {
  variant?: WeekCalendarVariant;
  onDateSelect?: (date: string) => void;
  refDate?: string;
  markedDates?: { [date: string]: { marked?: boolean; markedColor?: string } };
  customStyles?: WeekCalendarStyleProps;
}

export interface DayInfo {
  dayName: string;
  dayNumber: number;
  fullDate: string;
  isRefDate: boolean;
}
