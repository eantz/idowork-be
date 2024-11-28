const todoSchema = require('../db/schema/todo');
const { createConnection } = require('../db/db');
const { 
  validateCreateTodo, 
  validateUpdateTodo, 
  generateTodoToUpdate, 
  validateDeleteTodo,
  validateGetListTodo
} = require('./todo.internal')
const { parseRFC3339Datetime } = require('../utils/datetime');
const { eq, and, or, desc, gte, lte } = require('drizzle-orm');
const { UsecaseError } = require('../utils/error');
const dayjs = require('dayjs');

async function createTodo(userId, message, scheduledAt) {
  validateCreateTodo(message, scheduledAt)

  const db =  await createConnection();

  await db.insert(todoSchema).values({
    userId: userId,
    message: message,
    status: "NEW",
    scheduledAt: parseRFC3339Datetime(scheduledAt),
    createdBy: userId,
  });

  return {}
}

async function updateTodo(userId, todoId, message, status, scheduledAt) {
  validateUpdateTodo(message, status, scheduledAt);

  const db =  await createConnection();

  const existingTodo = await db.query.todo.findFirst({
    where: and(eq(todoSchema.id, todoId), eq(todoSchema.userId, userId))
  })

  if(existingTodo == undefined) {
    throw new UsecaseError('Existing todo not found')
  }

  dataToUpdate = generateTodoToUpdate(message, status, scheduledAt)
  
  await db.update(todoSchema)
    .set(dataToUpdate)
    .where(eq(todoSchema.id, todoId))

  return {}
}

async function deleteTodo(userId, todoId) {
  validateDeleteTodo(todoId);

  const db =  await createConnection();

  const existingTodo = await db.query.todo.findFirst({
    where: and(eq(todoSchema.id, todoId), eq(todoSchema.userId, userId))
  });

  if(existingTodo == undefined) {
    throw new UsecaseError('Existing todo not found')
  }

  await db.delete(todoSchema).where(eq(todoSchema.id, todoId));

  return {}
}

async function listTodo(userId, timeConstraint, status, specificDate) {
  status = status === "" || status === undefined ? "ALL" : status;

  validateGetListTodo(timeConstraint, status, specificDate);

  const db =  await createConnection();

  let where = [];
  where.push(eq(todoSchema.userId, userId));

  if(status !== 'ALL') {
    where.push(eq(todoSchema.status, status))
  }
  
  if(timeConstraint === "TODAY") {
    const startDay = dayjs().startOf("day");
    const endDay = dayjs().endOf("day")
    where.push(or(eq(todoSchema.scheduledAt, null), and(gte(todoSchema.scheduledAt, startDay), lte(todoSchema.scheduledAt, endDay))))
  }
  
  const todos = await db.query.todo.findMany({
    where: and(...where),
    orderBy: desc(todoSchema.updatedAt)
  });

  return {
    todos
  }
}

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  listTodo
}