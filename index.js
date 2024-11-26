const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRouter = require('./src/router/auth');
const todoRouter = require('./src/router/todo');
const errorHandler = require('./src/middleware/error');
const responseMiddleware = require('./src/middleware/response');

dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(responseMiddleware)

app.use('/auth/', authRouter);
app.use('/todo/', todoRouter);

app.use(errorHandler)

const server = app.listen(port, () => {
  console.log(`App running, listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Closing server now...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });
});