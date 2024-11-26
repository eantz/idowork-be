const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (token === null) {
    return res.status(401).send({
      message: 'unauthenticated'
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send({message: 'forbidden'});
    } 
    
    req.user = user;

    next();
  })
}

module.exports = authenticateToken;