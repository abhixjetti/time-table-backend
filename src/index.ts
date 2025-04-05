import express from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes";
import timetableRoutes from "./routes/timeTableRoutes";
import {connectDB} from "./db/dbConnect";
import session from "express-session";
import "./oauth-strategy/github-strategy"
import authRoutes from "./routes/authRoutes";
import passport from "passport";


dotenv.config();

const app: express.Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173", // Allow requests from your React frontend
        credentials: true, // Allow cookies to be sent
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(
    session({
        secret: process.env.JWT_SECRET as string,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api", timetableRoutes);
// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
// Start Server
app.listen(PORT, async () => {
    await connectDB()
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});