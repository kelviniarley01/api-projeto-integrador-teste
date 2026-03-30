export interface pagamento {
    id?: number;
    id_pedido: number;
    id_cliente: number;
    forma_pagamento: string;
    endereco: string;
}