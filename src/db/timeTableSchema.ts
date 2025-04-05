import mongoose, { Schema, Document } from 'mongoose';

export interface ITimetable extends Document {
    activityCode: string;
    className: string;
    startDate: Date;
    startTime: string;
    endTime: string;
    activityType: string;
    room: string;
    teacher: string;
    group: string;
}

const TimetableSchema = new Schema<ITimetable>({
    activityCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    className: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    activityType: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});

export const Timetable = mongoose.model<ITimetable>('Timetable', TimetableSchema);
