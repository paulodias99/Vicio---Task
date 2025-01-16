import { Request, Response, NextFunction } from 'express';
import enrollmentService from '../services/enrollmentService';
import { CreateEnrollmentRequest } from "../@types/types";
import userService from '../services/userService';

export const createEnrollment = async (req: CreateEnrollmentRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, courseId } = req.body;
    const enrollment = await enrollmentService.createEnrollment({ userId, courseId });
    res.status(201).json(enrollment);
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const getEnrollmentsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const timezoneOffsetRaw = req.headers['x-timezone-offset'];
        const timezoneOffset = timezoneOffsetRaw ? parseInt(timezoneOffsetRaw as string, 10) : 0;

        if (isNaN(userId)) {
            res.status(400).json({ error: 'Invalid userId parameter' });
            return;
        }

        if (isNaN(timezoneOffset)) {
            res.status(400).json({ error: 'Invalid timezone offset' });
            return;
        }

        const enrollments = await enrollmentService.getEnrollmentsByUserId(userId, timezoneOffset);

        res.status(200).json(enrollments);
        return;
    } catch (error) {
        return next(error);
    }
};
  
