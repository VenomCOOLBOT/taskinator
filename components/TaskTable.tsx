import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/utils/prisma";
import TaskButton from "./TaskButton";
import { Checkbox } from "./ui/checkbox";

async function getData() {
  const data = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      isCompleted: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return data;
}

export default async function TaskTables() {
  const data = await getData();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">All Tasks</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox checked={task.isCompleted}/>
                </TableCell>
                <TableCell
                  className={
                    task.isCompleted ? "line-through text-gray-400" : ""
                  }
                >
                  {task.title}
                </TableCell>
                <TableCell className="flex items-center space-x-1">
                  <TaskButton id={task.id} isCompleted={task.isCompleted}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
