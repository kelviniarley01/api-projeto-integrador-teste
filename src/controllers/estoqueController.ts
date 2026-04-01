import { app } from "../server";
import { EstoqueRepository } from "../repositories/estoqueRepository";

export function EstoqueController() {
  const repository = new EstoqueRepository();

  app.get("/estoque", (requisite, response) => {
    const { nome_produto } = requisite.query;

    if (nome_produto) {
      const estoque = repository.buscarPorNomeProduto(nome_produto as string);
      if (!estoque) return response.status(404).json({ erro: "Produto no estoque não encontrado" });
      return response.json(estoque);
    }

    response.json(repository.listar());
  });

  app.get("/estoque/:id", (requisite, response) => {
    const id = parseInt(requisite.params.id);
    const estoque = repository.buscarPorId(id);
    if (!estoque) return response.status(404).json({ erro: "Produto no estoque não encontrado" });
    response.json(estoque);
  });

  app.post("/estoque", (requisite, response) => {
    try {
      const { nome_produto, id_produto, quantidade } = requisite.body;

      if (!nome_produto || nome_produto.trim().length === 0) throw new Error("Nome do produto é obrigatório");
      if (id_produto <= 0) throw new Error("ID do produto inválido");
      if (quantidade < 0) throw new Error("Quantidade não pode ser negativa");

      const estoque = repository.salvar({ nome_produto, id_produto, quantidade });
      response.status(201).json(estoque);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      response.status(400).json({ erro: mensagem });
    }
  });
}