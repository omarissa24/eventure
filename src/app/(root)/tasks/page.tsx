import { getTasksForUser } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";
import { Task } from "@/types";
import TaskFormDialog from "@/components/shared/TaskFormDialog";

const Tasks = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata.userId as string;

  const tasks = await getTasksForUser({ userId });

  return (
    <div>
      <div className='flex justify-end mr-8 mt-4'>
        <TaskFormDialog userId={userId} type='Create' />
      </div>
      {/* <ul>
        {tasks.map((task: Task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Tasks;
