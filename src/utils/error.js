
class ValidationError extends Error {
  constructor(message) {
    super(message);

    this.name = 'ValidationError';
  }
}

class UsecaseError extends Error {
  constructor(message) {
    super(message);

    this.name = 'UsecaseError';
  }
}

module.exports = {
  ValidationError,
  UsecaseError
}