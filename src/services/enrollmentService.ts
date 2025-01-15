import EnrollmentRepository from '../repositories/enrollmentRepository';

const createEnrollment = async (data: { userId: number; courseId: number }) => {
  return EnrollmentRepository.create(data);
};

const getEnrollmentsByUserId = async (userId: number, timezoneOffset: number) => {
  const enrollments = await EnrollmentRepository.findByUserId(userId);

  return enrollments.map((enrollment) => {
    const adjustedEnrolledAt = new Date(
      enrollment.enrolledAt.getTime() - timezoneOffset * 60000
    );

    return {
      ...enrollment,
      enrolledAt: adjustedEnrolledAt.toISOString(),
    };
  });
};

export default { createEnrollment, getEnrollmentsByUserId };
