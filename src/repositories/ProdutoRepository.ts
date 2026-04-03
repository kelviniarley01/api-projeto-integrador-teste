import db from '../database/database';
import { Produto } from '../models/Produto';

export class ProdutoRepository {
    salvar(produto: Produto): Produto {
        const resultado = db
            .prepare('INSERT INTO produtos (nome_produto, descricao,tamanho, id_categoria, preco, descricao, estoque) VALUES (?, ?, ?, ?, ?, ?, ?)')
            .run(produto.nome_produto, produto.descricao, produto.tamanho, produto.id_categoria, produto.preco, produto.descricao, produto.estoque);

        return { ...produto, id: resultado.lastInsertRowid as number };
    }

    listar(): Produto[] {
        return db.prepare('SELECT * FROM produtos').all() as Produto[];
    }

    buscarPorId(id: number): Produto | null {
        return db.prepare('SELECT * FROM produtos WHERE id = ?').get(id) as Produto | null;
    }

    buscarPorNome(nome: string): Produto | null {
        return db.prepare('SELECT * FROM produtos WHERE nome = ?').get(`%${nome}%`) as Produto | null;
    }

    atualizarEstoque(id: number, quantidade: number): void {
        db.prepare('UPDATE produtos SET estoque = ? WHERE id = ?').run(quantidade, id);
    }

    buscarPorTamanho(tamanho: string): Produto[] {
        return db.prepare('SELECT * FROM produtos WHERE tamanho = ?').all(tamanho) as Produto[];
    }

    editarEstoque(id: number, quantidade: number): void {
        db.prepare('UPDATE produtos SET estoque = ? WHERE id = ?').run(quantidade, id);
    }
}