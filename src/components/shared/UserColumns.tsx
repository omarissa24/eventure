"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import Image from "next/image";

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
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
