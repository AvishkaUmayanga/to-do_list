import taskModel from "@/models/taskModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try{
        const {taskId, status} = await req.json();
        const userId = await getDataFromToken(req);

        const existingTask = await taskModel.findOne({_id:taskId, userId});
        if(existingTask){
           existingTask.taskStatus = status;
           await existingTask.save();

           return NextResponse.json({ message: 'Task status updated successfully' }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }
    }
    catch(error){
        console.log('error while change a status', error);
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}