import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MiniCalendarProps {
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
}

export function MiniCalendar({ selectedDate, onDateSelect }: MiniCalendarProps = {}) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  ).getDay();

  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days: (number | null)[] = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isToday = (day: number | null) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  };

  const isClassDay = (day: number | null) => {
    if (!day) return false;
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5;
  };

  const isSelected = (day: number | null) => {
    if (!day || !selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      viewDate.getMonth() === selectedDate.getMonth() &&
      viewDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const clicked = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onDateSelect?.(clicked);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">
          {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-accent rounded transition-colors"
            aria-label="Предыдущий месяц"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-accent rounded transition-colors"
            aria-label="Следующий месяц"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg transition-all
              ${day ? "hover:bg-accent cursor-pointer" : ""}
              ${isToday(day) ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold shadow-lg" : ""}
              ${isSelected(day) && !isToday(day) ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold ring-2 ring-blue-500" : ""}
              ${!isToday(day) && !isSelected(day) && isClassDay(day) ? "font-medium" : ""}
              ${day && !isClassDay(day) && !isToday(day) && !isSelected(day) ? "text-muted-foreground" : ""}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
          <span>Сегодня</span>
        </div>
      </div>
    </div>
  );
}
