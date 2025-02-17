import AddTask from "@/components/AddTask";
import { prisma } from "@/utils/prisma";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getData() {
  const data = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      isCompleted: true,
      createdAt: true, // Added to match Task interface
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return data;
}


export default async function Home() {
  const data = await getData();
  return (
    <main>
      <div className="flex-col flex lg:max-w-6xl max-w-md mx-auto mb-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Taskinator</h1>
        <AddTask />
      </div>
      <div className="lg:max-w-6xl max-w-md mx-auto h-screen">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Task Title</TableHead>
            <TableHead>Date Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.createdAt.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </main>
  );
}
