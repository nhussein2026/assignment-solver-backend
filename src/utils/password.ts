// src/utils/password.ts
import bcrypt from "bcrypt";

// Hash a plain text password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare plain text password with hashed one
export const comparePassword = async (candidate: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(candidate, hashed);
};
