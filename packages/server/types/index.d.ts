declare namespace Express {
  interface Request {
    userId?: number;
    user: import("@entities/User").User;
  }
}

declare module "is-email";
