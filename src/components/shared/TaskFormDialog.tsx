"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import TaskForm from "./TaskForm";
import { taskFormSchema } from "@/lib/validator";
import { createTask, updateTask } from "@/lib/actions/task.actions";
import { ITask } from "@/lib/database/models/task.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskDefaultValues } from "@/constants";

type TaskFormDialogProps = {
  userId: string;
  type: "Create" | "Update";
  task?: ITask;
  taskId?: string;
  isOpen?: boolean;
  isInTable?: boolean;
  onClose?: () => void;
};

const TaskFormDialog = ({
  userId,
  type,
  task,
  taskId,
  isOpen,
  isInTable,
  onClose,
}: TaskFormDialogProps) => {
  const initialValues =
    task && type === "Update"
      ? {
          ...task,
          assignee: task.assignee._id,
          event: task.event._id,
          creator: userId,
        }
      : taskDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: z.infer<typeof taskFormSchema>) => {
    if (type === "Create") {
      try {
        const newTask = await createTask({
          task: { ...values, creator: userId },
          path: `/tasks`,
        });

        if (newTask) {
          form.reset();
          router.push("/tasks");
          if (onClose) {
            onClose();
          }
        }
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    } else if (type === "Update") {
      try {
        const updatedTask = await updateTask({
          task: { ...values, _id: taskId! },
          path: "/tasks",
        });

        console.log(updatedTask);

        if (updatedTask) {
          router.push("/tasks");
          if (onClose) {
            onClose();
          }
        }
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {!isInTable && (
        <DialogTrigger asChild>
          <Button variant='default'>
            {type === "Create" ? "Create Task" : "Edit Task"}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle>
            {type === "Create" ? "Create Task" : "Edit Task"}
          </DialogTitle>
          <DialogDescription>
            {type === "Create"
              ? "Fill in the details to create a new task."
              : "Edit the task details below."}
          </DialogDescription>
        </DialogHeader>
        <TaskForm
          userId={userId}
          type={type}
          task={task}
          taskId={taskId}
          onSubmit={onSubmit}
          formState={form.formState}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='submit'
              form='task-form'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : type === "Create"
                ? "Create Task"
                : "Update Task"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
