import { Conta } from "./conta"
import { Correntista } from "./correntista"

const Joao = new Correntista('João', '487.674.099-70')
const contaJoao = new Conta('123-45', Joao)
contaJoao.credita(100.0)
console.log('Saldo João', contaJoao.saldo)
console.log(Joao.cpf)