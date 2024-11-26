const {generateSecurePassword, validatePassword} = require('../utils/password');
const { createConnection } = require('../db/db');
const userSchema = require('../db/schema/user');
const { validateRegisterInput, validateLoginInput } = require('./auth.internal');
const jwt = require('./../utils/jwt');
const { eq } = require('drizzle-orm');
const { ValidationError } = require('../utils/error');


async function register(username, email, password) {
  validateRegisterInput(username, email, password);

  securePass = generateSecurePassword(password);
  const db =  await createConnection();

  const newUser = await db.insert(userSchema).values({
    username: username,
    email: email,
    password: securePass, 
  });

  const token = jwt.generateAccessToken(newUser[0].insertId, username);

  return token
}

async function login(username, password) {
  validateLoginInput(username, password);

  const db = await createConnection();

  const userData = await db.query.user.findFirst({
    where: (eq(userSchema.username, username))
  });

  if (userData === undefined) {
    throw new ValidationError('User tidak ditemukan');
  }

  if (!validatePassword(password, userData['password'])) {
    throw new ValidationError('Password not match')
  }

  const token = jwt.generateAccessToken(userData.id, username);

  return token
}

async function refreshToken(tokenToRefresh) {
  const token = jwt.regenerateAccessToken(tokenToRefresh);

  return token
}

// refresh token

module.exports = {
  register,
  login,
  refreshToken
}