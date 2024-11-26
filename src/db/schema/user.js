const mysqlCore = require('drizzle-orm/mysql-core');

const user = mysqlCore.mysqlTable('user', {
  id: mysqlCore.serial('id').primaryKey(),
  username: mysqlCore.varchar('username', {length: 256}),
  email: mysqlCore.varchar('email', {length: 256}),
  password: mysqlCore.varchar('password', {length: 256}),
  createdAt: mysqlCore.timestamp('created_at').defaultNow(),
  createdBy: mysqlCore.int('created_by'),
  updatedAt: mysqlCore.timestamp('updated_at').defaultNow().onUpdateNow(),
  updatedBy: mysqlCore.int('updated_by')
}, (t) => ({
  uniqueUsername: mysqlCore.uniqueIndex('idx_unique_username').on(t.username),
  uniqueEmail: mysqlCore.uniqueIndex('idx_unique_email').on(t.email),
  idxCreatedAt: mysqlCore.index('idx_created_at').on(t.createdAt),
}));

module.exports = user