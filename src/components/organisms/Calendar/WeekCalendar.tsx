import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../theme/utils';

interface WeekCalendarProps {
  onDateSelect?: (date: string) => void;
  selectedDate?: string;
  markedDates?: { [date: string]: { selected?: boolean; marked?: boolean; selectedColor?: string; markedColor?: string } };
}

interface DayInfo {
  dayName: string;
  dayNumber: number;
  fullDate: string;
  isToday: boolean;
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({
  onDateSelect,
  selectedDate,
  markedDates = {},
}) => {
  const { theme, isDark } = useAppTheme();

  const getWeekDays = (): DayInfo[] => {
    const today = new Date();
    const currentDay = today.getDay(); 
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; 
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const weekDays: DayInfo[] = [];
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      
      const dayNumber = date.getDate();
      const fullDate = date.toISOString().split('T')[0]; 
      const isToday = fullDate === today.toISOString().split('T')[0];

      weekDays.push({
        dayName: dayNames[i],
        dayNumber,
        fullDate,
        isToday,
      });
    }

    return weekDays;
  };

  const weekDays = getWeekDays();

  const handleDatePress = (date: string) => {
    onDateSelect?.(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekContainer}>
        {weekDays.map((day) => {
          const isToday = day.isToday;
          const isMarked = markedDates[day.fullDate]?.marked;
          const selectedColor = markedDates[day.fullDate]?.selectedColor || theme.colors.primary;
          const markedColor = markedDates[day.fullDate]?.markedColor || theme.colors.primary;

          return (
            <TouchableOpacity
              key={day.fullDate}
              style={[
                styles.dayContainer,
                isToday && {
                  backgroundColor: selectedColor,
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                },
                isMarked && !isToday && {
                  backgroundColor: markedColor,
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                },
              ]}
              onPress={() => handleDatePress(day.fullDate)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayName,
                  { color: theme.colors.text },
                  (isToday || (isMarked && !isToday)) && {
                    color: isDark ? theme.colors.surface : theme.colors.background,
                    fontWeight: '600',
                  },
                ]}
              >
                {day.dayName}
              </Text>
              <Text
                style={[
                  styles.dayNumber,
                  { color: theme.colors.text },
                  (isToday || (isMarked && !isToday)) && {
                    color: isDark ? theme.colors.surface : theme.colors.background,
                    fontWeight: '600',
                  },
                ]}
              >
                {day.dayNumber}
              </Text>
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
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginHorizontal: 2,
    minHeight: 60,
    position: 'relative',
  },
  dayName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default WeekCalendar;
