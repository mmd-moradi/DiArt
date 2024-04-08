import bcrypt from "bcrypt";
export const comparePassword = async function (
  hashedPassword: string,
  password: string,
) {
  try {
    return await bcrypt.compare(hashedPassword, password);
  } catch (error) {
    throw error;
  }
};
