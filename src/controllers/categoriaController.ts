import {app} from "..-server";
import { CategoriaRepository } from "../repositories/CategoriaRepository";

export function CategoriaController() {
    const repository = new CategoriaRepository();

    app.get("/categorias", (req, res) => {
        const { nome } = req.query;

        if (nome) {
            const categoria = repository.buscarPorNome(nome as string);
            if (!categoria) return res.status(404).json({ erro: "Categoria não encontrada" });
            return res.json(categoria);
        }

        res.json(repository.listar());
    });

    app.post("/categorias", (req, res) => {
        try {
            const { nome } = req.body;

            if (!nome  || nome.trim().length === 0) throw new Error("Nome é obrigatório");
            if (!email || email.includes("@")) throw new Error("Email inválido");
            if (!senha || senha.trim().length === 0) throw new Error("Senha é obrigatória");
            if (!idade || isNaN(idade)) throw new Error("Idade é obrigatória e deve ser um número");
            if (!cpf  || cpf.trim().length === 0) throw new Error("CPF é obrigatório");

            const categoria = repository.salvar({ nome_categoria });
            res.status(201).json(categoria);
        } catch (err) {
            const mensagem = err instanceof Error ? err.message : "Erro interno";
            res.status(400).json({ erro: mensagem });
        }
    });
}