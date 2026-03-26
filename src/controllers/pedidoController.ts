import { app } from "../server";
import { PedidoRepository } from "../repositories/PedidoRepository";

export function PedidoController() {
    const repository = new PedidoRepository();

    app.get("/pedidos", (req, res) => {
        const { nome } = req.query;

        if (nome) {
            const pedido = repository.buscarPorNome(nome as string);
            if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
            return res.json(pedido);   
        }

        res.json(repository.listar());
    });

    app.get("/pedidos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const pedido = repository.buscarPorId(id);
        if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
        res.json(pedido);
    });

    app.post("/pedidos", (req, res) => {
        try {
            const { id_cliente, id_produto, quantidade, valor_total, status } = req.body;

            if (!id_cliente || isNaN(id_cliente)) throw new Error("O id do cliente é obrigatório e deve ser um número");
            if (!id_produto || isNaN(id_produto)) throw new Error("O id do produto é obrigatório e deve ser um número");
            if (!quantidade || isNaN(quantidade)) throw new Error("A quantidade é obrigatória e deve ser um número");
            if (!valor_total || isNaN(valor_total)) throw new Error("O valor total é obrigatório e deve ser um número");
            if (!status || status.trim().length === 0) throw new Error("O status é obrigatório");
        }

        const pedido = repository.salvar({ id_cliente, id_produto, quantidade, valor_total, status });
        res.status(201).json(pedido);
    } catch (err) {
        const mensagem = err instanceof Error ? err.message : "Erro interno";
        res.status(400).json({ erro: mensagem });
    }
});
}