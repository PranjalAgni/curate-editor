class UnprocessableEntity extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.name = this.constructor.name;
  }
}

export default UnprocessableEntity;
