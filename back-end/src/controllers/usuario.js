import prisma from '../database/client.js';

const controller = {}; // Objeto vazio para os métodos do controlador

// Método para criar um novo usuário
controller.create = async function (req, res) {
  try {
    const { nome, email, cpf, senha } = req.body;

    if (!nome || !email || !cpf || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        cpf,
        senha,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
};

// Método para login de usuário
controller.login = async function (req, res) {
  try {
    const { email, senha } = req.body;

    // Busca o usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    // Verifica a senha
    if (usuario.senha !== senha) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    // Retorna o `id` do usuário autenticado
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      userId: usuario.id, // Aqui está o ObjectID
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

// Método para recuperar todos os usuários
controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.usuario.findMany({
      orderBy: [{ nome: 'asc' }],
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Método para recuperar um único usuário pelo ID
controller.retrieveOne = async function (req, res) {
  try {
    const result = await prisma.usuario.findUnique({
      where: { id: req.params.id },
    });

    if (result) res.send(result);
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Método para atualizar os dados de um usuário pelo ID
controller.update = async function (req, res) {
  try {
    const result = await prisma.usuario.update({
      where: { id: req.params.id },
      data: req.body,
    });

    if (result) res.status(204).end();
    else res.status(404).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Método para deletar um usuário pelo ID
controller.delete = async function (req, res) {
  try {
    await prisma.usuario.delete({
      where: { id: req.params.id },
    });

    res.status(204).end();
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end(); // Código de erro para registro não encontrado
    } else {
      console.error(error);
      res.status(500).send(error);
    }
  }
};

export default controller;
