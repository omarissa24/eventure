"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { taskFormSchema } from "@/lib/validator";
import * as z from "zod";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { taskDefaultValues } from "@/constants";

import { createTask, updateTask } from "@/lib/actions/task.actions";
import { ITask } from "@/lib/database/models/task.model";
import { getEventsByUser } from "@/lib/actions/event.actions";

import { useEffect, useState } from "react";

type TaskFormProps = {
  userId: string;
  type: "Create" | "Update";
  task?: ITask;
  taskId?: string;
};

const TaskForm = ({ userId, type, task, taskId }: TaskFormProps) => {
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

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const organizedEvents = await getEventsByUser({ userId });
        setEvents(organizedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [userId]);

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof taskFormSchema>) {
    if (type === "Create") {
      try {
        const newTask = await createTask({
          task: { ...values, creator: userId },
          path: `/tasks`,
        });

        if (newTask) {
          form.reset();
          router.push("/tasks");
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

        if (updatedTask) {
          router.push("/tasks");
        }
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }
  }

  return <div>Hello from TaskForm</div>;
};

export default TaskForm;
