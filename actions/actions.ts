"use server";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function createTask({ title }: { title: string }) {
  console.log("Received title:", title);

  if (!title.trim()) {
    console.log("Title is empty, aborting.");
    return;
  }

  await prisma.task.create({
    data: { title },
  });

  console.log("Task created in database");

  revalidatePath("/");
}

export async function deleteAllTasks() {
  try {
    console.log("Deleting all tasks...");

    await prisma.task.deleteMany({}); // Deletes all tasks from the database

    console.log("All tasks deleted successfully");

    revalidatePath("/"); 
  } catch (error) {
    console.error("Error deleting all tasks:", error);
  }
}

export async function taskStatusChange(id: string, isCompleted: boolean) {
  try {
    if (isCompleted) {
      await prisma.task.update({
        where: { id },
        data: { isCompleted: false },
      });
    } else {
      await prisma.task.update({
        where: { id },
        data: { isCompleted: true },
      });
    }
    revalidatePath("/");
  } catch (error) {
    console.log("Error finishing task.");
  }
}
