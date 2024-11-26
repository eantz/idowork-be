
const crypto = require('crypto');

// Function to generate a secure hashed password
function generateSecurePassword(password) {
    const salt = crypto.randomBytes(16).toString('hex'); // Generate a 16-byte salt
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); // Hash the password using PBKDF2
    return `${salt}:${hash}`; // Return the salt and the hashed password, separated by a colon
}

function validatePassword(providedPassword, storedHashedPassword) {
  const [salt, originalHash] = storedHashedPassword.split(':'); // Split the salt and the original hash
  const hash = crypto.pbkdf2Sync(providedPassword, salt, 1000, 64, 'sha512').toString('hex'); // Hash the provided password with the same salt
  return hash === originalHash; // Compare the hashes
}

module.exports = {
  generateSecurePassword,
  validatePassword
}