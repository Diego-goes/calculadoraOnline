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
let resultado = ``;
let limitadorAns = ``;
let operadores = [`÷`, `×`, `-`, `+`];


function exibirDisplay(msg, cor, concat) {
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.style.color = `${cor}`;
    if (concat == true) {
        pDisplay.value += `${msg}`;
    } else {
        pDisplay.value = `${msg}`;
    }
}

function salvarExpressao(char) {
    /*
    Tendo um expressao anterior, caso uma nova seja gerada, sendo ela inicialmente composta por um número, a expressão
    deve ser zerada e o novo numero adiocionado a ela. Caso inicialmente seja composta por um operador matematico
    ela deve manter a expressão com o resultado anterior e proseguir a a expressao.
    */

    // Parte que salva a operação
    expressao += char;

    // Validar expressão quando o primeiro char não é um número.
    if (expressao.startsWith(`,`) || expressao.startsWith(`÷`) || expressao.startsWith(`×`) || expressao.startsWith(`+`)) {
        expressao = [];
        console.log(`char: ${char} | expressao: ${expressao}`)
        console.log(`Resultado-Anterior: ${resultado}`);
    } else {
        // Verificar calculo ANS, que seria o de multiplas expressões de uma vez.
        for (let i in operadores) {
            if (char == operadores[i]) {

                // Indentifica todos os operadores da expressão matemática e salva em limitadaorAns
                for (let j in operadores) {
                    limitadorAns += expressao.split(``).filter((charExpressao) => {
                        if (charExpressao == operadores[j]) {
                            return operadores[j];
                        }
                    });
                }

                // Le a quantidade de operadores no limitador, caso tenha mais de 1, ele efetua o calculo Ans.
                if (limitadorAns.length >= 2) {
                    // Limpar o limitador para a próxima expressao
                    limitadorAns = ``

                    // Efetuar a primeira expressão sem o 2º operador.
                    let operador2 = expressao.split(``).pop();
                    expressao = expressao.substring(0, expressao.length - 1);
                    console.log(`expressao: ${expressao}`)

                    // Adicionar a expressão o resultado com o 2º operador.
                    calcular();
                    expressao = expressao.concat(operador2);
                }
            }
        }
        exibirDisplay(char, `orange`, true);
        console.log(`char: ${char} | expressao: ${expressao}`)
    }
}
function separarExpressao() {
    // Acha o operador da expressão
    let expressaoSplit = expressao.split(``);
    // caso o primeiro nº seja negativo, ele se torna positivo para achar o próximo operador.
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
    for (let i in expressao) {
        if (i < expressao.indexOf(operador, 1)) {
            n1 += expressao[i];
        } else if (i > expressao.indexOf(operador, 1)) {
            n2 += expressao[i];
        }
    }

    // Corrigir formato de decimais para efetuar as operações.
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
    expressao = expressao.replace(`.`, `,`);
    exibirDisplay(expressao,`orange`, false);
}
function porcentagem() {
    // Formata, faz o calculo de um numero divido por cem, e salva em 'numero'.
    let numero = (Number(expressao.replace(`,`, `.`)) / 100).toString();

    // Valida se o valor é valido (apenas 1 numero), para efetuar a operação
    if (numero == 'NaN') {
        // Exibe uma mensagem de erro no display durante 1 segundo.
        exibirDisplay(`Erro!`,`white`, false);

        // Volta ao valor original do display
        setTimeout(() => {
            exibirDisplay(expressao,`orange`,false);
        }, 500)
    } else {
        numero = numero.toString().replace(`.`, `,`);
        expressao = numero;
        resultado = expressao;
        exibirDisplay(resultado,`orange`,false);
    }
    console.log(`expressao: ${expressao}`);
    console.log(`resultado: ${resultado}`);
    console.log(`operador: ${operador}`)
}

function limpar() {
    exibirDisplay(``);
    expressao = [];
    operador = ``;
    resultado = ``;
    console.clear();
    console.log(`Resultado: ${resultado}`);
    console.log(`Expressao: ${expressao}`);
    console.log(`Operador: ${operador}`);
    console.log(`-----------------------`);
}
function calcular() {
    // Parte que calcula
    separarExpressao();
    console.log(`Operação: (n1: ${n1}) (operador: ${operador}) (n2: ${n2})`)
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
    console.log(`Expressao: ${expressao}`);

    // Formatar saída de nº decimais
    resultado = resultado.toString();
    expressao = resultado;
    if (resultado.indexOf(`.`) != -1) {
        resultado = resultado.replace(`.`, `,`);
    }
    // Parte de exibição
    exibirDisplay(resultado,`white`,false);

    // Zerar variaveis para a próxima expressao
    n1 = ``;
    operador = ``;
    n2 = ``;
    console.log(`-------------`)
}