import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log('DB connected..');
    }
    catch(err){
        console.log('DB error', err)
    }
}