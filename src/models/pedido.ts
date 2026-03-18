export interface pedido {
    id?: number;
    id_cliente: number;
    data_pedido: string;
    status: string;
    valor_total: number;
    tipo_entrega: string;
}