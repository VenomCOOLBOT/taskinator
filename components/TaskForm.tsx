"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createTask, deleteAllTasks } from "@/actions/actions";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Task is required!" })
    .max(100, { message: "Cannot exceed 100 characters!" }),
});

export default function TaskForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createTask(values);
    form.reset();
  }

  async function handleRemoveAll() {
      await deleteAllTasks();
      form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="Enter task here..." {...field} />
              </FormControl>
              <FormDescription>This task will be public.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center space-x-4">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="destructive" onClick={handleRemoveAll}>
            Clear
          </Button>
        </div>
      </form>
    </Form>
  );
}
