import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import chalk from 'chalk';

const server = express();
server.use(json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('oi');
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(chalk.magentaBright(`Server is listening on port ${PORT}.`));
});