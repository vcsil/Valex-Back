import express, { json } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import chalk from 'chalk';
dotenv.config();

import errorHandler from './middlewares/errorHandlingMiddleware';
import router from './routes/router';

const server = express();
server.use(json());
server.use(cors());
server.use(router);
server.use(errorHandler);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(chalk.magentaBright(`Server is listening on port ${PORT}.`));
});