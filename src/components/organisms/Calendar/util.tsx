import { DayInfo } from "./WeekCalendar/WeekCalendar.types";

export const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
export const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const getWeekDays = (refDate: string): DayInfo[] => {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const weekDays: DayInfo[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const dayNumber = date.getDate();
    const fullDate = date.toISOString().split("T")[0];

    const isRefDate = fullDate === refDate;

    weekDays.push({
      dayName: dayNames[i],
      dayNumber,
      fullDate,
      isRefDate,
    });
  }
  return weekDays;
};

export const lightenColor = (hex: string, amount: number): string => {
  const color = hex.replace("#", "");

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const newR = Math.min(255, Math.round(r + (255 - r) * amount));
  const newG = Math.min(255, Math.round(g + (255 - g) * amount));
  const newB = Math.min(255, Math.round(b + (255 - b) * amount));

  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

export const darkerColor = (hex: string, amount: number): string => {
  const color = hex.replace("#", "");

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const newR = Math.max(0, Math.round(r - r * amount));
  const newG = Math.max(0, Math.round(g - g * amount));
  const newB = Math.max(0, Math.round(b - b * amount));

  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};
