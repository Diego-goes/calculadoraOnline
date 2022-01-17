// - - - - - Salvar caractere pressionado - - - - - // Done
// - - - - - Diferenciar caractere de operação - - - - - // Done
// - - - - - Juntar caracteres separados - - - - - // Done
// - - - - - Criar 2 variáveis para os numeros - - - - - // Done

// - - - - - Difenrenciar o 1º do 2º numero - - - - - // Done
// L> A diferença é que o segundo é todo numero a partir do operador.

// - - - - - Criar um 'ans' quando um 2º operador for pressionado - - - - - //


let expressao = `0`;
let n1 = ``;
let operador;
let n2 = ``;
let resultado = ``;
let limitadorAns = ``;

function exibirErro(msg, fontSize) {
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.style.fontSize = `${fontSize}`;
    pDisplay.style.textAlign = `center`;
    exibirDisplay(`${msg}`, `white`, false);
    setTimeout(() => {
        pDisplay.style.fontSize = `45pt`;
        pDisplay.style.textAlign = `right`;
        limpar();
    }, 1000);
}
function acessoMobile() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    }
    else {
        return false;
    }
}

function loadCalc() {
    pDisplay = document.getElementById(`pDisplay`);
    if (acessoMobile) {
        pDisplay.focus();
    }
}

// Exibe as mensagens no display com a cor especificada.
function exibirDisplay(msg, cor, concat) {
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.style.color = `${cor}`;
    if (concat == true) {
        pDisplay.value += `${msg}`;
    } else {
        pDisplay.value = `${msg}`;
    }
}
function arredondar(num) {
    return (parseFloat(num.toPrecision(12)));
}
// Verifíca se um array tem um operador e qual é.
function temOperador(string) {
    let operadores = [`÷`, `×`, `-`, `+`, `%`];
    let validacao = false;
    let op;

    // Caso o nº seja negativo, tirar o '-' para achar o primeiro operador.
    if (string.startsWith(`-`) && string.length != 1) {
        string = string.split(``);
        // console.log(`string: ${string}`);
        string.shift();
        // console.log(`string: ${string}`);
        string = string.join(``);
        // console.log(`string: ${string}`);
    }
    for (let i in string) {
        for (let j in operadores) {
            if (string[i] == operadores[j]) {
                op = operadores[j];
                validacao = true;
                return [validacao, op];
            }
        }
    }
    return [validacao];
}
function salvarValorInput(value) {
    exibirDisplay(value, `orange`, false);
    expressao = value;
}
function salvarExpressao(char) {
    console.log(`------- Entrou em salvarExpressao: -------`)
    /*
    Tendo um expressao anterior, caso uma nova seja gerada, sendo ela inicialmente composta por um número, a expressão
    deve ser zerada e o novo numero adiocionado a ela. Caso inicialmente seja composta por um operador matematico
    ela deve manter a expressão com o resultado anterior e proseguir a a expressao.
    */

    // A fazer, quando um novo numero for pressionado, e for o inicial da expressao, 
    // substituir o resultado anterior pelo novo caractere.

    // Criar operacao de keypress

    // Faz a formatação do input
    if (expressao == `0` && temOperador(char) && char != `,`) {
        exibirDisplay(``, `orange`, false);
        expressao = ``;
    }

    // Parte que salva a operação
    console.log(`expressao: ${expressao}`);
    expressao += char;
    console.log(`expressao: ${expressao}`);

    // Achar o operador para achar o n1
    operador = temOperador(expressao)[1];
    console.log(`operador: ${operador}`);

    // Se o resultado não tem operador, e for diferente de ``, substituí-lo por uma nova expressao
    if (temOperador(expressao)[0] == false && resultado != `` && expressao[1] != `,`) {
        expressao = `${char}`;
        resultado = ``;
        exibirDisplay(``);
        // console.log(`temOperador?: ${temOperador(expressao)[0]} | resultado != '' ${resultado != ''}`);
    } else {
        // console.log(`Não executei a substituição!`);
    }

    // Validar expressão quando o primeiro char for um número.
    if (temOperador(expressao[0])[0] && expressao[0] != `-`) {
        expressao = ``;
    } else {
        // Verificar calculo ANS, que seria o de multiplos operadores em uma unica expressao.
        if (temOperador(char)[0]) {
            // Indentifica todos os operadores da expressão matemática e salva em limitadaorAns
            limitadorAns = ``;
            let operadores = [`÷`, `×`, `-`, `+`, `%`];
            for (let j in operadores) {
                limitadorAns += expressao.split(``).filter((charExpressao) => {
                    if (charExpressao == operadores[j]) {
                        return operadores[j];
                    }
                });
            }
            console.log(`expressao: ${expressao} | limitadorAns: ${limitadorAns}`);
            // Corrigir a vírgula que contava como espaço em length
            limitadorAns = limitadorAns.split(`,`).join(``);

            // Le a quantidade de operadores no limitador, caso tenha mais de 1, ele efetua o calculo Ans.
            let limite;
            expressao.startsWith(`-`) ? limite = 3 : limite = 2;
            if (limitadorAns.length >= limite) {
                // Se o caractere seguinte do operador for outro operador, retornar erro.
                operador = temOperador(expressao)[1];
                if (!temOperador(expressao[expressao.indexOf(operador) + 1])[0]) {

                    // Limpar o limitador para a próxima expressao
                    limitadorAns = ``
                    if (expressao.startsWith(`-`)) {
                        // Efetuar a primeira expressão sem o 2º operador.
                        let operador2 = expressao.split(``).pop();
                        expressao = expressao.substring(0, expressao.length - 1);

                        // Adicionar a expressão o resultado com o 2º operador.
                        console.log(`HORA DE CALCULAR!`);
                        calcular();
                        expressao = expressao.concat(operador2);
                    } else {
                        // Efetuar a primeira expressão sem o 2º operador.
                        let operador2 = expressao.split(``).pop();
                        expressao = expressao.substring(0, expressao.length - 1);
                        console.log(`expressao: ${expressao}`);

                        // Adicionar a expressão o resultado com o 2º operador.
                        console.log(`HORA DE CALCULAR!`);
                        calcular();
                        expressao = expressao.concat(operador2);
                    }

                } else {
                    limitadorAns = ``;
                    console.log(`Operadores duplicados e seguidos!`);
                    console.log(`expressao: ${expressao}`);
                    let novoOperador = expressao.split(``).pop();
                    expressao = expressao.split(``);
                    expressao.pop();
                    expressao.pop();
                    expressao = expressao.join(``);
                    expressao = expressao.concat(novoOperador);
                    console.log(`expressao: ${expressao}`);
                    return exibirDisplay(expressao, `orange`, false);
                }
            }
        }
        console.log(`char: ${char} | expressao: ${expressao}`);
        exibirDisplay(char, `orange`, true);
        console.log(`char: ${char} | expressao: ${expressao}`);
        console.log(`- - - - - Saindo do salvarExpressao - - - - -`);
    }
}
function separarExpressao() {
    // // Pegar expressão
    // pDisplay = document.getElementById(`pDisplay`);
    // expressao = pDisplay.value;
    // Acha o operador da expressão

    // Pegar operador
    operador = temOperador(expressao)[1];

    // Achar o n1 e n2
    console.log(`expressao: ${expressao}`);
    for (let i in expressao) {
        console.log(`i: ${i}`);
        console.log(`indexOf(operador): ${expressao.indexOf(operador, 1)}`);
        if (i < expressao.indexOf(operador, 1)) {
            console.log(`expressao[${i}]: ${expressao[i]} | É n1? ${i < expressao.indexOf(operador, 1)}`);
            n1 += expressao[i];
        } else if (i > expressao.indexOf(operador, 1)) {
            console.log(`expressao[${i}]: ${expressao[i]} | É n2? ${i > expressao.indexOf(operador, 1)}`);
            n2 += expressao[i];
        }
    }
    console.log(`n1: ${n1} | n2: ${n2}`);

    // Corrigir formato de decimais para efetuar as operações.
    if (n1.toString().indexOf(`,`) != -1) {
        n1 = Number(n1.replace(`,`, `.`));
    } else {
        n1 = Number(n1);
    }
    if (n2.toString().indexOf(`,`) != -1) {
        n2 = Number(n2.replace(`,`, `.`));
    } else {
        n2 = Number(n2);
    }
}
function mudarSinal() {
    //alert(`MUDAR DE SINAL | n1: ${n1}`)
    if (expressao.startsWith(`-`)) {
        expressao = expressao.replace(`-`, ``);
        resultado = resultado.replace(`-`, ``);
        console.log(`MUDANÇA DE SINAL NEGATIVO | n1: ${n1} | expressao: ${expressao}`);
        console.log(`MUDANÇA DE SINAL NEGATIVO | n1: ${n1} | expressao: ${resultado}`);
    } else {
        expressao = `-${expressao}`;
        resultado = `-${resultado}`;
        console.log(`MUDANÇA DE SINAL POSITIVO | n1: ${n1} | expressao: ${expressao}`);
        console.log(`MUDANÇA DE SINAL POSITIVO | n1: ${n1} | expressao: ${resultado}`);
    }
    expressao = expressao.replace(`.`, `,`);
    exibirDisplay(expressao, `orange`, false);
}
// function porcentagem() {
//     // Formata, faz o calculo de um numero divido por cem, e salva em 'numero'.
//     let numero = (Number(expressao.replace(`,`, `.`)) / 100).toString();

//     // Valida se o valor é valido (apenas 1 numero), para efetuar a operação
//     if (numero == 'NaN') {
//         // Exibe uma mensagem de erro no display durante 1 segundo.
//         exibirErro(`Calculo inválido!`, `32pt`);
//     } else {
//         numero = numero.toString().replace(`.`, `,`);
//         expressao = numero;
//         resultado = expressao;
//         exibirDisplay(resultado, `orange`, false);
//     }
//     console.log(`expressao: ${expressao}`);
//     console.log(`resultado: ${resultado}`);
//     console.log(`operador: ${operador}`)
// }
function limpar() {
    expressao = `0`;
    exibirDisplay(expressao);
    operador = ``;
    resultado = expressao;
    loadCalc();
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
        case `%`:
            console.log(`n1: ${n1} | n2: ${n2}`);
            if (n2 == 0) {
                resultado = (n1 / 100);
            } else {
                resultado = ((n1 / 100) * n2);
            }
    }
    console.log(`Expressao: ${expressao}`);
    console.log(`Resultado: ${resultado}`);
    // Formatar saída de nº decimais
    //resultado = arredondar(Number(resultado)).toString();
    resultado = resultado.toString();
    expressao = resultado;
    if (resultado.indexOf(`.`) != -1) {
        resultado = resultado.replace(`.`, `,`);
        expressao = resultado;
    }
    console.log(`Expressao: ${expressao}`);
    console.log(`Resultado: ${resultado}`);
    // Parte de exibição
    if (resultado == 'NaN') {
        //exibirErro(`Calculo inválido!`, `32pt`)
    } else {
        exibirDisplay(`${expressao}`, `white`, false);
    }

    // Zerar variaveis para a próxima expressao
    n1 = ``;
    operador = ``;
    n2 = ``;
    console.log(`- - - - - Saindo do calcular - - - - -`);
}