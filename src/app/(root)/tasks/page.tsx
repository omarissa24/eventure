import { getTasksForUser } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";
import { Task } from "@/types";
import TaskFormDialog from "@/components/shared/TaskFormDialog";
import { TaskDataTable } from "@/components/shared/TaskDataTable";
import { taskColumns } from "@/components/shared/columns";

const Tasks = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata.userId as string;

  const tasks = await getTasksForUser({ userId });

  return (
    <div>
      <div className='flex justify-end mr-8 mt-4'>
        <TaskFormDialog userId={userId} type='Create' />
      </div>
      <div className='mt-4 mx-7'>
        <TaskDataTable data={tasks} columns={taskColumns} />
      </div>
    </div>
  );
};

export default Tasks;
