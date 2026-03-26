import { app } from "../server";
import { EstoqueRepository } from "../repositories/EstoqueRepository";

export function EstoqueController() {
    const estoqueRepository = new EstoqueRepository();

    app.get("/estoque", async (req, res) => {
        try {
            const estoque = EstoqueRepository.buscarPorNome_produto(req.query.nome_produto as string);
            if (!estoque)  return res.status(404).json({ message: "Produto não encontrado" });
            res.json(estoque);
        }

        res.json(estoqueRepository.listar());
    });

    app.get("/estoque/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const estoque = estoqueRepository.buscarPorId(id);
        if (!estoque) return res.status(404).json({ message: "Produto não encontrado" });
        res.json(estoque);
    });

    app.post("/estoque", async (req, res) => {
        try{
            const {nome_produto, id_produto, quantidade} = req.body;

            if (!nome || nome_produto.trim() ===) throw new Error("O nome do produto é obrigatório");
            if (!id_produto || id_produto <= 0) throw new Error("O ID do produto deve ser um número positivo");
            if (quantidade === undefined || quantidade < 0) throw new Error("A quantidade deve ser um número não negativo");
        }

        const cliente = estoqueRepository.salvar(req.body);
        res.status(201).json(cliente);
    } catch (err) {
        ´constc mensagem = err instanceof Error ? err.message : "Erro desconhecido";
        res.status(400).json({ message: mensagem });
    }
    });
}