import { Request, Response } from 'express';
import courseService from '../services/courseService';
import { CreateCourseRequest } from "../@types/types";

export const createCourse = async (req: CreateCourseRequest, res: Response): Promise<void> => {
  try {
    const { title, description, hours } = req.body;

    const course = await courseService.createCourse({
      title,
      description,
      hours,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await courseService.listCourses();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};