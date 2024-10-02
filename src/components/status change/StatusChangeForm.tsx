'use client';
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TaskData{
  _id: string;
  taskName: string; 
  priority: string; 
  taskStatus: string,
}
interface StatusProps{
    open: boolean;
    setOpen: (open: boolean) => void;
    taskData: TaskData | null;
}

const StatusChangeForm:React.FC<StatusProps> = ({open, setOpen, taskData}) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className=" hidden"></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Change Status</DialogTitle>
          </DialogHeader>
          { taskData ? (<ProfileForm taskData={taskData}/>) : ('No data')}
        </DialogContent>
      </Dialog>
    )
  }

  interface ProfileProps{
    taskData: TaskData
  }
  
  const ProfileForm: React.FC<ProfileProps> = ({ taskData }) => {
    const [status, setStatus] = useState(taskData.taskStatus);
    const router = useRouter();

    const handlePriorityChange = (value: string) => {
      setStatus(value);
    };
    const [message, setMessage] = useState<string | null>(null);
    
    const changeStatus = async(status: string) => {
      const response = await fetch('http://localhost:3000/api/status',
        {
          method: 'PATCH',
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({taskId: taskData._id, status}),
          credentials: 'include'
        }
      )
      if(response.ok){
        const data = await response.json(); 
        setMessage(data.message);
        router.refresh();
      }
      else{
        setMessage(null);
      }
    }
    
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault(); 
      changeStatus(status);
    }
  
    return (
      <form className={cn("grid items-start gap-4")} onSubmit={handleSubmit}>
        { message !== null &&
           <div className="success">
              <p>{message}!</p>
            </div>
        }
        <div className="grid gap-2">
          <Label htmlFor="taskName">Task Name</Label>
          <Input type="text" id="taskName" defaultValue={taskData.taskName} readOnly />
        </div>
        <div className="grid gap-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={handlePriorityChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className=" bg-blue-500 text-white">Save changes</Button>
      </form>
    );
  };
  
export default StatusChangeForm