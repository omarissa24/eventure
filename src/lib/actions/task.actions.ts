"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/event.model";
import User from "@/lib/database/models/user.model";
import Task from "../database/models/task.model";
import { handleError } from "@/lib/utils";

import {
  CreateTaskParams,
  UpdateTaskParams,
  DeleteTaskParams,
  GetTasksForUserParams,
  GetTasksForEventForAssignedUserParams,
} from "@/types";

const populateTask = (query: any) => {
  return query
    .populate({
      path: "event",
      model: Event,
      select: "_id title",
    })
    .populate({
      path: "creator",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "assignee",
      model: User,
      select: "_id firstName lastName",
    });
};

// CREATE
export async function createTask({ task, path }: CreateTaskParams) {
  try {
    await connectToDatabase();

    const newTask = await Task.create(task);
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newTask));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateTask({ task, path }: UpdateTaskParams) {
  try {
    await connectToDatabase();

    const updatedTask = await Task.findByIdAndUpdate(task._id, task, {
      new: true,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedTask));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteTask({ taskId, path }: DeleteTaskParams) {
  try {
    await connectToDatabase();

    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) throw new Error("Task not found");
    revalidatePath(path);

    return JSON.parse(JSON.stringify(deletedTask));
  } catch (error) {
    handleError(error);
  }
}

// GET TASKS FOR USER
export async function getTasksForUser({ userId }: GetTasksForUserParams) {
  try {
    await connectToDatabase();

    const tasks = await populateTask(
      Task.find({ $or: [{ creator: userId }, { assignee: userId }] })
    );

    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    handleError(error);
  }
}

// GET TASKS FOR EVENT
export async function getTasksForEvent({
  eventId,
  userId,
}: GetTasksForEventForAssignedUserParams) {
  try {
    await connectToDatabase();

    const tasks = await populateTask(
      Task.find({ event: eventId, assignee: userId })
    );

    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    handleError(error);
  }
}
