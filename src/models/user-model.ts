import mongoose from "mongoose";

export interface IUser {
    email: string;
    name: string;
    password: string;
    tokens: string[];
    id: string;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    id: {
        type: String,
        required: false
    },

    tokens: {
        type: [String],
        required: false
    }
});

export default mongoose.model<IUser>('User', userSchema);