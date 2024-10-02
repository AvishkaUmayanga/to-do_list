'use client';
import { useEffect, useState } from 'react';
import DoneList from "@/components/Done list/DoneList";
import InProgress from "@/components/In progress/InProgress";
import AddTask from "@/components/Task button/AddTask";
import TodoPage from "@/components/Todo/TodoPage";

interface Task {
  _id: string;
  taskName: string; 
  priority: string; 
  taskStatus: string,
}

interface TaskState {
  todoData: Task[];
  pendingData: Task[];
  doneData: Task[];
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskState>({
    todoData: [],
    pendingData: [],
    doneData: []
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tasks', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include'
        });
        const resData: Task[] = await response.json();

        if (Array.isArray(resData)) {
          const todoData = resData.filter((data: Task) => data.taskStatus === 'todo');
          const pendingData = resData.filter((data: Task) => data.taskStatus === 'inProgress');
          const doneData = resData.filter((data: Task) => data.taskStatus === 'done');
          
          setTasks({ todoData, pendingData, doneData });
        }
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex justify-end">
        <AddTask />
      </div>
      <TodoPage tasks={tasks.todoData} />
      <InProgress tasks={tasks.pendingData} />
      <DoneList tasks={tasks.doneData} /> 
    </div>
  );
}

export default Dashboard;
