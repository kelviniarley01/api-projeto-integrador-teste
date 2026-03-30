import {app} from "../server";
import { ItemPedidoRepository } from "../repositories/item_pedidoRepository";   

export function item_pedidoController() {
    const item_PedidoController  = new item_pedidoController();

    app.get("/itenspedidos", (requisite, response) => {
        const {nome} = requisite.query;

        if (nome) {
            const itens = item_pedidoController.buscarPorNome(nome as string);
            if (!item_pedido) return response.status(404).json({ erro: "Itens do Pedido não encontrados"});
            return response.json(item_pedido);
        }

        response.json(item_pedidoRepository.listar());
    });

    app.get("/itenspedidos:id", (requisite, response) => {
        const id = parseInt(requisite.params.id);
        const id_pedido = ItemPedidoRepository.buscarPorId(id);
        if (!item_pedido) return response.status(404).json({erro: "Itens do pedido não encontrados"})
        response.json(item_pedido);
    });

    response,json(ItemPedidoRepository.listar());
});

    app.get("/itenspedidos:id", (requisite, response)=> {
        const id = parseInt(request.params.id);
        const id_pedido = ItemPedidoRepository.buscarPorId(id);
        id (!id_pedido) return response.status(404).json({ erro: "Itens do Pedido não encontrados"});
        response.json(item_pedido);
    });

    app.post("/itenspedidos", (requisite, response) => {
        try{
            const {id_pedido, id_produto, quantidade, preco_unitario} = requisite.body;

            if (!id_pedido || isNaN(id_pedido)) throw new Error("O Id do pedido é obrigatório e deve ser um número");
            if (!id_produto || isNaN(id_produto)) throw new Error("O Id do produto é obrigatório e deve ser um número");
            if (!quantidade <= 0) throw new Error("A quantidade deve ser maior que zero");
            if (!preco_unitario <= 0) throw new Error("O preço deve ser maior que zero");

            const item_pedido = ItemPedidoRepository.salvar({ id_pedido, id_produto, quantidade, preco_unitario});
            response.status(201).json(produto);
        } catch (err) {
            const mensagem = err instanceof Error ? err.message: "Erro internno";
            response.status(400).json({ erro: mensagem})
        }
    });