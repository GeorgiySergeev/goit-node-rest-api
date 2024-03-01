import bcrypt from 'bcrypt';

export const createHashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
};
