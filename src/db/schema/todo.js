const mysqlCore = require('drizzle-orm/mysql-core');

const todo = mysqlCore.mysqlTable('todo', {
  id: mysqlCore.serial('id').primaryKey(),
  userId: mysqlCore.int('user_id'),
  message: mysqlCore.varchar('message', {length: 500}),
  status: mysqlCore.varchar('status', {length: 50}),
  scheduledAt: mysqlCore.timestamp('scheduled_at'),
  doneAt: mysqlCore.timestamp('done_at'),
  createdAt: mysqlCore.timestamp('created_at').defaultNow(),
  createdBy: mysqlCore.int('created_by'),
  updatedAt: mysqlCore.timestamp('updated_at').onUpdateNow(),
  updatedBy: mysqlCore.int('updated_by')
}, (t) => ({
  idxUserMessage: mysqlCore.index('idx_user_message').on(t.userId, t.message),
  idxUserStatus: mysqlCore.index('idx_user_status').on(t.userId, t.status),
  idxUserSchedule: mysqlCore.index('idx_user_schedule').on(t.userId, t.scheduledAt),
  idxCreatedAt: mysqlCore.index('idx_created_at').on(t.createdAt),
}));

module.exports = todo