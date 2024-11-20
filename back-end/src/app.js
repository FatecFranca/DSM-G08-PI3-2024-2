import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url'; // Import necessário para __dirname em ES Modules

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import movimentacoesRouter from './routes/movimentacaoEstoque.js';
import usuariosRouter from './routes/usuario.js';
import produtosRouter from './routes/produtos.js';

const app = express();

// Define o equivalente a __dirname para ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

// Serve os arquivos estáticos do frontend em produção
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../primeInventory/public');
  app.use(express.static(distPath)); // Serve arquivos estáticos do build

  // Serve o index.html para todas as rotas não definidas
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Fallback para rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

export default app;
