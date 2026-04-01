CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  idade INTEGER NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_categoria TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_produto TEXT NOT NULL,
  tamanho TEXT NOT NULL,
  id_categoria INTEGER,
  preco REAL NOT NULL,
  descricao TEXT NOT NULL,
  estoque INTEGER NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);

CREATE TABLE IF NOT EXISTS fornecedores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  nome_produto TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_cliente INTEGER NOT NULL,
  data_pedido TEXT NOT NULL,
  status TEXT NOT NULL,
  valor_total REAL NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

CREATE TABLE IF NOT EXISTS item_pedido (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_pedido INTEGER NOT NULL,
  id_produto INTEGER NOT NULL,
  quantidade INTEGER NOT NULL,
  preco_unitario REAL NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
  FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS pagamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_pedido INTEGER NOT NULL,
  id_cliente INTEGER NOT NULL,
  forma_pagamento TEXT NOT NULL,
  endereco TEXT NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
  FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

CREATE TABLE IF NOT EXISTS funcionarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  endereco TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS estoque (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_produto TEXT NOT NULL,
  id_produto INTEGER NOT NULL,
  quantidade INTEGER NOT NULL,
  FOREIGN KEY (id_produto) REFERENCES produtos(id)
);