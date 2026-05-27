import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  Moon,
  Sun,
  GraduationCap,
  X,
  Check
} from "lucide-react";
import { MiniCalendar } from "./MiniCalendar";
import { ScheduleTable } from "./ScheduleTable";
import { toast } from "sonner";
import { Toaster } from "sonner";

const SUBJECTS = [
  { value: "all", label: "Все предметы" },
  { value: "Высшая математика", label: "Высшая математика" },
  { value: "Основы программирования", label: "Основы программирования" },
  { value: "Базы данных", label: "Базы данных" },
  { value: "Алгоритмы и структуры данных", label: "Алгоритмы и структуры данных" },
  { value: "Компьютерные сети", label: "Компьютерные сети" },
  { value: "Веб-разработка", label: "Веб-разработка" },
  { value: "Операционные системы", label: "Операционные системы" },
  { value: "Английский язык", label: "Английский язык" },
  { value: "Физическая культура", label: "Физическая культура" },
];

const TEACHERS = [
  { value: "all", label: "Все преподаватели" },
  { value: "Иванов А.П.", label: "Иванов А.П." },
  { value: "Петрова М.С.", label: "Петрова М.С." },
  { value: "Сидоров К.В.", label: "Сидоров К.В." },
  { value: "Козлов Н.И.", label: "Козлов Н.И." },
  { value: "Волков Д.А.", label: "Волков Д.А." },
  { value: "Морозов П.Л.", label: "Морозов П.Л." },
  { value: "Соколов В.М.", label: "Соколов В.М." },
];

const DAY_NAMES: Record<number, string> = {
  0: "Воскресенье",
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
};

const WEEKDAYS = [
  { short: "Пн", full: "Понедельник", dow: 1 },
  { short: "Вт", full: "Вторник",     dow: 2 },
  { short: "Ср", full: "Среда",       dow: 3 },
  { short: "Чт", full: "Четверг",     dow: 4 },
  { short: "Пт", full: "Пятница",     dow: 5 },
];

export function ScheduleApp() {
  const { theme, setTheme } = useTheme();
  const [currentWeek, setCurrentWeek] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const selectedDayName = DAY_NAMES[selectedDate.getDay()];

  const goToWeekday = (dow: number) => {
    const today = new Date();
    const todayDow = today.getDay() === 0 ? 7 : today.getDay();
    const diff = dow - todayDow;
    const target = new Date(today);
    target.setDate(today.getDate() + diff);
    setSelectedDate(target);
  };

  const shiftDay = (delta: number) => {
    const next = new Date(selectedDate);
    next.setDate(selectedDate.getDate() + delta);
    setSelectedDate(next);
  };

  const handleDownloadPDF = () => {
    const printContent = document.getElementById("schedule-print-area");
    if (!printContent) { toast.error("Не удалось подготовить PDF"); return; }
    const win = window.open("", "_blank");
    if (!win) { toast.error("Разрешите всплывающие окна для скачивания PDF"); return; }
    win.document.write(`
      <html>
        <head>
          <title>Расписание группы ИТ-21 — ${selectedDayName}, Неделя ${currentWeek}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #111; }
            h1 { font-size: 20px; margin-bottom: 4px; }
            p { color: #555; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
            th { background: #f0f4ff; font-weight: 600; }
            .day-header { background: #3b5bdb; color: white; font-size: 15px; font-weight: 600; padding: 8px 12px; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
    toast.success("Окно печати открыто!", {
      description: "Выберите «Сохранить как PDF» в диалоге печати",
      icon: <Check className="w-4 h-4" />,
    });
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Расписание занятий
                </h1>
                <p className="text-sm text-muted-foreground">Группа ИТ-21</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-semibold">Расписание</h1>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Week Toggle */}
              <div className="flex items-center rounded-lg bg-muted p-1">
                <button
                  onClick={() => setCurrentWeek(1)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    currentWeek === 1
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Неделя 1
                </button>
                <button
                  onClick={() => setCurrentWeek(2)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    currentWeek === 2
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Неделя 2
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Download PDF */}
              <button
                onClick={handleDownloadPDF}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <Download className="w-4 h-4" />
                <span className="font-medium">Скачать PDF</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="sm:hidden p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="pb-4 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по предметам или преподавателям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                >
                  {TEACHERS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Schedule Area */}
          <div className="flex-1">

            {/* Day Navigation */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => shiftDay(-1)}
                className="p-2 rounded-lg hover:bg-accent transition-colors border border-border"
                aria-label="Предыдущий день"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1 flex-1 overflow-x-auto">
                {WEEKDAYS.map(({ short, full, dow }) => (
                  <button
                    key={dow}
                    onClick={() => goToWeekday(dow)}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                      selectedDayName === full
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "bg-muted hover:bg-accent text-foreground"
                    }`}
                  >
                    {short}
                  </button>
                ))}
              </div>

              <button
                onClick={() => shiftDay(1)}
                className="p-2 rounded-lg hover:bg-accent transition-colors border border-border"
                aria-label="Следующий день"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Selected day label */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold">{selectedDayName}</h2>
              <span className="text-sm text-muted-foreground">
                {selectedDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <div id="schedule-print-area">
              <ScheduleTable
                week={currentWeek}
                searchQuery={searchQuery}
                selectedSubject={selectedSubject}
                selectedTeacher={selectedTeacher}
                selectedDay={selectedDayName}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-24 space-y-4">
              <MiniCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

              {/* Info Card */}
              <div className="p-4 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  Информация
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">День:</span>
                    <span className="font-medium">{selectedDayName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Дата:</span>
                    <span className="font-medium">
                      {selectedDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Неделя:</span>
                    <span className="font-medium">Неделя {currentWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Группа:</span>
                    <span className="font-medium">ИТ-21</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="p-4 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-3">Типы занятий</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Лекция</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    <span className="text-sm">Практика</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Лабораторная</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
