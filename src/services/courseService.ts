import CourseRepository from '../repositories/courseRepository';

const createCourse = async (data: { title: string; description: string; hours: number }) => {
  return CourseRepository.create(data);
};

const listCourses = async () => {
  return CourseRepository.findAll();
};

export default { createCourse, listCourses };
