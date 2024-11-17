import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import prisma from './prismaClient.js';  // Importando a instância do Prisma Client
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();

// Middleware para processar JSON no corpo da requisição
app.use(logger('dev'));
app.use(json());  // Middleware para processar dados em JSON
app.use(urlencoded({ extended: false })); // Middleware para processar dados de formulários
app.use(cookieParser());

// Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Configuração do servidor para escutar na porta 3000 ou qualquer porta definida nas variáveis de ambiente
const port = process.env.PORT || 3000;

// Iniciar o servidor e mostrar no console
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
