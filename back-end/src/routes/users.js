import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/* POST um usuário */
router.post('/', async (req, res) => {
  try {
    const { nome, email, cpf, senha } = req.body;

    // Criando um novo usuário
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        cpf,
        senha,
      },
    });

    // Retorna o usuário criado
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar usuário');
  } finally {
    // Fecha a conexão com o banco de dados
    await prisma.$disconnect();
  }
});

export default router;
