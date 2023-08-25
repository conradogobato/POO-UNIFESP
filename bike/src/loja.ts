import { Bicicleta } from "./bicicleta"
import { Cliente } from "./cliente"
import { Reserva } from "./reserva"

export class Loja{
    bicicletas: Bicicleta[] = []
    clientes: Cliente[] = []
    reservas: Reserva[]= []

    addBike(bicicleta: Bicicleta){
        this.bicicletas.push(bicicleta)
    }
    addCliente(cliente: Cliente){
        this.clientes.push(cliente)
    }

    reservaBike(bike: Bicicleta, cliente: Cliente, data_atual: string, data_entrega){
        const reserva = new Reserva(data_entrega, data_atual, cliente, bike)
        this.reservas.push(reserva)
    }

    verificaDisponibilidade(reserva: Reserva){
        let res:boolean = false
        this.reservas.forEach(_reserva => {
            if (_reserva.bicicleta.id_bike ==  reserva.bicicleta.id_bike) res = true 
        });

        res ? console.log('Bike indisponível!!') : console.log('Bike disponível!!')
    }

    
}