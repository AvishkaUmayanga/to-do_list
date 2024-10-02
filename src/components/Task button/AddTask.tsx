'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
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

  interface IFormInputs{
    taskName: string,
    priority: string,
}

const AddTask = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const {register, handleSubmit, formState: {errors, isSubmitting}, setValue} = useForm<IFormInputs>();

  const handlePriority = (value: string) => {
    setValue('priority', value, { shouldValidate: true });
  }

  const onSubmit: SubmitHandler<IFormInputs> = async(data) => {
    try{
      const response = await fetch('api/tasks',
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(data),
          credentials: 'include'
        }
      )
      if(!response.ok){
        const errorResponse = await response.json();
        setFormError(errorResponse.message);
        setMessage(null);
        router.refresh();
      }
      else{
        setFormError(null);
        const data = await response.json(); 
        setMessage(data.message);
      }
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <>
    <Dialog >
      <DialogTrigger asChild className=" hover:scale-105 duration-300">
        <Button variant="outline" className=" bg-blue-400 text-white">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        { message !== null &&
           <div className="success">
              <p>{message}!</p>
            </div>
        }
        { formError !== null &&
         <div className="formError">
            <p>{formError}!</p>
          </div>
        }
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="taskName" className="text-right">
              Task
            </Label>
            <Input
              id="taskName"
              className="col-span-3"
              {...register("taskName", {required: true})}
              disabled={isSubmitting}
            />
          </div>
          {errors.taskName && <p className=' text-red-500 text-end -mt-3'>* Task is required.</p>}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priotity" className="text-right">
            Priotity
            </Label>
            <Select onValueChange={handlePriority} disabled={isSubmitting}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Priotity" />
              </SelectTrigger>
              <SelectContent className=" bg-white" >
                <SelectGroup >
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {errors.priority && ( <p className="text-red-500 text-end -mt-3">* Priority is required.</p>)}
        </div>
        <DialogFooter>
          <Button type="submit" className=" bg-blue-400 text-white hover:scale-105" disabled={isSubmitting}>Add Task</Button>
        </DialogFooter>
     </form>
    </DialogContent>
    </Dialog>
    </>
  )
}

export default AddTask