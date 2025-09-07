import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useAppTheme } from "../../../../theme/utils";
import { dayNames, lightenColor, monthNames } from "../util";
import { Label } from "../../../atoms";

interface FullCalendarProps {
  onDateSelect?: (date: string) => void;
  selectedDate?: string;
  markedDates?: {
    [date: string]: {
      selected?: boolean;
      marked?: boolean;
      selectedColor?: string;
      markedColor?: string;
    };
  };
  initialDate?: Date;
}

interface CalendarDay {
  date: number;
  fullDate: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isMarked: boolean;
}

const FullCalendar: React.FC<FullCalendarProps> = ({ onDateSelect, selectedDate, markedDates = {}, initialDate = new Date() }) => {
  const { theme, isDark } = useAppTheme();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDay.getDay();
    const mondayBasedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const days: CalendarDay[] = [];

    for (let i = mondayBasedFirstDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      const fullDate = prevDate.toISOString().split("T")[0];
      days.push({
        date: prevDate.getDate(),
        fullDate,
        isCurrentMonth: false,
        isToday: fullDate === todayString,
        isSelected: selectedDate === fullDate || markedDates[fullDate]?.selected || false,
        isMarked: markedDates[fullDate]?.marked || false,
      });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDay = new Date(year, month, day);
      const fullDate = currentDay.toISOString().split("T")[0];
      days.push({
        date: day,
        fullDate,
        isCurrentMonth: true,
        isToday: fullDate === todayString,
        isSelected: selectedDate === fullDate || markedDates[fullDate]?.selected || false,
        isMarked: markedDates[fullDate]?.marked || false,
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      const fullDate = nextDate.toISOString().split("T")[0];
      days.push({
        date: day,
        fullDate,
        isCurrentMonth: false,
        isToday: fullDate === todayString,
        isSelected: selectedDate === fullDate || markedDates[fullDate]?.selected || false,
        isMarked: markedDates[fullDate]?.marked || false,
      });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDatePress = (day: CalendarDay) => {
    onDateSelect?.(day.fullDate);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigateMonth("prev")}>
          <Text style={[styles.navButtonText, { color: theme.colors.primary }]}>‹</Text>
        </TouchableOpacity>

        <Text style={[styles.monthTitle, { color: theme.colors.text }]}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>

        <TouchableOpacity style={styles.navButton} onPress={() => navigateMonth("next")}>
          <Text style={[styles.navButtonText, { color: theme.colors.primary }]}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dayNamesContainer}>
        {dayNames.map((dayName) => (
          <View key={dayName} style={styles.dayNameCell}>
            <Label style={[styles.dayNameText, { color: theme.colors.textSecondary }]}>{dayName}</Label>
          </View>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {days.map((day, index) => {
          const selectedColor = markedDates[day.fullDate]?.selectedColor || theme.colors.primary;
          const markedColor = markedDates[day.fullDate]?.markedColor || theme.colors.primary;

          return (
            <TouchableOpacity key={`${day.fullDate}-${index}`} style={styles.dayCell} onPress={() => handleDatePress(day)} activeOpacity={0.7}>
              <View
                style={[
                  styles.dayInner,
                  day.isToday && styles.todayDay,
                  day.isToday &&
                    !day.isMarked && {
                      borderColor: theme.colors.primary,
                    },
                  day.isToday &&
                    day.isMarked && {
                      borderColor: markedColor,
                      backgroundColor: isDark ? lightenColor(markedColor, 0.2) : `${markedColor}B3`,
                    },
                  day.isMarked &&
                    !day.isToday && {
                      backgroundColor: isDark ? lightenColor(markedColor, 0.2) : `${markedColor}B3`,
                    },
                ]}
              >
                <Label
                  style={[
                    styles.dayText,
                    { color: theme.colors.text },
                    !day.isCurrentMonth && {
                      color: theme.colors.textSecondary,
                      opacity: 0.4,
                    },
                    day.isMarked && {
                      color: isDark ? theme.colors.surface : theme.colors.background,
                      fontWeight: "600",
                    },
                  ]}
                >
                  {day.date}
                </Label>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  dayNamesContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  dayNameCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  dayNameText: {
    fontSize: 13,
    fontWeight: "500",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  dayInner: {
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  todayDay: {
    borderWidth: 2,
  },
  dayText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default FullCalendar;
