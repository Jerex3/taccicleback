module.exports = class HttpError extends Error {

    code = 500;

    constructor(message, code,) {
        super(message); // (1)
        this.code = code; // (2)
      }
}