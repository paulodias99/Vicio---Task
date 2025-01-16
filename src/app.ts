import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import enrollmentRoutes from './routes/enrollmentRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-timezone-offset']
}));

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', enrollmentRoutes);

export default app;