"use client";
import { taskStatusChange } from "@/actions/actions";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useTransition } from "react";

export default function TaskButton({
  id,
  isCompleted,
}: {
  id: string;
  isCompleted: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function StatusIcon() {
    if (isPending) {
      return <Loader2 className="w-4 h-4 animate-spin" />;
    }
    return isCompleted ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />;
  }

  return (
    <Button
      onClick={() => startTransition(() => taskStatusChange(id, isCompleted))}
      disabled={isPending}
      className={`${
        isCompleted
          ? "bg-red-200 hover:bg-red-300 text-red-800 hover:text-red-900 focus:outline-red-800"
          : "bg-green-200 hover:bg-green-300 text-green-800 hover:text-green-900 focus:outline-green-800"
      } outline-1 focus:outline shadow-md transition hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {StatusIcon()}
    </Button>
  );
}
