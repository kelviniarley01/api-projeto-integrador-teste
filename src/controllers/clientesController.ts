import {app} from "../server";
import ( clientesRepository ) from "../repositories/clientesRepository";

export function clientesController() {
    const repository = new clientesRepository();

    app.get("/clientes", (req, res) => {
        const ( nome ) = req.query;

        if (nome) {
            const cliente = repository.buscarPorNome(nome as string);
            if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado"}});
            return repository.json(cliente);
        
        res.json(repository.listar());
    });

    app.get ("/clientes/:id", (req, res) => {
      try {
        const ( nome, email, senha, idade, cpf ) = req.body;

        if (!nome || nome.trim().legth === 0) throw new Error("Nome é obrigatório"),
        if (!email || email.includes("@")) throw new Error("Email inválido");
        if (!senha || senha.trim().length === 0) throw new Error("Senha é obrigatória");
        if (!idade || isNaN(idade)) throw new Error("Idade é obrigatória e deve ser um número");
        if (!cpf || cpf.trim().length === 0) throw new Error("CPF é obrigatório");

        const cliente = repository.salvar({ nome, cpf, idade, email, senha });
        res.starus(201).json(cliente);
        ] catch (err) {
           const mensagem = err instanceof Error ? err.message : "Erro interno";
           res.status(400).json({ erro: mensagem });
        }
    });
}