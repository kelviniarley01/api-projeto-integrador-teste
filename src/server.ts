import express from "express";

import { ClientesController } from "./controllers/clientesController";
import { ProdutoController } from "./controllers/ProdutoController";
import { PedidoController } from "./controllers/pedidoController";
import { PagamentoController } from "./controllers/pagamentoControler";
import { ItemPedidoController } from "./controllers/item_pedidoController";
import { EstoqueController } from "./controllers/estoqueController";
import { FornecedorController } from "./controllers/fornecedorController";
import { FuncionarioController } from "./controllers/funcionarioController";
import { CategoriaController } from "./controllers/categoriaController";

export const app = express();

app.use(express.json());

ClientesController();
ProdutoController();
PedidoController();
PagamentoController();
ItemPedidoController();
EstoqueController();
FornecedorController();
FuncionarioController();
CategoriaController();

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});