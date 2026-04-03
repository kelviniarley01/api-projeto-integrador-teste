import { app } from "../server";
import { PagamentoRepository } from "../repositories/pagamentoRepository";

export function PagamentoController() {
  const repository = new PagamentoRepository();

  app.get("/pagamentos", (requisite, response) => {
    const { forma_pagamento } = requisite.query;

    if (forma_pagamento) {
      const pagamento = repository.buscarPorFormaPagamento(forma_pagamento as string);
      if (!pagamento) return response.status(404).json({ erro: "Pagamento não encontrado" });
      return response.json(pagamento);
    }

    response.json(repository.listar());
  });

  app.get("/pagamentos/:id", (requisite, response) => {
    const id = parseInt(requisite.params.id);
    const pagamento = repository.buscarPorId(id);
    if (!pagamento) return response.status(404).json({ erro: "Pagamento não encontrado" });
    response.json(pagamento);
  });

  app.post("/pagamentos", (requisite, response) => {
    try {
      const { id_pedido, id_cliente, forma_pagamento, endereco } = requisite.body;

      if (!id_pedido) throw new Error("ID do pedido é obrigatório");
      if (!id_cliente) throw new Error("ID do cliente é obrigatório");
      if (!forma_pagamento || forma_pagamento.trim().length === 0) throw new Error("Forma de pagamento é obrigatória");
      if (!endereco || endereco.trim().length === 0) throw new Error("Endereço é obrigatório");

      const pagamento = repository.salvar({ id_pedido, id_cliente, forma_pagamento, endereco });
      response.status(201).json(pagamento);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      response.status(400).json({ erro: mensagem });
    }
  });
}