import mongoose, { Document, Schema } from "mongoose";

interface TaskInterface extends Document{
    taskName: string;
    priority: string;
    taskStatus: string;
    userId: string;
}
const taskSchema: Schema<TaskInterface> = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        default: 'todo',
    },
    userId: {
        type: String,
        required: true
    }
})

const taskModel = mongoose.models['task'] || mongoose.model('task', taskSchema);
export default taskModel;