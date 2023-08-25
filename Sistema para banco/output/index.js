"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conta_1 = require("./conta");
const correntista_1 = require("./correntista");
const Joao = new correntista_1.Correntista('João', '487.674.099-70');
const contaJoao = new conta_1.Conta('123-45', Joao);
contaJoao.credita(100.0);
console.log('Saldo João', contaJoao.saldo);
console.log(Joao.cpf);
