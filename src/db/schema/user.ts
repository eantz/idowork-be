import { index, int, mysqlTable, timestamp, varchar, serial, uniqueIndex } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
    id: serial('id').primaryKey(),
    username: varchar('username', {length: 256}),
    email: varchar('email', {length: 256}),
    password: varchar('password', {length: 256}),
    createdAt: timestamp('created_at').defaultNow(),
    createdBy: int('created_by'),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
    updatedBy: int('updated_by')
  }, (t) => ({
    uniqueUsername: uniqueIndex('idx_unique_username').on(t.username),
    uniqueEmail: uniqueIndex('idx_unique_email').on(t.email),
    idxCreatedAt: index('idx_created_at').on(t.createdAt),
  }));