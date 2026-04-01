import db from '../database/database';
import { estoque } from '../models/estoque';

export class EstoqueRepository {
    salvar(estoque: estoque): estoque {
        const resultado = db
            .prepare('INSERT INTO estoque (nome_produto,id_produto, quantidade) VALUES (?, ?, ?)')
            .run(estoque.nome_produto, estoque.id_produto, estoque.quantidade);
        return { ...estoque, id: resultado.lastInsertRowid as number };
    }

    listar(): estoque[] {
        return db.prepare('SELECT * FROM estoque').all() as estoque[];
    }

    buscarPorId(id: number): estoque | null {
        return (db.prepare('SELECT * FROM estoque WHERE id = ?').get(id) as estoque) || null;
    }

    buscarPorNomeProduto(nome_produto: string): estoque | null {
        return (db.prepare('SELECT * FROM estoque WHERE nome_produto = ?').get(nome_produto) as estoque) || null;
    }

    buscarPorIdProduto(id_produto: number): estoque | null {
        return (db.prepare('SELECT * FROM estoque WHERE id_produto = ?').get(id_produto) as estoque) || null;
    }

    atualizarQuantidade(id: number, novaQuantidade: number): estoque | null {
        const estoqueExistente = this.buscarPorId(id);
        if (!estoqueExistente) {
            return null;
        }

        db.prepare('UPDATE estoque SET quantidade = ? WHERE id = ?').run(novaQuantidade, id);
        return { ...estoqueExistente, quantidade: novaQuantidade };
    }
}