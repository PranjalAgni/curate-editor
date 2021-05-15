import argon from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await argon.hash(password);
  return hashedPassword;
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  let isVerified = false;
  try {
    isVerified = await argon.verify(hashedPassword, password);
  } catch {
    isVerified = false;
  }

  return isVerified;
};
