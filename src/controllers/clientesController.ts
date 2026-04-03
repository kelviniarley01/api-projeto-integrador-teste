import { app } from "../server";
import { ClientesRepository } from "../repositories/clientesRepository";

export function ClientesController() {
  const repository = new ClientesRepository();

  app.get("/clientes", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const cliente = repository.buscarPorNome(nome as string);
      if (!cliente) return response.status(404).json({ erro: "Cliente não encontrado" });
      return response.json(cliente);
    }

    response.json(repository.listar());
  });

  app.get("/clientes/:id", (requisite, response) => {
    const id = parseInt(requisite.params.id);
    const cliente = repository.buscarPorId(id);
    if (!cliente) return response.status(404).json({ erro: "Cliente não encontrado" });
    response.json(cliente);
  });

  app.post("/clientes", (requisite, response) => {
    try {
      const { nome, cpf, idade, email, senha } = requisite.body;

      if (!nome || nome.trim().length === 0) throw new Error("Nome é obrigatório");
      if (!cpf || cpf.trim().length === 0) throw new Error("CPF é obrigatório");
      if (idade < 0) throw new Error("Idade inválida");
      if (!email || email.trim().length === 0) throw new Error("Email é obrigatório");
      if (!senha || senha.trim().length === 0) throw new Error("Senha é obrigatória");

      const cliente = repository.salvar({ nome, cpf, idade, email, senha });
      response.status(201).json(cliente);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      response.status(400).json({ erro: mensagem });
    }
  });
}