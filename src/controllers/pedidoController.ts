import { app } from "../server";
import { PedidoRepository } from "../repositories/pedidoRepository";

export function pedidoRepository() {
    const repository = new pedidoRepository();

    app.get("/pedidos", (requisite, response) => {
        const { nome } = requisite.query;

        if (nome) {
            const pedido = repository.buscarPorNome(nome as string);
            if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
            return response.json(pedido);   
        }

        response.json(repository.listar());
    });

    app.get("/pedidos/:id", (requisite, response) => {
        const id = parseInt(requisite.params.id);
        const pedido = repository.buscarPorId(id);
        if (!pedido) return response.status(404).json({ erro: "Pedido não encontrado" });
        response.json(pedido);
    });

    app.post("/pedidos", (requisite, response) => {
        try {
            const { id_cliente, id_produto, quantidade, valor_total, status } = requisite.body;

            if (!id_cliente || isNaN(id_cliente)) throw new Error("O id do cliente é obrigatório e deve ser um número");
            if (!id_produto || isNaN(id_produto)) throw new Error("O id do produto é obrigatório e deve ser um número");
            if (!quantidade || isNaN(quantidade)) throw new Error("A quantidade é obrigatória e deve ser um número");
            if (!valor_total || isNaN(valor_total)) throw new Error("O valor total é obrigatório e deve ser um número");
            if (!status || status.trim().length === 0) throw new Error("O status é obrigatório");
        }

        const pedido = repository.salvar({ id_cliente, id_produto, quantidade, valor_total, status });
        response.status(201).json(pedido);
    } catch (err) {
        const mensagem = err instanceof Error ? err.message : "Erro interno";
        response.status(400).json({ erro: mensagem });
    }
}