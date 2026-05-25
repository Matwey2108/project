import { Clock, MapPin, User } from "lucide-react";

interface ScheduleClass {
  pairNumber: number;
  time: string;
  subject: string;
  teacher: string;
  classroom: string;
  type: "lecture" | "practice" | "lab";
}

interface DaySchedule {
  day: string;
  classes: ScheduleClass[];
}

interface ScheduleTableProps {
  week: 1 | 2;
  searchQuery: string;
  selectedSubject: string;
  selectedTeacher: string;
}

const week1Schedule: DaySchedule[] = [
  {
    day: "Понедельник",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Высшая математика",
        teacher: "к.ф.-м.н. Иванов А.П.",
        classroom: "302",
        type: "lecture"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Основы программирования",
        teacher: "проф. Петрова М.С.",
        classroom: "Лаб. 201",
        type: "lab"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Алгоритмы и структуры данных",
        teacher: "к.т.н. Сидоров К.В.",
        classroom: "405",
        type: "lecture"
      }
    ]
  },
  {
    day: "Вторник",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Базы данных",
        teacher: "проф. Петрова М.С.",
        classroom: "Лаб. 203",
        type: "lab"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Высшая математика",
        teacher: "к.ф.-м.н. Иванов А.П.",
        classroom: "302",
        type: "practice"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Английский язык",
        teacher: "к.филол.н. Козлов Н.И.",
        classroom: "215",
        type: "practice"
      }
    ]
  },
  {
    day: "Среда",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Компьютерные сети",
        teacher: "к.т.н. Волков Д.А.",
        classroom: "410",
        type: "lecture"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Основы программирования",
        teacher: "проф. Петрова М.С.",
        classroom: "302",
        type: "practice"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Веб-разработка",
        teacher: "к.т.н. Морозов П.Л.",
        classroom: "Лаб. 201",
        type: "lab"
      }
    ]
  },
  {
    day: "Четверг",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Алгоритмы и структуры данных",
        teacher: "к.т.н. Сидоров К.В.",
        classroom: "Лаб. 202",
        type: "practice"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Базы данных",
        teacher: "проф. Петрова М.С.",
        classroom: "405",
        type: "lecture"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Операционные системы",
        teacher: "к.т.н. Волков Д.А.",
        classroom: "302",
        type: "lecture"
      }
    ]
  },
  {
    day: "Пятница",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Физическая культура",
        teacher: "Соколов В.М.",
        classroom: "Спортзал",
        type: "practice"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Веб-разработка",
        teacher: "к.т.н. Морозов П.Л.",
        classroom: "405",
        type: "lecture"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Компьютерные сети",
        teacher: "к.т.н. Волков Д.А.",
        classroom: "Лаб. 203",
        type: "lab"
      }
    ]
  }
];

const week2Schedule: DaySchedule[] = [
  {
    day: "Понедельник",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Высшая математика",
        teacher: "к.ф.-м.н. Иванов А.П.",
        classroom: "302",
        type: "practice"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Операционные системы",
        teacher: "к.т.н. Волков Д.А.",
        classroom: "Лаб. 201",
        type: "lab"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Базы данных",
        teacher: "проф. Петрова М.С.",
        classroom: "405",
        type: "practice"
      }
    ]
  },
  {
    day: "Вторник",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Алгоритмы и структуры данных",
        teacher: "к.т.н. Сидоров К.В.",
        classroom: "Лаб. 202",
        type: "lab"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Основы программирования",
        teacher: "проф. Петрова М.С.",
        classroom: "302",
        type: "lecture"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Английский язык",
        teacher: "к.филол.н. Козлов Н.И.",
        classroom: "215",
        type: "practice"
      }
    ]
  },
  {
    day: "Среда",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Веб-разработка",
        teacher: "к.т.н. Морозов П.Л.",
        classroom: "410",
        type: "practice"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Компьютерные сети",
        teacher: "к.т.н. Волков Д.А.",
        classroom: "302",
        type: "practice"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Высшая математика",
        teacher: "к.ф.-м.н. Иванов А.П.",
        classroom: "405",
        type: "lecture"
      }
    ]
  },
  {
    day: "Четверг",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Базы данных",
        teacher: "проф. Петрова М.С.",
        classroom: "Лаб. 203",
        type: "lab"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Алгоритмы и структуры данных",
        teacher: "к.т.н. Сидоров К.В.",
        classroom: "405",
        type: "practice"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Операционные системы",
        teacher: "к.т.н. Волков Д.А.",
        classroom: "302",
        type: "lecture"
      }
    ]
  },
  {
    day: "Пятница",
    classes: [
      {
        pairNumber: 1,
        time: "08:30 - 10:00",
        subject: "Физическая культура",
        teacher: "Соколов В.М.",
        classroom: "Спортзал",
        type: "practice"
      },
      {
        pairNumber: 2,
        time: "10:15 - 11:45",
        subject: "Основы программирования",
        teacher: "проф. Петрова М.С.",
        classroom: "Лаб. 201",
        type: "lab"
      },
      {
        pairNumber: 3,
        time: "12:00 - 13:30",
        subject: "Веб-разработка",
        teacher: "к.т.н. Морозов П.Л.",
        classroom: "405",
        type: "lecture"
      }
    ]
  }
];

export function ScheduleTable({ week, searchQuery, selectedSubject, selectedTeacher }: ScheduleTableProps) {
  const schedule = week === 1 ? week1Schedule : week2Schedule;

  const filterClasses = (classes: ScheduleClass[]) => {
    return classes.filter(cls => {
      const matchesSearch = searchQuery === "" ||
        cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.teacher.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject = selectedSubject === "all" ||
        cls.subject === selectedSubject;

      const matchesTeacher = selectedTeacher === "all" ||
        cls.teacher.includes(selectedTeacher);

      return matchesSearch && matchesSubject && matchesTeacher;
    });
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500";
      case "practice":
        return "bg-cyan-50 dark:bg-cyan-950/30 border-l-4 border-cyan-500";
      case "lab":
        return "bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500";
      default:
        return "";
    }
  };

  const getTypeBadgeStyles = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "practice":
        return "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800";
      case "lab":
        return "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      default:
        return "";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lecture":
        return "Лекция";
      case "practice":
        return "Практика";
      case "lab":
        return "Лабораторная";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      {schedule.map((daySchedule) => {
        const filteredClasses = filterClasses(daySchedule.classes);

        if (filteredClasses.length === 0 && (searchQuery || selectedSubject !== "all" || selectedTeacher !== "all")) {
          return null;
        }

        return (
          <div key={daySchedule.day} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 px-4 sm:px-6 py-3">
              <h2 className="text-white font-semibold text-lg">{daySchedule.day}</h2>
            </div>

            <div className="divide-y divide-border">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <div
                    key={`${daySchedule.day}-${cls.pairNumber}`}
                    className={`p-4 sm:p-6 transition-all hover:shadow-md ${getTypeStyles(cls.type)}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Pair Number and Time */}
                      <div className="flex items-center gap-4 sm:w-48 shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                          {cls.pairNumber}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{cls.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Class Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <h3 className="font-semibold text-lg">{cls.subject}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border w-fit ${getTypeBadgeStyles(cls.type)}`}>
                            {getTypeLabel(cls.type)}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4 shrink-0" />
                            <span>{cls.teacher}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span>Ауд. {cls.classroom}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  Нет занятий
                </div>
              )}
            </div>
          </div>
        );
      })}

      {schedule.every(day => filterClasses(day.classes).length === 0) && (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">Нет занятий по заданным критериям поиска</p>
        </div>
      )}
    </div>
  );
}