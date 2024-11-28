const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./../middleware/auth');
const todoService = require('../service/todo');

const routerTodo = express.Router();

routerTodo.use(bodyParser.json());
routerTodo.use(authMiddleware);

routerTodo.post('/create', async function(req, res, next) {
  try {
    const svcResp = await todoService.createTodo(req.user.userId, req.body.message, req.body.scheduledAt);
    res.json(svcResp);
  } catch (error) {
    next(error)
  }
});

routerTodo.put('/update', async function(req, res, next) {
  try {
    const svcResp = await todoService.updateTodo(req.user.userId, req.body.id, req.body.message, req.body.status, req.body.scheduledAt);
    res.json(svcResp);
  } catch(error) {
    next(error)
  }
});

routerTodo.delete('/delete/:id', async function(req, res, next) {
  try {
    const svcResp = await todoService.deleteTodo(req.user.userId, req.params.id);
    res.json(svcResp);
  } catch(error) {
    next(error)
  }
})

routerTodo.get('/', async function (req, res, next) {
  try {
    const svcResp = await todoService.listTodo(req.user.userId, req.query.timeConstraint, req.query.status, req.query.date);
    res.json(svcResp);
  } catch(error) {
    next(error)
  }
});

module.exports = routerTodo;