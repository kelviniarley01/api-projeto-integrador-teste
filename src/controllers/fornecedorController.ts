import { app } from "../server";
import { FornecedorRepository } from "../repositories/fornecedorRepository";

export function FornecedorController() {
  const repository = new FornecedorRepository();

  app.get("/fornecedores", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const fornecedor = repository.buscarPorNome(nome as string);
      if (!fornecedor) return response.status(404).json({ erro: "Fornecedor não encontrado" });
      return response.json(fornecedor);
    }

    response.json(repository.listar());
  });

  app.get("/fornecedores/:id", (requisite, response) => {
    const id = parseInt(requisite.params.id);
    const fornecedor = repository.buscarPorId(id);
    if (!fornecedor) return response.status(404).json({ erro: "Fornecedor não encontrado" });
    response.json(fornecedor);
  });

  app.post("/fornecedores", (requisite, response) => {
    try {
      const { nome, nome_produto, cnpj } = requisite.body;

      if (!nome || nome.trim().length === 0) throw new Error("Nome é obrigatório");
      if (!nome_produto || nome_produto.trim().length === 0) throw new Error("Nome do produto é obrigatório");
      if (!cnpj || cnpj.trim().length === 0) throw new Error("CNPJ é obrigatório");

      const fornecedor = repository.salvar({ nome, nome_produto, cnpj });
      response.status(201).json(fornecedor);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      response.status(400).json({ erro: mensagem });
    }
  });
}