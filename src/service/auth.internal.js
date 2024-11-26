const { ValidationError } = require('../utils/error');
const { isEmail, isEmpty } = require('validator');

function validateRegisterInput(username, email, password) {
  if(isEmpty(username)) {
    throw new ValidationError('Username is required');
  }

  if(isEmpty(email)) {
    throw new ValidationError('Email is required');
  }

  if(isEmpty(password)) {
    throw new ValidationError('Password is required');
  }

  if(!isEmail(email)) {
    throw new ValidationError('Email is not valid');
  }

  return true;
}

function validateLoginInput(username, password) {
  if(isEmpty(username)) {
    throw new ValidationError('Username is required');
  }

  if(isEmpty(password)) {
    throw new ValidationError('Password is required');
  }

  return true;
}

module.exports = {
  validateRegisterInput,
  validateLoginInput
}