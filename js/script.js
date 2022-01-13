// - - - - - Salvar caractere pressionado - - - - - // Done
// - - - - - Diferenciar caractere de operação - - - - - // Done
// - - - - - Juntar caracteres separados - - - - - // Done
// - - - - - Criar 2 variáveis para os numeros - - - - - // Done

// - - - - - Difenrenciar o 1º do 2º numero - - - - - // Done
// L> A diferença é que o segundo é todo numero a partir do operador.

// - - - - - Criar um 'ans' quando um 2º operador for pressionado - - - - - //

let expressao = [];
let n1 = ``;
let operador;
let n2 = ``;
let resultado;
let limitadorAns = ``;
let operadores = [`÷`, `×`, `-`, `+`];
function salvarExpressao(char) {
    // Parte que salva a operação
    expressao += char;
    console.log(`char: ${char} | expressao: ${expressao}`)
    // Validar input, quando o primeiro char é um operador.
    if (expressao.startsWith(`,`) || expressao.startsWith(`÷`) || expressao.startsWith(`×`)|| expressao.startsWith(`+`)) {
        expressao = [];
        console.log(`char: ${char} | expressao: ${expressao}`)
    } else {
        // Parte de exibição
        let pDisplay = document.getElementById(`pDisplay`);
        pDisplay.style.color = `orange`;
        // Verificar calculo ANS, que seria o de multiplas expressões de uma vez.
        for (let i in operadores) {
            if (char == operadores[i]) {
                // Indentifica todos os operadores da expressão matemática
                limitadorAns += expressao.split(``).filter((op) => {
                    console.log(`op: ${op} | operadores[i] | bollean: ${op == operadores[i]}`)
                    if (op == operadores[i]) {
                        return operadores[i]
                    }
                });
                expressao = expressao.toString();
                console.log(`limitadorAns: ${limitadorAns}`)
                if (limitadorAns.length >= 2) {
                    limitadorAns = limitadorAns[1];
                    console.log(`Hora de calcular o ANS`)
                    let operador2 = expressao.split(``).pop();
                    expressao = expressao.substring(0, expressao.length - 1);
                    console.log(`expressao: ${expressao}`)
                    calcular();
                    expressao = expressao.concat(operador2);
                    return pDisplay.innerHTML += `${char}`;
                }
            }
        }
        pDisplay.innerHTML += `${char}`;
        console.log(`char: ${char} | expressao: ${expressao}`)
    }
}
function separarExpressao() {
    // Possiveis operadores
    // Achar qual é o operador da operação matemática.
    // As vezes a operação podem começar com o sinal negativo, por isso
    //se deve retirar esse sinal da operação.
    let expressaoSplit = expressao.split(``);
    if (expressao.startsWith(`-`)) {
        expressaoSplit.shift();
    }
    operador = expressaoSplit.find((char) => {
        for (let i in operadores) {
            if (char == operadores[i]) {
                return operadores[i];
            }
        }
    });

    // Achar o n1 e n2
    console.log(`expressao.indexOf(operador): ${expressao.indexOf(operador, 1)}`)
    for (let i in expressao) {
        if (i < expressao.indexOf(operador, 1)) {
            console.log(`expressao[${i}]: ${expressao[i]}`);
            n1 += expressao[i];
            console.log(`n1: ${n1} | length: ${n1.length}`);
        } else if (i > expressao.indexOf(operador, 1)) {
            console.log(`expressao[${i}]: ${expressao[i]}`);
            n2 += expressao[i];
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
    if (expressao.startsWith(`-`)) {
        expressao = expressao.replace(`-`, ``);
        console.log(`MUDANÇA DE SINAL NEGATIVO | n1: ${n1} | expressao: ${expressao}`);
    } else {
        expressao = `-${expressao}`;
        console.log(`MUDANÇA DE SINAL POSITIVO | n1: ${n1} | expressao: ${expressao}`);
    }
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.innerHTML = `${expressao}`;
}
function porcentagem() {
    expressao = (Number(expressao) / 100).toString();
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.innerHTML = `${expressao}`;
}
function limpar() {
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.innerHTML = ``;
    expressao = ``;
    console.clear();
}
function calcular() {
    // Parte que calcula
    separarExpressao();
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
    expressao = resultado;
    if (resultado.indexOf(`.`) != -1) {
        resultado = resultado.replace(`.`, `,`);
    }
    // Parte de exibição
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.style.color = `white`;
    pDisplay.innerHTML = resultado;
    // Zerar expressao
    //expressao = resultado;
    //limitadorAns = 0;
    n1 = ``;
    operador = ``;
    n2 = ``;
    console.log(`-------------`)
}