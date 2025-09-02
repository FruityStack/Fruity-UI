import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '../../../theme/utils';

interface FullCalendarProps {
  onDateSelect?: (date: string) => void;
  selectedDate?: string;
  markedDates?: { [date: string]: { selected?: boolean; marked?: boolean; selectedColor?: string } };
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

const FullCalendar: React.FC<FullCalendarProps> = ({
  onDateSelect,
  selectedDate,
  markedDates = {},
  initialDate = new Date(),
}) => {
  const { theme, isDark } = useAppTheme();
  const [currentDate, setCurrentDate] = useState(initialDate);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    const mondayBasedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    const days: CalendarDay[] = [];
    
    for (let i = mondayBasedFirstDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      const fullDate = prevDate.toISOString().split('T')[0];
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
      const fullDate = currentDay.toISOString().split('T')[0];
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
      const fullDate = nextDate.toISOString().split('T')[0];
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

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
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
      {/* Header with month navigation */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigateMonth('prev')}
        >
          <Text style={[styles.navButtonText, { color: theme.colors.primary }]}>‹</Text>
        </TouchableOpacity>
        
        <Text style={[styles.monthTitle, { color: theme.colors.text }]}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigateMonth('next')}
        >
          <Text style={[styles.navButtonText, { color: theme.colors.primary }]}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Day names header */}
      <View style={styles.dayNamesContainer}>
        {dayNames.map((dayName) => (
          <View key={dayName} style={styles.dayNameCell}>
            <Text style={[styles.dayNameText, { color: theme.colors.textSecondary }]}>
              {dayName}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.calendarGrid}>
        {days.map((day, index) => {
          const selectedColor = markedDates[day.fullDate]?.selectedColor || theme.colors.primary;
          
          return (
            <TouchableOpacity
              key={`${day.fullDate}-${index}`}
              style={[
                styles.dayCell,
                day.isSelected && {
                  backgroundColor: selectedColor,
                  borderRadius: 8,
                },
              ]}
              onPress={() => handleDatePress(day)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: theme.colors.text },
                  !day.isCurrentMonth && {
                    color: theme.colors.textSecondary,
                    opacity: 0.4,
                  },
                  day.isToday && !day.isSelected && {
                    color: theme.colors.primary,
                    fontWeight: '600',
                  },
                  day.isSelected && {
                    color: isDark ? theme.colors.surface : theme.colors.background,
                    fontWeight: '600',
                  },
                ]}
              >
                {day.date}
              </Text>
              {day.isMarked && !day.isSelected && (
                <View
                  style={[
                    styles.markedDot,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
              )}
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  dayNamesContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayNameCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayNameText: {
    fontSize: 13,
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
  },
  markedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 8,
  },
});

export default FullCalendar;
