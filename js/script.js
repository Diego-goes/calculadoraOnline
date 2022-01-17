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
let operadores = [`÷`, `×`, `-`, `+`];

// function exibirErro(msg, fontSize) {
//     let pDisplay = document.getElementById(`pDisplay`);
//         pDisplay.style.fontSize = `${fontSize}`;
//         pDisplay.style.textAlign = `center`;
//         exibirDisplay(`${msg}`, `white`, false);
//         setTimeout(() => {
//             pDisplay.style.fontSize = `45pt`;
//             pDisplay.style.textAlign = `right`;
//             limpar();
//         }, 1000);
// }
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
    let operadores = [`÷`, `×`, `-`, `+`];
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
    if (expressao == `0` && temOperador(char)) {
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
    if (temOperador(expressao[0])[0]) {
        expressao = ``;
    } else {
        // Verificar calculo ANS, que seria o de multiplos operadores em uma unica expressao.
        if (temOperador(char)[0]) {
            console.log(`limitadorAns: ${limitadorAns} | length: ${limitadorAns.length}`);
            // Indentifica todos os operadores da expressão matemática e salva em limitadaorAns
            limitadorAns = ``;
            for (let j in operadores) {
                limitadorAns += expressao.split(``).filter((charExpressao) => {
                    if (charExpressao == operadores[j]) {
                        return operadores[j];
                    }
                });
            }

            // Corrigir a vírgula que contava como espaço em length
            console.log(`limitadorAns: ${limitadorAns} | length: ${limitadorAns.length}`);
            limitadorAns = limitadorAns.split(`,`).join(``);
            console.log(`limitadorAns: ${limitadorAns} | length: ${limitadorAns.length}`);

            // Le a quantidade de operadores no limitador, caso tenha mais de 1, ele efetua o calculo Ans.
            let limite;
            expressao.startsWith(`-`) ? limite = 3 : limite = 2;
            console.log(`limitadorAns.length: ${limitadorAns.length} | limite: ${limite}`);
            console.log(`expressao: ${expressao}`);
            if (limitadorAns.length >= limite) {
                // Se o caractere seguinte do operador for outro operador, retornar erro.
                console.log(`Pegando operador!`);
                operador = temOperador(expressao)[1];
                console.log(`expressao: ${expressao}`);
                console.log(`operador: ${operador}`);
                console.log(`expressao.indexOf(operador): ${expressao.indexOf(operador)}`);
                console.log(`expressao.indexOf(operador) + 1: ${expressao.indexOf(operador) + 1}`);
                console.log(`expressao[expressao.indexOf(operador) + 1]: ${expressao[expressao.indexOf(operador) + 1]}`);
                console.log(`temOperador(expressao[expressao.indexOf(operador) + 1])[0]: ${temOperador(expressao[expressao.indexOf(operador) + 1])[0]}`);
                console.log(`operador: ${operador}`);
                if (!temOperador(expressao[expressao.indexOf(operador) + 1])[0]) {
                    console.log(`nº operadores: ${limitadorAns.length} | ans: ${limitadorAns}`);

                    // Limpar o limitador para a próxima expressao
                    limitadorAns = ``
                    console.log(`expressao: ${expressao}`);
                    if (expressao.startsWith(`-`)) {
                        // Efetuar a primeira expressão sem o 2º operador.
                        let operador2 = expressao.split(``).pop();
                        console.log(`expressao: ${expressao}`);
                        expressao = expressao.substring(0, expressao.length - 1);
                        console.log(`expressao: ${expressao}`);

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
                    let novoOperador = expressao.split(``).pop();
                    console.log(`expressao: ${expressao}`);
                    expressao = expressao.split(``);
                    console.log(`expressao: ${expressao}`);
                    expressao.pop();
                    expressao.pop();
                    console.log(`expressao: ${expressao}`);
                    expressao = expressao.join(``);
                    console.log(`expressao: ${expressao}`);
                    expressao = expressao.concat(novoOperador);
                    console.log(`expressao: ${expressao} | novoOperador: ${novoOperador}`);
                    return exibirDisplay(expressao, `orange`, false);
                }
            }
        }
        exibirDisplay(char, `orange`, true);
        console.log(`char: ${char} | expressao: ${expressao}`)
        console.log(`- - - - - Saindo do salvarExpressao - - - - -`);
    }
}
function separarExpressao() {
    // // Pegar expressão
    // pDisplay = document.getElementById(`pDisplay`);
    // expressao = pDisplay.value;
    // Acha o operador da expressão
    console.log(`expressao: ${expressao}`);
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
function porcentagem() {
    // Formata, faz o calculo de um numero divido por cem, e salva em 'numero'.
    let numero = (Number(expressao.replace(`,`, `.`)) / 100).toString();

    // Valida se o valor é valido (apenas 1 numero), para efetuar a operação
    if (numero == 'NaN') {
        // Exibe uma mensagem de erro no display durante 1 segundo.
        let pDisplay = document.getElementById(`pDisplay`);
        pDisplay.style.fontSize = `32pt`;
        pDisplay.style.textAlign = `center`;
        exibirDisplay(`Erro!`, `white`, false);

        // Volta ao valor original do display
        setTimeout(() => {
            pDisplay.style.fontSize = `45pt`;
            pDisplay.style.textAlign = `right`;
            exibirDisplay(expressao, `orange`, false);
        }, 1000)
    } else {
        numero = numero.toString().replace(`.`, `,`);
        expressao = numero;
        resultado = expressao;
        exibirDisplay(resultado, `orange`, false);
    }
    console.log(`expressao: ${expressao}`);
    console.log(`resultado: ${resultado}`);
    console.log(`operador: ${operador}`)
}
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
        // let pDisplay = document.getElementById(`pDisplay`);
        // pDisplay.style.fontSize = `32pt`;
        // pDisplay.style.textAlign = `center`;
        // exibirDisplay(`Calculo inválido!`, `white`, false);
        // setTimeout(() => {
        //     pDisplay.style.fontSize = `45pt`;
        //     pDisplay.style.textAlign = `right`;
        //     limpar();
        // }, 1000);
        exibirErro(`Calculo inválido!`,`32pt`)
    } else {
        exibirDisplay(`${expressao}`, `white`, false);
    }

    // Zerar variaveis para a próxima expressao
    n1 = ``;
    operador = ``;
    n2 = ``;
    console.log(`- - - - - Saindo do calcular - - - - -`);
}