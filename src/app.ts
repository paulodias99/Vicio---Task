import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import prisma from './config/prisma';
import courseRoutes from './routes/courseRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', courseRoutes);

(async () => {
  try {
    await prisma.$connect();
    console.log('Database connected!');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Database connection failed:', err.message);
    } else {
      console.error('Database connection failed: Unknown error');
    }
  }
})();

export default app;
