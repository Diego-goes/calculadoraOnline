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
let limitadorAns = ``;
let operadores = [`÷`, `×`, `-`, `+`];
function salvarOperacao(char) {
    // Parte que salva a operação
    operacao += char;
    console.log(`char: ${char} | operacao: ${operacao}`)
    if (operacao.startsWith(`,`) || operacao.startsWith(`÷`) || operacao.startsWith(`×`)) {
        operacao = operacao.replace(char, "");
        console.log(`char: ${char} | operacao: ${operacao}`)
    } else {
        // Parte de exibição
        let pDisplay = document.getElementById(`pDisplay`);
        pDisplay.style.color = `orange`;
        for (let i in operadores) {
            if (char == operadores[i]) {
                limitadorAns += operacao.split(``).filter((op) => {
                    console.log(`op: ${op} | operadores[i] | bollean: ${op == operadores[i]}`)
                    if (op == operadores[i]) {
                        return operadores[i]
                    }
                });
                operacao = operacao.toString();
                console.log(`limitadorAns: ${limitadorAns}`)
                if (limitadorAns.length >= 2) {
                    limitadorAns = limitadorAns[1];
                    console.log(`Hora de calcular o ANS`)
                    let operador2 = operacao.split(``).pop();
                    operacao = operacao.substring(0, operacao.length - 1);
                    console.log(`operacao: ${operacao}`)
                    calcular();
                    operacao = operacao.concat(operador2);
                    return pDisplay.innerHTML += `${char}`;
                }
            }
        }
        pDisplay.innerHTML += `${char}`;
        console.log(`char: ${char} | operacao: ${operacao}`)
    }
}
function separarOperacao() {
    // Possiveis operadores
    // Achar qual é o operador da operação matemática.
    // As vezes a operação podem começar com o sinal negativo, por isso
    //se deve retirar esse sinal da operação.
    let operacaoSplit = operacao.split(``);
    if (operacao.startsWith(`-`)) {
        operacaoSplit.shift();
    }
    operador = operacaoSplit.find((char) => {
        for (let i in operadores) {
            if (char == operadores[i]) {
                return operadores[i];
            }
        }
    });

    // Achar o n1 e n2
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
    operacao = (Number(operacao) / 100).toString();
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.innerHTML = `${operacao}`;
}
function limpar() {
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.innerHTML = ``;
    operacao = ``;
    console.clear();
}
function calcular() {
    // Parte que calcula
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
    //operacao = resultado;
    //limitadorAns = 0;
    n1 = ``;
    operador = ``;
    n2 = ``;
    console.log(`-------------`)
}