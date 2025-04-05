import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import { User} from "./db/userSchema";
import jwt from "jsonwebtoken"; // Import your user type
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt; // ✅ Read JWT from cookies

    if (!token) {
         res.status(401).json({ message: "Unauthorized: No token provided" });
         return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return
        }

        req.user = user;
        next();
    } catch (error) {
         res.status(401).json({ message: "Unauthorized: Invalid token" });
        return
    }
};




