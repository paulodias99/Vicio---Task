import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import enrollmentRoutes from './routes/enrollmentRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', enrollmentRoutes);

export default app;