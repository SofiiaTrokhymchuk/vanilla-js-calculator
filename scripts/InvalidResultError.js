export default class InvalidResultError extends Error {
  constructor(message = '', ...args) {
    super(message, ...args);
    this.message = `The result is ${message}`;
    this.name = 'InvalidResultError';
  }
}
