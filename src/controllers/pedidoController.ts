import { app } from "../server";
import { PedidoRepository } from "../repositories/pedidoRepository";

export function PedidoController() {
  const repository = new PedidoRepository();

  app.get("/pedidos", (requisite, response) => {
    const { status } = requisite.query;

    if (status) {
      const pedidos = repository.buscarPorStatus(status as string);
      if (!pedidos) return response.status(404).json({ erro: "Pedido não encontrado" });
      return response.json(pedidos);
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
      const { id_cliente, data_pedido, status, valor_total } = requisite.body;

      if (!id_cliente) throw new Error("ID do cliente é obrigatório");
      if (!data_pedido || data_pedido.trim().length === 0) throw new Error("Data do pedido é obrigatória");
      if (!status || status.trim().length === 0) throw new Error("Status é obrigatório");
      if (valor_total <= 0) throw new Error("Valor total deve ser maior que zero");

      const pedido = repository.salvar({ id_cliente, data_pedido, status, valor_total });
      response.status(201).json(pedido);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      response.status(400).json({ erro: mensagem });
    }
  });
}