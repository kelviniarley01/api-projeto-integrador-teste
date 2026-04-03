import db from '../database/database';
import { fornecedor } from '../models/fornecedor';

export class FornecedorRepository {
    salvar(fornecedor: fornecedor): fornecedor {
        const resultado = db
            .prepare('INSERT INTO fornecedores (nome, nome_produto, cnpj) VALUES (?, ?, ?)')
            .run(fornecedor.nome, fornecedor.nome_produto, fornecedor.cnpj);
        return { ...fornecedor, id: resultado.lastInsertRowid as number };
    }

    listar(): fornecedor[] {
        return db.prepare('SELECT * FROM fornecedores').all() as fornecedor[];
    }

    buscarPorId(id: number): fornecedor | null {
        return db.prepare('SELECT * FROM fornecedores WHERE id = ?').get(id) as fornecedor | null;
    }

    buscarPorNome(nome: string): fornecedor | null {
        return db.prepare('SELECT * FROM fornecedores WHERE nome = ?').get(`%${nome}%`) as fornecedor | null;
    }

    buscarPorCnpj(cnpj: string): fornecedor | null {
        return db.prepare('SELECT * FROM fornecedores WHERE cnpj = ?').get(cnpj) as fornecedor | null;
    }
}