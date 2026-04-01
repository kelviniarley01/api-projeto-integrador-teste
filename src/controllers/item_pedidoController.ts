import { app } from "../server";
import { ItemPedidoRepository } from "../repositories/item_pedidoRepository";

export function ItemPedidoController() {
  const repository = new ItemPedidoRepository();

  app.get("/itens_pedido", (requisite, response) => {
    const { id_pedido } = requisite.query;

    if (id_pedido) {
      const itens = repository.buscarPorIdPedido(Number(id_pedido));
      if (!itens) return response.status(404).json({ erro: "Item do pedido não encontrado" });
      return response.json(itens);
    }

    response.json(repository.listar());
  });

  app.get("/itens_pedido/:id", (requisite, response) => {
    const id = parseInt(requisite.params.id);
    const item = repository.buscarPorId(id);
    if (!item) return response.status(404).json({ erro: "Item do pedido não encontrado" });
    response.json(item);
  });

  app.post("/itens_pedido", (requisite, response) => {
    try {
      const { id_pedido, id_produto, quantidade, preco_unitario } = requisite.body;

      if (!id_pedido) throw new Error("ID do pedido é obrigatório");
      if (!id_produto) throw new Error("ID do produto é obrigatório");
      if (quantidade <= 0) throw new Error("Quantidade deve ser maior que zero");
      if (preco_unitario <= 0) throw new Error("Preço unitário deve ser maior que zero");

      const item = repository.salvar({ id_pedido, id_produto, quantidade, preco_unitario });
      response.status(201).json(item);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      response.status(400).json({ erro: mensagem });
    }
  });
}