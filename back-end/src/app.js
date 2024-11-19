import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';  // Certifique-se de que a rota 'users' está sendo carregada

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());  // Certifique-se de que o middleware está aqui


// Rota para a página inicial, para testar se a API está funcionando
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Definição de rotas principais
app.use('/', indexRouter);  // Página inicial ou rota de index
app.use('/api/users', usersRouter);  // Certifique-se de que está usando o prefixo '/api/users'

// Outras rotas
import movimentacoesRouter from './routes/movimentacaoEstoque.js';
app.use('/api/movimentacoes', movimentacoesRouter);

import usuariosRouter from './routes/usuario.js';  // Aqui, você está tentando usar '/usuarios'
app.use('/api/usuarios', usuariosRouter);

import empresasRouter from './routes/empresa.js';
app.use('/api/empresas', empresasRouter);

import produtosRouter from './routes/produtos.js';
app.use('/api/produtos', produtosRouter);

// Fallback para rotas inexistentes (deve ser a última rota)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

export default app;
