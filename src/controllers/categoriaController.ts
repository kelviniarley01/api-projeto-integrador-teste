import { app } from "../server";
import { CategoriaRepository } from "../repositories/categoriaRepository";

export function CategoriaController() {
  const repository = new CategoriaRepository();

  app.get("/categorias", (requisite, response) => {
    const { nome } = requisite.query;

    if (nome) {
      const categoria = repository.buscarPorNome(nome as string);
      if (!categoria) {
        return response.status(404).json({ erro: "Categoria não encontrada" });
      }
      return response.json(categoria);
    }

    response.json(repository.listar());
  });

  app.get("/categorias/:id", (requisite, response) => {
    const id = parseInt(requisite.params.id);
    const categoria = repository.buscarPorId(id);

    if (!categoria) {
      return response.status(404).json({ erro: "Categoria não encontrada" });
    }

    response.json(categoria);
  });

  app.post("/categorias", (requisite, response) => {
    try {
      const { nome_categoria } = requisite.body;

      if (!nome_categoria || nome_categoria.trim().length === 0) {
        throw new Error("Nome da categoria é obrigatório");
      }

      const categoria = repository.salvar({ nome_categoria });
      response.status(201).json(categoria);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      response.status(400).json({ erro: mensagem });
    }
  });
}