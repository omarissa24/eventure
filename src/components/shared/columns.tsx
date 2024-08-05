"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Task } from "@/types";
import { ActionsDropdown } from "./ActionsDropdown";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className='w-48 truncate'>{row.original.description}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Date(row.original.deadline).toLocaleDateString();
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => {
      return `${row.original.assignee.firstName} ${row.original.assignee.lastName}`;
    },
  },
  {
    accessorKey: "creator",
    header: "Creator",
    cell: ({ row }) => {
      return `${row.original.creator.firstName} ${row.original.creator.lastName}`;
    },
  },
  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => {
      return row.original.event.title;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <ActionsDropdown
          task={row.original}
          userId={row.original.creator._id}
        />
      );
    },
  },
];
