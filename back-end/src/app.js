import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import movimentacoesRouter from './routes/movimentacaoEstoque.js';
import usuariosRouter from './routes/usuario.js';
import produtosRouter from './routes/produtos.js';

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Rota para a página inicial, para testar se a API está funcionando
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Definição de rotas principais
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/movimentacoes', movimentacoesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/produtos', produtosRouter);

// Fallback para rotas inexistentes (deve ser a última rota)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Serve os arquivos estáticos do frontend em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));  // Caminho da build do Vite (pasta public)

  // Serve o index.html para todas as requisições que não forem APIs
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Ajuste para a pasta 'public'
  });
}

export default app;
