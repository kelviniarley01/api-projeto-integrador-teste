import { app } from "../server";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController() {
  const repository = new ProdutoRepository();

app.get("/produtos", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const produto = repository.buscarPorNome(nome as string);
      if (!produto) return response.status(404).json({ erro: "Produto não encontrado" });
      return response.json(produto);
    }

    response.json(repository.listar());
  });

  app.get("/produtos/:id", (requisite, response) => {
    const id = parseInt(requisite.params.id);
    const produto = repository.buscarPorId(id);
    if (!produto) return response.status(404).json({ erro: "Produto não encontrado" });
    response.json(produto);
  });

  app.post("/produtos", (requisite, response) => {
    try {
      const { nome_produto, descricao, tamanho, id_categoria, preco, estoque } = requisite.body;

      if (!nome_produto || nome_produto.trim().length === 0) throw new Error("Nome do produto é obrigatório");
      if (!descricao || descricao.trim().length === 0) throw new Error("Descrição é obrigatória");
      if (!tamanho || tamanho.trim().length === 0) throw new Error("Tamanho é obrigatório");
      if (!id_categoria) throw new Error("Categoria é obrigatória");
      if (preco <= 0) throw new Error("Preço deve ser maior que zero");
      if (estoque < 0) throw new Error("Estoque não pode ser negativo");

      const produto = repository.salvar({ nome_produto, descricao, tamanho, id_categoria, preco, estoque });
      response.status(201).json(produto);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      response.status(400).json({ erro: mensagem });
    }
  });
}