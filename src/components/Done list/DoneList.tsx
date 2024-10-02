import React from "react";
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

const DoneList: React.FC<TaskProps> = ({tasks}) => {
  return (
    <div className=" bg-[#CEFFBC] p-4  flex flex-col gap-2">
      <h1 className=" font-semibold text-2xl">Done</h1>
        <div className="flex gap-3 flex-wrap">
          <div className=" grid grid-cols-3 gap-3 mt-3">
            <TaskCard cardData={tasks}/>
        </div>
      </div>
  </div>
  )
}

export default DoneList