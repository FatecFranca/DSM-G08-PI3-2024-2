import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}     // Objeto vazio

controller.create = async function(req, res) {
  try {
    const { saida_entrada, quantidade, produtoId } = req.body;

    // Faz a conferência se os dados foram inseridos
    if (!produtoId || !quantidade || !saida_entrada) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios: produtoId, quantidade, e saida_entrada.' });
    }

    // Cria a movimentação de estoque
    await prisma.movimentacaoEstoque.create({ data: req.body });

    // Busca o produto atual
    const produto = await prisma.produto.findUnique({ where: { id: produtoId } });
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    // Calcula o novo saldo
    const novaQuantidade =
      saida_entrada === 'entrada'
        ? produto.quantidade + quantidade
        : produto.quantidade - quantidade;

    // Atualiza o saldo do produto
    if (novaQuantidade < 0) {
      return res.status(400).json({ message: 'Saldo insuficiente para a saída.' });
    }

    await prisma.produto.update({
      where: { id: produtoId },
      data: { quantidade: novaQuantidade },
    });

    res.status(201).json({ message: 'Movimentação registrada e saldo atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor.', error });
  }
};

controller.retrieveAll = async function(req, res) {
  try {

    const include = includeRelations(req.query)

    // Manda buscar os dados no servidor
    const result = await prisma.movimentacaoEstoque.findMany({

      orderBy: [ { data_movimentacao: 'asc' } ],
      include
    })

    // Retorna os dados obtidos ao cliente com o status
    // HTTP 200: OK (implícito)
    res.send(result)
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    
    const include = includeRelations(req.query) 

    // Manda buscar o documento no servidor usando
    // como critério de busca um id informado no
    // parâmetro da requisição
    const result = await prisma.movimentacaoEstoque.findUnique({
      where: { id: req.params.id },
      include
    })

    // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Não encontrou o documento ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    // Busca o documento pelo id passado como parâmetro e, caso
    // o documento seja encontrado, atualiza-o com as informações
    // passadas em req.body
    const result = await prisma.movimentacaoEstoque.update({
      where: { id: req.params.id },
      data: req.body
    })

    // Encontrou e atualizou ~> retorna HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou) ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.delete = async function(req, res) {
  try {
    // Busca o documento a ser excluído pelo id passado
    // como parâmetro e efetua a exclusão caso encontrado
    await prisma.movimentacaoEstoque.delete({
      where: { id: req.params.id }
    })

    // Encontrou e excluiu ~> HTTP 204: No Content
    res.status(204).end()

  }
  catch(error) {
    if(error?.code === 'P2025') {   // Código erro de exclusão no Prisma
      // Não encontrou e não excluiu ~> HTTP 404: Not Found
      res.status(404).end()
    }
    else {
      // Outros tipos de erro
      console.error(error)

      // Envia o erro ao front-end, com status 500
      // HTTP 500: Internal Server Error
      res.status(500).send(error)
    }
  }
}

export default controller