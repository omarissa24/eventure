"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Task } from "@/types";

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
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
    header: "Actions",
  },
];
