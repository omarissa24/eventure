import { getTasksForUser } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";
import { Task } from "@/types";
import TaskForm from "@/components/shared/TaskForm";

const Tasks = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata.userId as string;

  const tasks = await getTasksForUser({ userId });

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm userId={userId} type='Create' />
      <ul>
        {tasks.map((task: Task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
