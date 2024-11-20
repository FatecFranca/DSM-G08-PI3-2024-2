import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Substitutos para __dirname e __filename no contexto de ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Rota inicial para verificar o status do servidor
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Definição de rotas principais
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/movimentacoes', movimentacoesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/produtos', produtosRouter);

// Configuração para produção: servir o frontend
if (process.env.NODE_ENV === 'production') {
  // Define a pasta onde os arquivos estáticos do frontend estão localizados
  app.use(express.static(join(__dirname, '../dist')));

  // Para todas as rotas que não são APIs, serve o arquivo index.html
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

// Tratamento para rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

export default app;
