import db from '../database/database';
import { Cliente } from '../models/clientes';

export class ClientesRepository {
    salvar(cliente: Cliente): Cliente {
        const resultado = db
            .prepare('INSERT INTO clientes (nome, cpf, idade, email, senha) VALUES (?, ?, ?, ?, ?)')
            .run(cliente.nome, cliente.cpf, cliente.idade, cliente.email, cliente.senha);
            
        return { ...cliente, id: resultado.lastInsertRowid as number };
    }

    listar(): Cliente[] {
        return db.prepare('SELECT * FROM clientes').all() as Cliente[];
    }

    buscarPorId(id: number): Cliente | null {
        return (db.prepare('SELECT * FROM clientes WHERE id = ?').get(id) as Cliente) || null;
    }

    buscarPorNome(nome: string): Cliente | null {
        return (db.prepare('SELECT * FROM clientes WHERE nome = ?').get(nome) as Cliente) || null;
    }

    buscarPorEmail(email: string): Cliente | null {
        return (db.prepare('SELECT * FROM clientes WHERE email = ?').get(email) as Cliente) || null;
    }

    buscarPorIdade(idade: number): Cliente[] {
        return db.prepare('SELECT * FROM clientes WHERE idade = ?').all(idade) as Cliente[];
    }
}