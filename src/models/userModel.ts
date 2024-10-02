import mongoose, {Document, Schema} from "mongoose";

interface Iuser extends Document {
    email: string,
    userName: string;
    password: string;
} 

const userSchema: Schema<Iuser> = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
})

const userModel = mongoose.models['user'] || mongoose.model('user', userSchema);
export default userModel;