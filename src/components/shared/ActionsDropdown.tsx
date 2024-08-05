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
import { deleteTask } from "@/lib/actions/task.actions";
import { Task } from "@/types";
import { ITask } from "@/lib/database/models/task.model";
import { DeleteTaskConfirmation } from "./DeleteTaskConfirmation";

interface ActionsDropdownProps {
  task: Task;
  userId: string;
}

export function ActionsDropdown({ task, userId }: ActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='outline'>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            TaskFormDialog({
              userId,
              type: "Update",
              task: task as ITask,
            });
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteTaskConfirmation taskId={task._id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
