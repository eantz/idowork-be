const express = require('express');
const bodyParser = require('body-parser');

const authService = require('../service/auth');

const router = express.Router();

router.use(bodyParser.json());

router.post('/register', async function(req, res, next) {
  try {
    const svcResp = await authService.register(req.body.username, req.body.email, req.body.password);
    res.json(svcResp);
  } catch (error) {
    next(error)
  }
});

router.post('/login', async function(req, res, next) {
  try {
    const svcResp = await authService.login(req.body.username, req.body.password);
    res.json(svcResp);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh-token', async function(req, res, next) {
  try {
    const token = await authService.refreshToken(req.body.refreshToken)
    res.json(token);
  } catch(error) {
    next(error);
  }
  
});

module.exports = router;