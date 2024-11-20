import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}     // Objeto vazio

controller.create = async function(req, res) {
  try {
    await prisma.produto.create({ data: req.body })
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.produto.findMany({
      include,
      orderBy: [ { nome: 'asc' } ]
    })
    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.produto.findUnique({
      where: { id: req.params.id },
      include
    })
    if(result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveByUsuarioId = async function(req, res) {
  try {
    const { usuarioId } = req.params;

    // Busca produtos pelo usuárioId
    const result = await prisma.produto.findMany({
      where: { usuarioId },
      orderBy: [ { nome: 'asc' } ]
    });

    // Retorna os produtos encontrados ou uma lista vazia
    res.send(result);
  }
  catch(error) {
    console.error(error);
    res.status(500).send(error);
  }
}

controller.update = async function (req, res) {
  try {
    // Encontrar o produto original para calcular a diferença de quantidade
    const produtoOriginal = await prisma.produto.findUnique({
      where: { id: req.params.id },
    });

    // Atualizar o produto sem incluir o 'id' nos dados
    const produtoAtualizado = await prisma.produto.update({
      where: { id: req.params.id },  // Identifica qual produto será atualizado
      data: {
        nome: req.body.nome,
        descricao: req.body.descricao,
        quantidade: req.body.quantidade,
        preco: req.body.preco,
        status: req.body.status,
        usuarioId: req.body.usuarioId,  // Não inclua 'id' aqui
      },
    });

    // Verificar se houve alteração na quantidade e realizar movimentação de estoque
    if (req.body.quantidade !== undefined && req.body.quantidade !== produtoOriginal.quantidade) {
      const diferencaQuantidade = req.body.quantidade - produtoOriginal.quantidade;
      const tipoMovimentacao = diferencaQuantidade > 0 ? "entrada" : "saida";

      await prisma.movimentacaoEstoque.create({
        data: {
          saida_entrada: tipoMovimentacao,
          quantidade: Math.abs(diferencaQuantidade),
          produtoId: produtoAtualizado.id,
        },
      });
    }

    res.status(204).end();  // Retorna sucesso, sem conteúdo
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};


controller.delete = async function(req, res) {
  try {
    await prisma.produto.delete({
      where: { id: req.params.id }
    })
    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') {  
      res.status(404).end()
    }
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

export default controller
