import { app } from "../server";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController() {
    const produtoRepository = new ProdutoRepository();

    app.get("/produtos", (requisite, response) => {
        const [ nome ] = requisite.query;

        if (nome) {
            const produto = produtoRepository.buscarPorNome(nome as string);
            if (!produto) return response.status(404).json({ message: "Produto não encontrado" });
            return response.json(produto);
        }

        response.json(produtoRepository.listar());
    });

    app.get("/produtos/:id", (requisite, response) => {
        const id = parseInt(requisite.params.id);
        const produto = produtoRepository.buscarPorId(id);
        if (!produto) return response.status(404).json({ message: "Produto não encontrado" });
        response.json(produto);
    }
    );

    app.post("/produtos", (requisite, response) => {
        const id = parseInt(requisite.body.id);
        const nome_produto = requisite.body.nome;
        const tamanho = requisite.body.tamanho;
        const id_categoria = parseInt(requisite.body.id_categoria);
        const preco = parseFloat(requisite.body.preco);
        const decricao = requisite.body.descricao;
        const estoque = parseInt(requisite.body.estoque);
        if (!produto) return response.status(404).json({ message: "Produto não encontrado" });
        response.json(produto);
    } );

    app.post("/produtods", (requisite, response) => {
        try{
            const{ id, nome_produto, tamanho, id_categoria, preco, descricao, estoque } = requisite.body;

            if (!nome_produto || nome_produto.trim().length === 0) throw new Error("O nome do produto é obrigatório");
            if (!tamanho || tamanho.trim().length === 0) throw new Error("O tamanho do produto é obrigatório");
            if (!id_categoria || isNaN(id_categoria)) throw new Error("O id da categoria é obrigatório e deve ser um número");
            if (!preco || isNaN(preco)) throw new Error("O preço do produto é obrigatório e deve ser um número");
            if (!descricao || descricao.trim().length === 0) throw new Error("A descrição do produto é obrigatória");
            if (!estoque || isNaN(estoque)) throw new Error("O estoque do produto é obrigatório e deve ser um número");
        }

        const produto = produtoRepository.salvar({nome_produto, tamanho, id_categoria, preco, descricao, estoque});
        response.status(201).json(produto);
    }catch(err) {
        const mensagem = err instanceof Error ? err.message : "Erro interno";
        response.status(400).json({ message: mensagem });
    }
    );
}