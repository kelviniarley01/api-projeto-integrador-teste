import { app } from "../server";
import { FuncionarioRepository } from "../repositories/funcionarioRepository";

export function FuncionarioController() {
  const repository = new FuncionarioRepository();

  app.get("/funcionarios", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const funcionario = repository.buscarPorNome(nome as string);
      if (!funcionario) return response.status(404).json({ erro: "Funcionário não encontrado" });
      return response.json(funcionario);
    }

    response.json(repository.listar());
  });

  app.get("/funcionarios/:id", (requisite, response) => {
    const id = parseInt(requisite.params.id);
    const funcionario = repository.buscarPorId(id);
    if (!funcionario) return response.status(404).json({ erro: "Funcionário não encontrado" });
    response.json(funcionario);
  });

  app.post("/funcionarios", (requisite, response) => {
    try {
      const { nome, cpf, email, endereco } = requisite.body;

      if (!nome || nome.trim().length === 0) throw new Error("Nome é obrigatório");
      if (!cpf || cpf.trim().length === 0) throw new Error("CPF é obrigatório");
      if (!email || !email.includes("@")) throw new Error("Email inválido");
      if (!endereco || endereco.trim().length === 0) throw new Error("Endereço é obrigatório");

      const funcionario = repository.salvar({ nome, cpf, email, endereco });
      response.status(201).json(funcionario);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      response.status(400).json({ erro: mensagem });
    }
  });
}