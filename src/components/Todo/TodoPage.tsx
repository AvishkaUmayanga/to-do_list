import TaskCard from "../Task card/TaskCard";

interface Task {
  _id: string;
  taskName: string; 
  priority: string; 
  taskStatus: string,
}

interface TaskProps {
  tasks: Task[]
}

const TodoPage: React.FC<TaskProps> = ({tasks}) => {
  const highPriority = tasks.filter(task => task.priority === 'high');
  const mediumPriority = tasks.filter(task => task.priority === 'medium');
  const lowPriority = tasks.filter(task => task.priority === 'low');
  return (
    <div className=" bg-[#FFCFCF] p-4 flex flex-col gap-2">
      <h2 className=" font-semibold text-2xl">To Do</h2>
      <div className="flex gap-10 justify-between flex-wrap ">
      <div>
        <h3 className=" capitalize">High Priority</h3>
        <div className=" grid grid-cols-3 gap-3">
          <TaskCard cardData={highPriority} />
        </div>
      </div>
      <div>
        <h3 className=" capitalize">Medium Priority</h3>
        <div className=" grid grid-cols-3 gap-3">
          <TaskCard cardData={mediumPriority}/>
        </div>
      </div>
      <div>
        <h3>Low Priority</h3>
        <div className=" grid grid-cols-3 gap-3">
          <TaskCard cardData={lowPriority} />
        </div>
        </div> 
      </div>
    </div>
  )
}

export default TodoPage