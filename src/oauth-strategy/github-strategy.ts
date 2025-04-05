import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import dotenv from "dotenv";
import { User, IUser } from "../db/userSchema";
import jwt from "jsonwebtoken";

dotenv.config();
const generateToken = (user: IUser) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};
// GitHub Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            callbackURL: process.env.GITHUB_CALLBACK_URL!,
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: IUser) => void) => {
            try {
                let user = await User.findOne({ githubId: profile.id });

                if (!user) {
                    user = await User.create({
                        email: profile.emails?.[0]?.value || "",
                        githubId: profile.id,
                        username: profile.username || "unknown",
                    });
                }
                const token = generateToken(user);
                done(null, user);
            } catch (error) {
                done(error, undefined);
            }
        }
    )
);

// JWT Strategy
const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload: { id: string }, done) => {
        try {
            const user = await User.findById(payload.id);
            if (user) return done(null, user);
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    })
);

passport.serializeUser((user: Express.User, done) => {
    done(null, (user as IUser)._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user || null);
    } catch (error) {
        done(error, null);
    }
});
