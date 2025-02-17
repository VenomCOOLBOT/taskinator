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
  