import TaskForm from "@/components/TaskForm";
import React from "react";
import TaskTable from "@/components/TaskTable";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-col lg:max-w-6xl max-w-md w-full mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Taskinator</h1>
        <TaskForm />
      </div>
      <div className="lg:max-w-6xl max-w-md w-full">
        <TaskTable />
      </div>
    </main>
  );
}
