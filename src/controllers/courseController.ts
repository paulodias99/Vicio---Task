import { Request, Response } from 'express';
import courseService from '../services/courseService';

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, hours } = req.body;

    const course = await courseService.createCourse({
      title,
      description,
      hours,
    });

    res.status(201).json(course);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};

export const listCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await courseService.listCourses();
    res.status(200).json(courses);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};