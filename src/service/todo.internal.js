const { ValidationError } = require('../utils/error');
const { isEmpty, isIn } = require('validator');
const { isDateTimeRFC3339 } = require('../utils/validation');
const { parseRFC3339Datetime } = require('../utils/datetime');

const ALLOWED_TODO_STATUS = ["NEW", "DONE"];
const ALLOWED_LIST_TODO_STATUS = ["ALL", "NEW", "DONE"];

function validateCreateTodo(message, scheduledAt) {
  if(message === undefined || isEmpty(message)) {
    throw new ValidationError('Message is required');
  }

  if(!isEmpty(scheduledAt) && !isDateTimeRFC3339(scheduledAt)) {
    throw new ValidationError('Schedule is in wrong format');
  }
}

function validateUpdateTodo(message, status, scheduledAt) {
  if(message === undefined && status === undefined && scheduledAt === undefined) {
    throw new ValidationError("One of the update parameter should be present")
  }

  if(isEmpty(message) && isEmpty(status) && isEmpty(scheduledAt)) {
    throw new ValidationError("One of the update parameter should be present")
  }

  if(status !== undefined && !isEmpty(status)) {
    if(!isIn(status, ALLOWED_TODO_STATUS)) {
      throw new ValidationError("Status value is not allowed");
    }
    
  }

  if(scheduledAt !== undefined && !isEmpty(scheduledAt) && !isDateTimeRFC3339(scheduledAt)) {
    throw new ValidationError('Schedule is in wrong format');
  }
}

function generateTodoToUpdate(message, status, scheduledAt) {
  dataToUpdate = {}

  if(message !== undefined && !isEmpty(message)) {
    dataToUpdate['message'] = message;
  }

  if(status !== undefined && !isEmpty(status)) {
    dataToUpdate['status'] = status
  }

  if(scheduledAt !== undefined && !isEmpty(scheduledAt)) {
    dataToUpdate = parseRFC3339Datetime(scheduledAt)
  }

  return dataToUpdate;
}

function validateDeleteTodo(todoId) {
  if(todoId === undefined || todoId === '') {
    throw new ValidationError("ID is required");
  }
}

function validateGetListTodo(status) {
  if(!isIn(status, ALLOWED_LIST_TODO_STATUS)) {
    throw new ValidationError("Status value is not allowed");
  }
}

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  generateTodoToUpdate,
  validateDeleteTodo,
  validateGetListTodo
}