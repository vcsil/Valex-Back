import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import chalk from 'chalk';
import router from './routes/router';

const server = express();
server.use(json());
server.use(cors());
server.use(router);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(chalk.magentaBright(`Server is listening on port ${PORT}.`));
});