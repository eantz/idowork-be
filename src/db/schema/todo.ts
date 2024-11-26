import { index, int, mysqlTable, timestamp, varchar, serial, text } from 'drizzle-orm/mysql-core';

export const todo = mysqlTable('todo', {
    id: serial('id').primaryKey(),
    userId: int('user_id'),
    message: varchar('message', {length: 500}),
    status: varchar('status', {length: 50}),
    scheduledAt: timestamp('scheduled_at'),
    doneAt: timestamp('done_at'),
    createdAt: timestamp('created_at').defaultNow(),
    createdBy: int('created_by'),
    updatedAt: timestamp('updated_at').onUpdateNow(),
    updatedBy: int('updated_by')
}, (t) => ({
    idxUserMessage: index('idx_user_message').on(t.userId, t.message),
    idxUserStatus: index('idx_user_status').on(t.userId, t.status),
    idxUserSchedule: index('idx_user_schedule').on(t.userId, t.scheduledAt),
    idxCreatedAt: index('idx_created_at').on(t.createdAt),
}));