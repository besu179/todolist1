import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TasksProvider } from "./TasksContext";

export default function RootLayout() {
  return (
    <TasksProvider>
      <StatusBar style="auto" />
      <Stack />
    </TasksProvider>
  );
}
