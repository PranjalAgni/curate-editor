declare namespace Express {
  interface Request {
    sessionId?: string;
    user?: import("@entities/User").User;
  }
}

declare module "is-email";
