import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        await mongoose.connect(mongoURI, {
            // These options are recommended for modern MongoDB drivers
            retryWrites: true,
            w: 'majority'
        });

        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        // Exit process with failure
        process.exit(1);
    }
};