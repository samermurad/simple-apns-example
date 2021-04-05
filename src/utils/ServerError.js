class ServerError extends Error {

  constructor(message, httpCode = 500) {
    super(message);
    this.message = message;
    this.code = httpCode;
    Error.captureStackTrace(this, ServerError);
  }

  toResJson() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
ServerError.prototype.message = ServerError.message;

module.exports = ServerError;
