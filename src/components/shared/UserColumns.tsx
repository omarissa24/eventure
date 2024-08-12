"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import Image from "next/image";
import { UserDeleteConfirmation } from "./UserDeleteConfirmation";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "photo",
    header: "",
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <Image
            src={row.original.photo}
            alt='user'
            width={32}
            height={32}
            className='rounded-full'
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return `${row.original.firstName} ${row.original.lastName}`;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return <UserDeleteConfirmation clerkId={row.original.clerkId} />;
    },
  },
];
