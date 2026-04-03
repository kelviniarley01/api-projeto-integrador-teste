import db from '../database/database';
import { pagamento } from '../models/pagamento';

export class PagamentoRepository {
    salvar(pagamento: pagamento): pagamento {
        const resultado = db
            .prepare('INSERT INTO pagamentos (id_pedido, id_cliente, forma_pagamento, endereco) VALUES (?, ?, ?, ?)')
            .run(pagamento.id_pedido, pagamento.id_cliente, pagamento.forma_pagamento, pagamento.endereco);
        return { ...pagamento, id: resultado.lastInsertRowid as number };
    }

    listar(): pagamento[] {
        return db.prepare('SELECT * FROM pagamentos').all() as pagamento[];
    }

    buscarPorId(id: number): pagamento | null {
        return db.prepare('SELECT * FROM pagamentos WHERE id = ?').get(id) as pagamento | null;
    }

    buscarPorIdPedido(id_pedido: number): pagamento | null {
        return db.prepare('SELECT * FROM pagamentos WHERE id_pedido = ?').get(id_pedido) as pagamento | null;
    }

    buscarPorIdCliente(id_cliente: number): pagamento | null {
        return db.prepare('SELECT * FROM pagamentos WHERE id_cliente = ?').get(id_cliente) as pagamento | null;
    }

    buscarPorFormaPagamento(forma_pagamento: string): pagamento | null {
        return db.prepare('SELECT * FROM pagamentos WHERE forma_pagamento = ?').get(`%${forma_pagamento}%`) as pagamento | null;
    }

    buscarPorEndereco(endereco: string): pagamento | null {
        return db.prepare('SELECT * FROM pagamentos WHERE endereco = ?').get(`%${endereco}%`) as pagamento | null;
    }
}