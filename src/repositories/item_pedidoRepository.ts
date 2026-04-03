import db from '../database/database';
import { item_pedido } from '../models/item_pedido';

export class ItemPedidoRepository {
    salvar(itemPedido: item_pedido): item_pedido {
        const resultado = db
            .prepare('INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)')
            .run(itemPedido.id_pedido, itemPedido.id_produto, itemPedido.quantidade, itemPedido.preco_unitario);
        return { ...itemPedido, id: resultado.lastInsertRowid as number };
    }

    listar(): item_pedido[] {
        return db.prepare('SELECT * FROM item_pedido').all() as item_pedido[];
    }

    buscarPorId(id: number): item_pedido | null {
        return db.prepare('SELECT * FROM item_pedido WHERE id = ?').get(id) as item_pedido | null;
    }

    buscarPorIdPedido(id_pedido: number): item_pedido[] {
        return db.prepare('SELECT * FROM item_pedido WHERE id_pedido = ?').all(id_pedido) as item_pedido[];
    }

    buscarPorIdProduto(id_produto: number): item_pedido[] {
        return db.prepare('SELECT * FROM item_pedido WHERE id_produto = ?').all(id_produto) as item_pedido[];
    }

    buscarPorQuantidade(quantidade: number): item_pedido[] {
        return db.prepare('SELECT * FROM item_pedido WHERE quantidade = ?').all(quantidade) as item_pedido[];
    }

    buscarPorPrecoUnitario(preco_unitario: number): item_pedido[] {
        return db.prepare('SELECT * FROM item_pedido WHERE preco_unitario = ?').all(preco_unitario) as item_pedido[];
    }
}