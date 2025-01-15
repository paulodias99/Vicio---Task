import { Request, Response } from 'express';
import enrollmentService from '../services/enrollmentService';

export const createEnrollment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, courseId } = req.body;

    const enrollment = await enrollmentService.createEnrollment({ userId, courseId });

    res.status(201).json(enrollment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};

export const getEnrollmentsByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const timezoneOffset = parseInt(req.headers['x-timezone-offset'] as string, 10) || 0;

    const enrollments = await enrollmentService.getEnrollmentsByUserId(Number(userId), timezoneOffset);

    res.status(200).json(enrollments);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};
