import db from '../database/database';
import { categoria } from '../models/categoria';

export class CategoriaRepository {
    salvar(categoria: categoria): categoria {
        const resultado = db
            .prepare('INSERT INTO categorias (nome) VALUES (?, ?)')
            .run(categoria.nome_categoria);

        return { ...categoria, id: resultado.lastInsertRowid as number };
    }

    listar(): categoria[] {
        return db.prepare('SELECT * FROM categorias').all() as categoria[];
    }

    buscarPorId(id: number): categoria | null {
        return db.prepare('SELECT * FROM categorias WHERE id = ?').get(id) as categoria | null;
    }

    buscarPorNome(nome: string): categoria | null {
        return db.prepare('SELECT * FROM categorias WHERE nome = ?').get(`%${nome}%`) as categoria | null;
    }
}