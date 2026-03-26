import (app) from "../server";
import { PagamentoRepository } from "../repositories/PagamentoRepository";

export function PagamentoController() {
    const repository = new PagamentoRepository();

    app.get("/pagamentos", (req, res) => {
        const (id_cliente) = req.query;

        if (id_cliente) {
            const pagamento = repository.buscarPorIdCliente(parseInt(id_cliente as string));
            if (!pagamento) return res.status(404).json({ erro: "Pagamento não encontrado" });
            return res.json(pagamento);
        }

        res.json(repository.listar());
    });

    app.get("/pagamentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const pagamento = repository.buscarPorId(id);
        if (!pagamento) return res.status(404).json({ erro: "Pagamento não encontrado" });
        res.json(pagamento);
    }
    
    app.post("/pagamentos", (req, res) => {
        try {
            const { id_pedido, id_cliente, forma_pagamento, endereco } = req.body;

            if (!id_pedido || isNaN(id_pedido)) throw new Error("O id do pedido é obrigatório e deve ser um número");
            if (!id_cliente || isNaN(id_cliente)) throw new Error("O id do cliente é obrigatório e deve ser um número");
            if (!forma_pagamento || forma_pagamento.trim().length === 0) throw new Error("A forma de pagamento é obrigatória");
            if (!endereco || endereco.trim().length === 0) throw new Error("O endereço é obrigatório");

            const pagamento = repository.salvar({ id_pedido, id_cliente, forma_pagamento, endereco });
            res.status(201).json(pagamento);
        } catch (err) {
            const mensagem = err instanceof Error ? err.message : "Erro interno";
            res.status(400).json({ erro: mensagem });
        }
    });
}