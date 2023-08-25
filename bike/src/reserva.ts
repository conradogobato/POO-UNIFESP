import { Bicicleta } from "./bicicleta"
import { Cliente } from "./cliente"

export class Reserva{
    data_entrega: string
    data_reserva: string
    cliente: Cliente
    bicicleta: Bicicleta

    constructor(data_entrega: string, data_reserva: string, cliente: Cliente, bicicleta: Bicicleta){
        this.data_entrega = data_entrega
        this.data_reserva = data_reserva
        this.cliente = cliente
        this.bicicleta = bicicleta
    }
}