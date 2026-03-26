import db from '../database/database';
import { funcionarios } from '../models/funcionarios';

export class FuncionarioRepository {
    salvar(funcionario: funcionarios): funcionarios {
        const resultado = db
            .prepare('INSERT INTO funcionarios (nome, cpf, email, endereco) VALUES (?, ?, ?)')
            .run(funcionario.nome, funcionario.cpf, funcionario.email, funcionario.endereco);
        return { ...funcionario, id: resultado.lastInsertRowid as number };
    }

    listar(): funcionarios[] {
        return db.prepare('SELECT * FROM funcionarios').all() as funcionarios[];
    }

    buscarPorId(id: number): funcionarios | null {
        return db.prepare('SELECT * FROM funcionarios WHERE id = ?').get(id) as funcionarios | null;
    }

    buscarPorNome(nome: string): funcionarios | null {
        return db.prepare('SELECT * FROM funcionarios WHERE nome = ?').get(`%${nome}%`) as funcionarios | null;
    }

    buscarPorEmail(email: string): funcionarios | null {
        return db.prepare('SELECT * FROM funcionarios WHERE email = ?').get(email) as funcionarios | null;
    }

    buscarPorCpf(cpf: string): funcionarios | null {
        return db.prepare('SELECT * FROM funcionarios WHERE cpf = ?').get(cpf) as funcionarios | null;
    }

    buscarPorEndereco(endereco: string): funcionarios | null {
        return db.prepare('SELECT * FROM funcionarios WHERE endereco = ?').get(`%${endereco}%`) as funcionarios | null;
    }
}