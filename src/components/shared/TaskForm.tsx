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
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { taskDefaultValues } from "@/constants";

import { createTask, updateTask } from "@/lib/actions/task.actions";
import { ITask } from "@/lib/database/models/task.model";
import { getEventsByUser } from "@/lib/actions/event.actions";
import Image from "next/image";

import { useEffect, useState } from "react";
import { taskStatuses } from "@/constants";
import ItemsDropdown from "./ItemsDropdown";
import { getOrganizers } from "@/lib/actions/user.actions";

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
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const organizedEvents = await getEventsByUser({ userId });
        setEvents(organizedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    const fetchOrganizers = async () => {
      try {
        const assignees = await getOrganizers();
        setAssignees(assignees);
      } catch (error) {
        console.error("Failed to fetch organizers:", error);
      }
    };

    fetchEvents();
    fetchOrganizers();
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-5'
      >
        <div className='flex flex-col gap-5'>
          <FormField
            name='title'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    placeholder='Task Title'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='h-72'>
                  <Textarea
                    placeholder='Description'
                    {...field}
                    className='textarea rounded-2xl'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <ItemsDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    items={taskStatuses}
                    placeholder='Status'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='event'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <ItemsDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    items={events}
                    placeholder='Related Event'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='deadline'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                    <Image
                      src='/assets/icons/calendar.svg'
                      alt='calendar'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <p className='ml-3 whitespace-nowrap text-grey-600'>
                      Deadline:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      dateFormat='MM/dd/yyyy'
                      wrapperClassName='datePicker'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='assignee'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <ItemsDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    items={assignees}
                    placeholder='Assignee'
                    isUsersDropdown
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='button col-span-2 w-full'
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Task`}
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
