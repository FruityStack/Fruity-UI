import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { getMergedStyles, useAppTheme } from "../../../../theme/utils";
import { getWeekDays, lightenColor, darkerColor } from "../util";
import { Label } from "../../../atoms";
import { WeekCalendarProps, WeekCalendarStyleProps, WeekCalendarVariant } from "./WeekCalendar.types";
import { defaultWeekCalendarStyles } from "./WeekCalendar.styles";

const WeekCalendar = ({ variant = "filled", onDateSelect = () => {}, refDate = "", markedDates = {}, customStyles }: WeekCalendarProps) => {
  const { theme, isDark } = useAppTheme();
  const merged = useMemo(
    () =>
      getMergedStyles<WeekCalendarStyleProps, WeekCalendarVariant>(theme, "WeekCalendar", defaultWeekCalendarStyles(theme), variant, customStyles),
    [theme, variant, customStyles]
  );
  const weekDays = getWeekDays(refDate);
  const handleDatePress = (date: string) => {
    onDateSelect(date);
  };
  
  const opacityRefDayBackground = theme.components?.WeekCalendar?.base?.opacityRefDayBackground || 0;
  const opacityRefDayBorder = theme.components?.WeekCalendar?.base?.opacityRefDayBorder || 0;
  const markedDayLabelColor = theme.components?.WeekCalendar?.base?.markedDayLabelColor || (isDark ? theme.colors.text : theme.colors.background);

  return (
    <View style={merged.weekContainer}>
      {weekDays.map((day) => {
        const isMarked = markedDates[day.fullDate]?.marked;
        const isRefDay = day.isRefDate;
        const markedColor = markedDates[day.fullDate]?.markedColor || theme.colors.primary;

        return (
          <TouchableOpacity
            key={day.fullDate}
            style={[
              merged.dayContainer,
              isRefDay && merged.refDayContainer,
              isRefDay &&
                isMarked && {
                  borderColor: darkerColor(markedColor, opacityRefDayBorder),
                  backgroundColor: lightenColor(markedColor, opacityRefDayBackground),
                },
              isMarked &&
                !isRefDay && {
                  backgroundColor: markedColor,
                },
            ]}
            onPress={() => handleDatePress(day.fullDate)}
            activeOpacity={0.7}
          >
            <Label style={[merged.dayNameLabel, isMarked && { color: markedDayLabelColor }]}>{day.dayName}</Label>
            <Label style={[merged.dayNumberLabel, isMarked && { color: markedDayLabelColor }]}>{day.dayNumber}</Label>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default WeekCalendar;
