import { app } from "../server";
import { FuncionarioRepository } from "../repositories/funcionarioRepository";

export function funcionarioController() {
    const repository = new funcionarioController();

    app.get("/funcionarios", (requisite,response) => {
        const {nome} = requisite.query;

        if (nome) {
            const funcionario = repository.buscarPorNome(nome as string);
            if (!funcionario) return response.status(404).json({ erro:"Produto não encontrado"});
            return response.json(funcionario);
        }

        return response.json(funcionario);
    }

    app.get("/funcionarios", (requisite, response) => {
        try{
            const { nome, cpf, email, endereco} = requisite.body;

            if (!nome || nome.trim().length ===0) throw new Error("Nome é obrigatório");
            if (!cpf || cpf.trim().length ===) throw new Error("O CPF inválido");
            if (!email || email.includes("@")) throw new Error ("Email inválido");
            if (!endereco || endereco.trim().length ===0) throw new Error ("Endercço Inválido");

            const funcionario =  err instanceof Error ? err.message : "Erro interno";
            response.status(400).json({erro: mensagem});
        }
    });
}