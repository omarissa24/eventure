import { getTasksForUser } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";
import { Task } from "@/types";

const Tasks = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata.userId as string;

  const tasks = await getTasksForUser({ userId });

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
