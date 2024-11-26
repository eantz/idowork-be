const { ValidationError, UsecaseError } = require("../utils/error");

function errorHandler(err, req, res, next) {
  if (err === undefined) {
    next();
  }

  let statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  if (err instanceof ValidationError) {
    statusCode = 400
  } else if (err instanceof UsecaseError) {
    statusCode = 500
  } else {
    console.log(err.stack);
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });

  next();
}

module.exports = errorHandler;