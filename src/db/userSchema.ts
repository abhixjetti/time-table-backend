import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    githubId: string;
    username: string;
    isAdmin: boolean;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    githubId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model<IUser>('User', UserSchema);