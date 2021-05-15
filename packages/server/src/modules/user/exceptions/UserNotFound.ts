class UserNotFound extends Error {
  extra: unknown;
  constructor(message: string, extra: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
  }
}

export default UserNotFound;
