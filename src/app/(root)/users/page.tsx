import React from "react";
import { getAllUsers } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { userColumns } from "@/components/shared/UserColumns";
import { UserDataTable } from "@/components/shared/UserDataTable";

const Users = async () => {
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata.role as string;

  if (role !== "admin") {
    return <h1>You are not authorized to view this page</h1>;
  }

  const users = await getAllUsers();

  return (
    <div className='mt-4 mx-7'>
      <UserDataTable data={users} columns={userColumns} />
    </div>
  );
};

export default Users;
