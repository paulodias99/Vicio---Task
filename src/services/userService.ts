import userRepository from '../repositories/userRepository';

export default {
  async createUser(data: { name: string; email: string; password: string }) {
    return userRepository.createUser(data);
  },

  async getUserById(id: number, timezoneOffset: number) {
    const user = await userRepository.findUserById(id);
    if (!user) return null;

    const adjustedDate = new Date(user.createdAt);
    adjustedDate.setMinutes(adjustedDate.getMinutes() - timezoneOffset);

    const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const offsetMinutes = Math.abs(timezoneOffset) % 60;
    const offsetSign = timezoneOffset <= 0 ? '+' : '-';
    const formattedDate = `${adjustedDate.toISOString().replace('Z', '')}${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: formattedDate,
    };
  },
};
