import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import TaskFormDialog from "./TaskFormDialog";
import { Task } from "@/types";
import { ITask } from "@/lib/database/models/task.model";
import { DeleteTaskConfirmation } from "./DeleteTaskConfirmation";
import { deleteTask } from "@/lib/actions/task.actions";

interface ActionsDropdownProps {
  task: Task;
  userId: string;
}

export const ActionsDropdown = ({ task, userId }: ActionsDropdownProps) => {
  const handleEditClick = () => {
    TaskFormDialog({
      userId,
      type: "Update",
      task: task as ITask,
    });
  };

  const handleDeleteClick = () => {
    // DeleteTaskConfirmation({ taskId: task._id });
    deleteTask({ taskId: task._id, path: `/tasks` });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteClick}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
