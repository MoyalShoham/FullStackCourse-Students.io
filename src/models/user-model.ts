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
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    id: String,
    tokens: [String]
});

export default mongoose.model('User', userSchema);