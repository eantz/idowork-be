const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function generateAccessToken(userId, username) {
  const accessToken = jwt.sign({userId: userId, username: username}, process.env.TOKEN_SECRET, {expiresIn: '1h'});
  const refreshToken = jwt.sign({userId: userId, username: username}, process.env.TOKEN_SECRET, {expiresIn: '1d'});

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}

function regenerateAccessToken(refreshToken) {
  
  const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
  const accessToken = jwt.sign({userId: decoded.userId, username: decoded.username}, process.env.TOKEN_SECRET, {expiresIn: '1h'});
  const newRefreshToken = jwt.sign({userId: decoded.userId, username: decoded.username}, process.env.TOKEN_SECRET, {expiresIn: '1d'});

  return {
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  }
}

module.exports = {
  generateAccessToken,
  regenerateAccessToken,
}