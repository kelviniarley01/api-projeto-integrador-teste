import {app} from "..server";
import { categoriaRepository } from "../repositories/categoriaRepository";

export function categoriaController() {
    const repository = new categoriaRepository();

    app.get("/categorias", (requisite, response) => {
        const { nome } = requisite.query;

        if (nome) {
            const categoria = repository.buscarPorNome(nome as string);
            if (!categoria) return response.status(404).json({ erro: "Categoria não encontrada" });
            return response.json(categoria);
        }

        response.json(repository.listar());
    });

    app.post("/categorias", (requisite, response) => {
        try {
            const { nome } = requisite.body;

            if (! nome || nome.trim().length === 0) throw new  Error ("Nome da Categoria é obrigatório ");

            const categoria = repository.salvar({ nome });
            response.status(201).json(categoria);
        } catch (err) {
            const mensagem = err instanceof Error ? err.message : "Erro interno";
            response.status(400).json({ erro: mensagem });
        }
    });
}