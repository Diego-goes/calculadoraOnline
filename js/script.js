// - - - - - Salvar caractere pressionado - - - - - // Done
// - - - - - Diferenciar caractere de operação - - - - - // Done
// - - - - - Juntar caracteres separados - - - - - // Done
// - - - - - Criar 2 variáveis para os numeros - - - - - // Done

// - - - - - Difenrenciar o 1º do 2º numero - - - - - // Done
// L> A diferença é que o segundo é todo numero a partir do operador.

// - - - - - Criar um 'ans' quando um 2º operador for pressionado - - - - - //

let operacao = [];
let n1 = ``;
let operador;
let n2 = ``;
let resultado;
function salvarOperacao(char) {
    // Parte que salva a operação
    operacao += char;
    // Parte de exibição
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.style.color = `orange`;
    pDisplay.innerHTML += `${char}`;
}
function separarOperacao() {
    // Possiveis operadores
    let operadores = [`÷`, `×`, `-`, `+`];

    // Achar qual é o operador da operação matemática.
    // As vezes a operação podem começar com o sinal negativo, por isso
    //se deve retirar esse sinal da operação.
    let operacaoSplit = operacao.split(``);
    if (operacao.startsWith(`-`)) {
        console.log(`Começa NEGATIVO`)
        let operacaoSplit2 = [...operacao];
        operacaoSplit2[0] = ``;
        operador = operacaoSplit2.find((char) => {
            for (let i in operadores) {
                if (char == operadores[i]) {
                    return operadores[i];
                }
            }
        });
    } else {
        console.log(`Começa POSITIVO`)
        operador = operacaoSplit.find((char) => {
            for (let i in operadores) {
                if (char == operadores[i]) {
                    return operadores[i];
                }
            }
        });
    }
    console.log(`operador: ${operador}`)
    // Achar o n1 e n2
    console.log(`operacao: ${operacao} | operacaoSplit: ${operacaoSplit}`)
    console.log(`operacao.indexOf(operador): ${operacao.indexOf(operador, 1)}`)
    for (let i in operacao) {
        if (i < operacao.indexOf(operador, 1)) {
            console.log(`operacao[${i}]: ${operacao[i]}`);
            n1 += operacao[i];
            console.log(`n1: ${n1} | length: ${n1.length}`);
        } else if (i > operacao.indexOf(operador, 1)) {
            console.log(`operacao[${i}]: ${operacao[i]}`);
            n2 += operacao[i];
            console.log(`n2: ${n2} | length: ${n2.length}`);
        }
    }
    if (n1.indexOf(`,`) != -1) {
        n1 = Number(n1.replace(`,`, `.`));
    } else {
        n1 = Number(n1);
    }
    if (n2.indexOf(`,`) != -1) {
        n2 = Number(n2.replace(`,`, `.`));
    } else {
        n2 = Number(n2);
    }
}
function mudarSinal() {
    //alert(`MUDAR DE SINAL | n1: ${n1}`)
    if (operacao.startsWith(`-`)) {
        operacao = operacao.replace(`-`, ``);
        console.log(`MUDANÇA DE SINAL NEGATIVO | n1: ${n1} | operacao: ${operacao}`);
    } else {
        operacao = `-${operacao}`;
        console.log(`MUDANÇA DE SINAL POSITIVO | n1: ${n1} | operacao: ${operacao}`);
    }
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.innerHTML = `${operacao}`;
}
function porcentagem() {
}
function limpar() {
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.innerHTML = ``;
    operacao = ``;
}
function calcular() {
    // Parte que calcula
    //n1 = 8;
    //operador = `-`;
    //n2 = 9;
    separarOperacao();
    console.log(`n1: ${n1} | operador: ${operador} | n2: ${n2}`)
    switch (operador) {
        case `÷`:
            resultado = (n1 / n2);
            console.log(`resultado = (n1 / n2) | ${resultado} = (${n1} / ${n2})`)
            break;
        case `×`:
            resultado = (n1 * n2);
            console.log(`resultado = (n1 * n2) | ${resultado} = (${n1} * ${n2})`)
            break;
        case `-`:
            resultado = (n1 - n2);
            console.log(`resultado = (n1 - n2) | ${resultado} = (${n1} - ${n2})`)
            break;
        case `+`:
            resultado = (n1 + n2);
            console.log(`resultado = (n1 + n2) | ${resultado} = (${n1} + ${n2})`)
            break;
    }
    resultado = resultado.toString()
    operacao = resultado;
    if (resultado.indexOf(`.`) != -1) {
        resultado = resultado.replace(`.`, `,`);
    }
    // Parte de exibição
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.style.color = `white`;
    pDisplay.innerHTML = resultado;
    // Zerar operacao
    n1 = ``;
    operador = ``;
    n2 = ``;
}