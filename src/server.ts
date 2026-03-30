import express from "express";

import { categoriaController } from "./controllers/categoriaController";
import { ProdutoController } from "./controllers/ProdutoController";
import { clientesController } from "./controllers/clientesController";
import { EstoqueController } from "./controllers/estoqueController";
import { funcionarioController } from "./controllers/funcionarioController";
import { item_pedidoController } from "./controllers/item_pedidoController";

export const app = express();

app.use(express.json());

categoriaController();
ProdutoController();
clientesController();
EstoqueController();

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});