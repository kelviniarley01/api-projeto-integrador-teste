import { app } from "../server";
import { EstoqueRepository } from "../repositories/estoqueRepository";

export function EstoqueController() {
    const estoqueRepository = new EstoqueRepository();

    app.get("/estoque", async (requisite, response) => {
        try {
            const estoque = EstoqueRepository.buscarPorNome_produto(req.query.nome_produto as string);
            if (!estoque)  return response.status(404).json({ message: "Produto não encontrado" });
            response.json(estoque);
        }

        response.json(estoqueRepository.listar());
    });

    app.get("/estoque/:id", async (requisite, response) => {
        const id = parseInt(requisite.params.id);
        const estoque = estoqueRepository.buscarPorId(id);
        if (!estoque) return response.status(404).json({ message: "Produto não encontrado" });
        response.json(estoque);
    });

    app.post("/estoque", async (requisite, response) => {
        try{
            const {nome_produto, id_produto, quantidade} = requisite.body;

            if (!nome_produto || nome_produto.trim() ===) throw new Error("O nome do produto é obrigatório");
            if (!id_produto || id_produto <= 0) throw new Error("O ID do produto deve ser um número positivo");
            if (quantidade === undefined || quantidade < 0) throw new Error("A quantidade deve ser um número não negativo");
        }

        const cliente = estoqueRepository.salvar(requisite.body);
        response.status(201).json(cliente);
    } catch (err) {
        const mensagem = err instanceof Error ? err.message : "Erro desconhecido";
        response.status(400).json({ message: mensagem });
    }
    });