import { ThemeProvider } from "next-themes";
import { ScheduleApp } from "./components/ScheduleApp";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ScheduleApp />
    </ThemeProvider>
  );
}