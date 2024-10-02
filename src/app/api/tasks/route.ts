import taskModel from "@/models/taskModel";
import { connectDB } from "@/utils/connect";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        await connectDB();
        const {taskName, priority } = await req.json();
        const userId:string = await getDataFromToken(req);
        
        const existingTask = await taskModel.findOne({taskName, userId});
        if(existingTask){
            return NextResponse.json({message: 'Task already exists.'}, { status: 403});
        }
        const newTask = new taskModel({
            userId,
            taskName,
            priority
        })
        const savedTask = await newTask.save();
        console.log(savedTask);

        return NextResponse.json({message: 'Task added successfull'}, {status: 201})
    }
    catch(error){
        console.log('error while adding a task', error);
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}

export async function GET(req: NextRequest) {
    try{
        await connectDB();
        const userId:string = await getDataFromToken(req);

        const tasks = await taskModel.find({userId});
        if(!tasks){
            return NextResponse.json({message: 'No tasks'}, { status: 400});
        }
        return NextResponse.json(tasks, {status: 200})
    }
    catch(error){
        console.log('error while adding a task', error);
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}