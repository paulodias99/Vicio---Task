import { Request, Response, NextFunction } from 'express';
import enrollmentService from '../services/enrollmentService';

export const createEnrollment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, courseId } = req.body;
    const enrollment = await enrollmentService.createEnrollment({ userId, courseId });
    res.status(201).json(enrollment);
  } catch (error) {
    next(error);
  }
};

export const getEnrollmentsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const timezoneOffset = parseInt(req.headers['x-timezone-offset'] as string, 10) || 0;

    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid userId parameter' });
      return;
    }

    const enrollments = await enrollmentService.getEnrollmentsByUserId(userId, timezoneOffset);
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};
