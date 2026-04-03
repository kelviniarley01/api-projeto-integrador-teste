import db from '../database/database';
import { pedido } from '../models/pedido';

export class PedidoRepository {
    salvar(pedido: pedido): pedido {
        const resultado = db
            .prepare('INSERT INTO pedidos (id_cliente, data_pedido, status, valor_total) VALUES (?, ?, ?, ?)')
            .run(pedido.id_cliente, pedido.data_pedido, pedido.status, pedido.valor_total);
        return { ...pedido, id: resultado.lastInsertRowid as number };
    }

    listar(): pedido[] {
        return db.prepare('SELECT * FROM pedidos').all() as pedido[];
    }

    buscarPorId(id: number): pedido | null {
        return db.prepare('SELECT * FROM pedidos WHERE id = ?').get(id) as pedido | null;
    }

    buscarPorIdCliente(id_cliente: number): pedido[] {
        return db.prepare('SELECT * FROM pedidos WHERE id_cliente = ?').all(id_cliente) as pedido[];
    }

    buscarPorStatus(status: string): pedido[] {
        return db.prepare('SELECT * FROM pedidos WHERE status = ?').all(`%${status}%`) as pedido[];
    }

    buscarPorData(data_pedido: string): pedido[] {
        return db.prepare('SELECT * FROM pedidos WHERE data_pedido = ?').all(data_pedido) as pedido[];
    }

    buscarPorValorTotal(valor_total: number): pedido[] {
        return db.prepare('SELECT * FROM pedidos WHERE valor_total = ?').all(valor_total) as pedido[];
    }
}