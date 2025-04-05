import { Request, Response, NextFunction } from "express";
import { Timetable } from "../db/timeTableSchema";

export const createTimetable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { className, activityCode, startDate, startTime, endTime, activityType, room, teacher, group } = req.body;

        const newTimetable = new Timetable({
            className,
            activityCode,
            startDate,
            startTime,
            endTime,
            activityType,
            room,
            teacher,
            group
        });

        await newTimetable.save();
        res.status(201).json({ message: "Timetable created successfully", timetable: newTimetable });
    } catch (error) {
        next(error); // Let Express handle the error
    }
};

export const getAllTimetables = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const timetables = await Timetable.find();
        res.status(200).json(timetables);
    } catch (error) {
        next(error);
    }
};

export const updateTimetable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedTimetable = await Timetable.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTimetable) {
            res.status(404).json({ error: "Timetable not found" });
            return;
        }

        res.status(200).json({ message: "Timetable updated", timetable: updatedTimetable });
    } catch (error) {
        next(error);
    }
};

export const deleteTimetable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedTimetable = await Timetable.findByIdAndDelete(id);

        if (!deletedTimetable) {
            res.status(404).json({ error: "Timetable not found" });
            return;
        }

        res.status(200).json({ message: "Timetable deleted" });
    } catch (error) {
        next(error);
    }
};
