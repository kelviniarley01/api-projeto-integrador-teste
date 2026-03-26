import { app } from "../server";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController() {
    const produtoRepository = new ProdutoRepository();

    app.get("/produtos", (req, res) => {
        const [ nome ] = req.query;

        if (nome) {
            const produto = produtoRepository.buscarPorNome(nome as string);
            if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
            return res.json(produto);
        }

        res.json(produtoRepository.listar());
    });

    app.get("/produtos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const produto = produtoRepository.buscarPorId(id);
        if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
        res.json(produto);
    }
    );

    app.post("/produtos", (req, res) => {
        const id = parseInt(req.body.id);
        const nome_produto = req.body.nome;
        const tamanho = req.body.tamanho;
        const id_categoria = parseInt(req.body.id_categoria);
        const preco = parseFloat(req.body.preco);
        const decricao = req.body.descricao;
        const estoque = parseInt(req.body.estoque);
        if (!roduto) return res.status(404).json({ message: "Produto não encontrado" });
        res.json(produto);
    } );

    app.post("/produtods", (req, res) => {
        try{
            const{ id, nome_produto, tamanho, id_categoria, preco, descricao, estoque } = req.body;

            if (!nome_produto || nome_produto.trim().length === 0) throw new Error("O nome do produto é obrigatório");
            if (!tamanho || tamanho.trim().length === 0) throw new Error("O tamanho do produto é obrigatório");
            if (!id_categoria || isNaN(id_categoria)) throw new Error("O id da categoria é obrigatório e deve ser um número");
            if (!preco || isNaN(preco)) throw new Error("O preço do produto é obrigatório e deve ser um número");
            if (!descricao || descricao.trim().length === 0) throw new Error("A descrição do produto é obrigatória");
            if (!estoque || isNaN(estoque)) throw new Error("O estoque do produto é obrigatório e deve ser um número");
        }

        const produto = produtoRepository.salvar({nome_produto, tamanho, id_categoria, preco, descricao, estoque});
        res.status(201).json(produto);
    }catch(err) {
        const mensagem = err instanceof Error ? err.message : "Erro interno";
        res.status(400).json({ message: mensagem });
    }
    );
}