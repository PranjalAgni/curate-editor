import { Response } from "express";

export const addSessionToken = async (
  res: Response,
  sessionId: string
): Promise<void> => {
  return res.setHeader("authorization", sessionId);
};
