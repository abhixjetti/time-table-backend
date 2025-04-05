import {Router} from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IUser,User } from "../db/userSchema";
const router = Router();

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
// GitHub OAuth Callback
router.get(
    "/github/callback",
    passport.authenticate("github", { session: false }),
    async (req, res) => {
        if (!req.user) {
             res.status(401).json({ message: "Authentication failed" });
            return;
        }

        const user = req.user as IUser;
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        res.cookie("jwt", token, { httpOnly: true, secure: false });
        const redirectURL = `http://localhost:5173/?token=${token}`;
        res.redirect(redirectURL);
    }
);
router.get("/protected", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const user = await User.findById((req.user as any)._id).select("-password");
    res.json({ message: "You are authorized", user });
});
export default router;