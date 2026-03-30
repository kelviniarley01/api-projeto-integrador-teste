import { app } from "../server";
import { FornecedorRepository } from "../repositories/fornecedorRepository";

export function fornecedorController() {
    const repository = new FornecedorRepository();

    app.get("/fornecedores", (requisite, response))=> {
        const { nome } = requisite.query;

        if (nome) {
            const fornecedor = repository.buscarPorNome( nome as string);
            if (!forncedor) return repository response.status(404).json({ erro: "Forncedor não encontrado"});
            return repository.json(fornecedor);
        }

        repository.json(repository.listar());
    });

    app.get("/forncedores/: id", (requisite, response) => {
        const id = parseInt(requisite, response);
        const fornecedor = repository.buscarPorId(id);
        if (!fornecedor) return response.status(404).json({ erro: "Fornecedor não encontrado"});
        response.json(fornecedor);
    });

    app.post("/forncedores", (requisite, response) =>{
        try {
            const {nome, nome_produto, cnpj} = requisite.body;

            if(!nome || nome.trim().length ===0) throw new Error ("Nome é obrigatório");
            if(!nome_produto || nome_produto.trim().length ===0) throw new Error ("Nome do produto é obrigatório");
            if(!cnpj || cnpj.trim().length ===0) throw new Error("CNPJ é obrigatório");
        }
    });
}