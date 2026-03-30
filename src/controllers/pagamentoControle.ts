import {app} from "../server";
import { pagamentoRepository } from "../repositories/pagamentoRepository";

export function pagamentoController() {
    const repository = new pagamentoRepository();

    app.get("/pagamentos", (requisite, response) => {
        const (id_pedido) = requisite.query;

        if (id_pedido) {
            const pagamento = repository.buscarPorIdPedido(parseInt(id_pedido as string));
            if (!pagamento) return response.status(404).json({ erro: "Id do Pedido não encontrado" });
            return response.json(pagamento);
        }

        response.json(repository.listar());
    });

    app.get("/pagamentos/:id", (requisite, response) => {
        const id = parseInt(requisite.params.id);
        const pagamento = repository.buscarPorId(id);
        if (!pagamento) return response.status(404).json({ erro: "Pagamento não encontrado" });
        response.json(pagamento);
    }
    
    app.post("/pagamentos", (requisite, response) => {
        try {
            const { id_pedido, id_cliente, forma_pagamento, endereco } = requisite.body;

            if (!id_pedido || isNaN(id_pedido)) throw new Error("O id do pedido é obrigatório e deve ser um número");
            if (!id_cliente || isNaN(id_cliente)) throw new Error("O id do cliente é obrigatório e deve ser um número");
            if (!forma_pagamento || forma_pagamento.trim().length === 0) throw new Error("A forma de pagamento é obrigatória");
            if (!endereco || endereco.trim().length === 0) throw new Error("O endereço é obrigatório");

            const pagamento = repository.salvar({ id_pedido, id_cliente, forma_pagamento, endereco });
            response.status(201).json(pagamento);
        } catch (err) {
            const mensagem = err instanceof Error ? err.message : "Erro interno";
            response.status(400).json({ erro: mensagem });
        }
    });
}