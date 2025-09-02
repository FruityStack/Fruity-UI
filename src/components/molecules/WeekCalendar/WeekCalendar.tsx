import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Label } from '../../atoms';
import { useAppTheme } from '../../../theme/utils';

export interface WeekCalendarProps {
  /** Current selected date in YYYY-MM-DD format */
  current?: string;
  /** First day of the week (0 = Sunday, 1 = Monday) */
  firstDay?: 0 | 1;
  /** Callback when a date is pressed */
  onDayPress?: (date: { dateString: string; day: number; month: number; year: number }) => void;
  /** Marked dates configuration */
  markedDates?: {
    [key: string]: {
      selected?: boolean;
      selectedColor?: string;
      marked?: boolean;
      dotColor?: string;
    };
  };
  /** Custom styling */
  style?: any;
  /** Custom theme overrides */
  theme?: {
    selectedDayBackgroundColor?: string;
    selectedDayTextColor?: string;
    todayTextColor?: string;
    todayBackgroundColor?: string;
    dayTextColor?: string;
    textDisabledColor?: string;
    dotColor?: string;
    selectedDotColor?: string;
    textDayFontSize?: number;
    textDayHeaderFontSize?: number;
    textDayFontWeight?: string;
  };
}

const SPANISH_DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const SPANISH_DAY_NAMES_MONDAY_FIRST = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function WeekCalendar({
  current,
  firstDay = 1,
  onDayPress,
  markedDates = {},
  style,
  theme: customTheme = {},
}: WeekCalendarProps) {
  const { theme } = useAppTheme();
  
  const currentWeek = useMemo(() => {
    const date = current ? new Date(current) : new Date();
    return getWeekDates(date, firstDay);
  }, [current, firstDay]);

  const dayNames = firstDay === 1 ? SPANISH_DAY_NAMES_MONDAY_FIRST : SPANISH_DAY_NAMES;

  const today = new Date().toISOString().split('T')[0];
  const selectedDate = current || today;

  const mergedTheme = {
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: theme.colors.surface,
    todayTextColor: theme.colors.primary,
    todayBackgroundColor: `${theme.colors.primary}20`,
    dayTextColor: theme.colors.text,
    textDisabledColor: `${theme.colors.text}60`,
    dotColor: theme.colors.primary,
    selectedDotColor: theme.colors.surface,
    textDayFontSize: 16,
    textDayHeaderFontSize: 13,
    textDayFontWeight: '400',
    ...customTheme,
  };

  const handleDayPress = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    onDayPress?.({
      dateString,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  };

  return (
    <View style={[styles.container, style]}>
      {/* Day Headers */}
      <View style={styles.dayHeadersContainer}>
        {dayNames.map((dayName, index) => (
          <View key={index} style={styles.dayHeaderCell}>
            <Label
              variant="default"
              fontSize={mergedTheme.textDayHeaderFontSize}
              customStyle={{
                ...styles.dayHeaderText,
                color: mergedTheme.textDisabledColor,
              }}
            >
              {dayName}
            </Label>
          </View>
        ))}
      </View>

      {/* Week Days */}
      <View style={styles.weekDaysContainer}>
        {currentWeek.map((date, index) => {
          const dateString = date.toISOString().split('T')[0];
          const isToday = dateString === today;
          const isSelected = dateString === selectedDate;
          const markedDate = markedDates[dateString];
          const isMarked = markedDate?.marked;

          const dayStyle = [
            styles.dayCell,
            isSelected && {
              backgroundColor: markedDate?.selectedColor || mergedTheme.selectedDayBackgroundColor,
            },
            isToday && !isSelected && {
              backgroundColor: mergedTheme.todayBackgroundColor,
            },
          ];

          const textStyle = {
            ...styles.dayText,
            color: isSelected
              ? mergedTheme.selectedDayTextColor
              : isToday
              ? mergedTheme.todayTextColor
              : mergedTheme.dayTextColor,
            fontSize: mergedTheme.textDayFontSize,
            fontWeight: mergedTheme.textDayFontWeight as any,
          };

          return (
            <TouchableOpacity
              key={index}
              style={dayStyle}
              onPress={() => handleDayPress(date)}
              activeOpacity={0.7}
            >
              <Label
                variant="default"
                fontSize={mergedTheme.textDayFontSize}
                customStyle={textStyle}
              >
                {date.getDate()}
              </Label>
              {isMarked && (
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: isSelected
                        ? mergedTheme.selectedDotColor
                        : markedDate?.dotColor || mergedTheme.dotColor,
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Helper functions
function getWeekDates(date: Date, firstDay: 0 | 1): Date[] {
  const week = [];
  const startOfWeek = new Date(date);
  
  // Calculate the start of the week
  const dayOfWeek = startOfWeek.getDay();
  const diff = firstDay === 1 
    ? (dayOfWeek === 0 ? 6 : dayOfWeek - 1) // Monday first
    : dayOfWeek; // Sunday first
  
  startOfWeek.setDate(startOfWeek.getDate() - diff);

  // Generate 7 days starting from the calculated start
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    week.push(day);
  }

  return week;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dayHeadersContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeaderCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dayHeaderText: {
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  weekDaysContainer: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 16,
    position: 'relative',
  },
  dayText: {
    textAlign: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: 2,
  },
});
