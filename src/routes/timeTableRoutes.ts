import express from "express";
import { createTimetable, getAllTimetables, updateTimetable, deleteTimetable } from "../functions/helperFunction";
import {authenticateJWT} from "../authMiddleware";

const router = express.Router();

router.post("/timetables",authenticateJWT,createTimetable);
router.get("/timetables",getAllTimetables);
router.put("/timetables/:id",authenticateJWT, updateTimetable);
router.delete("/timetables/:id",authenticateJWT, deleteTimetable);

export default router;
