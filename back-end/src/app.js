import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)

/*************** ROTAS *******************/

import movimentacoesRouter from './routes/movimentacaoEstoque.js'
app.use('/movimentacoes', movimentacoesRouter)

import usuariosRouter from './routes/usuario.js'
app.use('/usuarios', usuariosRouter)

import empresasRouter from './routes/empresa.js'
app.use('/empresas', empresasRouter)

import produtosRouter from './routes/produtos.js'
app.use('/produtos', produtosRouter)

export default app