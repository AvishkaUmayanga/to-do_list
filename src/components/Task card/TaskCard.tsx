import React, { useState } from "react";
import StatusChangeForm from "../status change/StatusChangeForm";

interface TaskData {
    _id: string;
    taskName: string; 
    priority: string; 
    taskStatus: string,
}

interface CardProps {
    cardData: TaskData[];
}

const TaskCard: React.FC<CardProps> = ({cardData}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTask,setSelectedTask] = useState<TaskData | null>(null);

  const handleOpen = (task: TaskData) => {
    setSelectedTask(task);
    setOpen(true);
  }

  return (
    <>
      {cardData.map(data => (
        <div key={data._id} 
          className={`${data.priority === 'low' ? 'bg-[#EBE7FF]' : data.priority === 'medium' ? 'bg-[#FFDBB1]' : data.priority === 'low'? 'bg-[#FFB1B1]' : ''}
          bg-[#FFDBB1] min-h-20 max-w-28 p-2 flex justify-center items-center relative min-w-20 hover:scale-105 duration-200`
         }
         onClick={()=> handleOpen(data)}
        >
          <div 
            className={`${data.priority === 'low' ? 'border-l-[#EBE7FF]' : data.priority === 'medium' ? 'border-l-[#FFDBB1]' : data.priority === 'low'? 'border-l-[#FFB1B1]' : ''}
              absolute  top-0 right-0 border-t-[#FFCFCF] border-l-[20px]  border-t-[20px] `}>
          </div>
          <h4>{data.taskName}</h4>
        </div> 
      ))}
      <StatusChangeForm open={open} setOpen={setOpen} taskData={selectedTask}/>
    </>
  )
}

export default TaskCard