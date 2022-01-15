// - - - - - Salvar caractere pressionado - - - - - // Done
// - - - - - Diferenciar caractere de operação - - - - - // Done
// - - - - - Juntar caracteres separados - - - - - // Done
// - - - - - Criar 2 variáveis para os numeros - - - - - // Done

// - - - - - Difenrenciar o 1º do 2º numero - - - - - // Done
// L> A diferença é que o segundo é todo numero a partir do operador.

// - - - - - Criar um 'ans' quando um 2º operador for pressionado - - - - - //


let expressao = ``;
let n1 = ``;
let operador;
let n2 = ``;
let resultado = ``;
let limitadorAns = ``;
let operadores = [`÷`, `×`, `-`, `+`];

function loadCalc() {
    pDisplay = document.getElementById(`pDisplay`);
    pDisplay.focus();
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
function criarPlaceholder(msg) {
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.setAttribute(`placeholder`, `${msg}`);
}
// Verifíca se um array tem um operador e qual é.
function temOperador(array) {
    let operadores = [`÷`, `×`, `-`, `+`];
    let validacao = false;
    //console.log(`array: ${array}`);
    for (let i in operadores) {
        for (let j in array) {
            if (array[j] == operadores[i]) {
                // console.log(`É operador!`)
                validacao = true;
                return [validacao, operadores[i]];
            }
        }
    }
    // console.log(`Não é operador!`)
    return [validacao];
}
function salvarValorInput(value) {
    exibirDisplay(value, `orange`, false);
    expressao = value;
}
function salvarExpressao(char) {

    /*
    Tendo um expressao anterior, caso uma nova seja gerada, sendo ela inicialmente composta por um número, a expressão
    deve ser zerada e o novo numero adiocionado a ela. Caso inicialmente seja composta por um operador matematico
    ela deve manter a expressão com o resultado anterior e proseguir a a expressao.
    */

    // A fazer, quando um novo numero for pressionado, e for o inicial da expressao, 
    // substituir o resultado anterior pelo novo caractere.

    // Criar operacao de keypress

    // Achar o operador para achar o n1
    operador = temOperador(expressao)[1];
    console.log(`expressao: ${expressao}`);

    // Parte que salva a operação
    console.log(`expressao: ${expressao}`);
    expressao += char;
    console.log(`expressao: ${expressao}`);

    // Se o resultado não tem operador, e for diferente de ``, substituí-lo por uma nova expressao
    console.log(`temOperador(resultado)[0] == false: ${temOperador(expressao)[0] == false}`)
    console.log(`resultado != '' : ${resultado != ''}`);
    if (temOperador(expressao)[0] == false && resultado != ``) {
        expressao = `${char}`;
        resultado = ``;
        exibirDisplay(``);
        console.log(`temOperador?: ${temOperador(expressao)[0]} | resultado != '' ${resultado != ''}`);
    } else {
        console.log(`Não executei a substituição!`);
    }

    console.log(`expressao: ${expressao}`);
    // Faz a formatação do input
    if (expressao == `0` && !temOperador(char)) {
        exibirDisplay(``, `orange`, false);
        expressao = ``;
    }



    // Validar expressão quando o primeiro char não é um número.
    if (expressao.startsWith(`,`) || expressao.startsWith(`÷`) || expressao.startsWith(`×`) || expressao.startsWith(`+`)) {
        expressao = ``;
        console.log(`char: ${char} | expressao: ${expressao}`)
    } else {
        // Verificar calculo ANS, que seria o de multiplas expressões de uma vez.
        if (temOperador(char)) {

            // Indentifica todos os operadores da expressão matemática e salva em limitadaorAns
            console.log(`limitadorAns: ${limitadorAns}`);
            for (let j in operadores) {
                limitadorAns += expressao.split(``).filter((charExpressao) => {
                    if (charExpressao == operadores[j]) {
                        return operadores[j];
                    }
                });
            }

            // Le a quantidade de operadores no limitador, caso tenha mais de 1, ele efetua o calculo Ans.
            console.log(`limitadorAns: ${limitadorAns}`);
            if (limitadorAns.length >= 2) {
                // Limpar o limitador para a próxima expressao
                limitadorAns = ``

                // Efetuar a primeira expressão sem o 2º operador.
                let operador2 = expressao.split(``).pop();
                expressao = expressao.substring(0, expressao.length - 1);

                // Adicionar a expressão o resultado com o 2º operador.
                console.log(`Expressap: ${expressao}`);
                console.log(`HORA DE CALCULAR!`);
                calcular();
                expressao = expressao.concat(operador2);
            }
            limitadorAns = ``;

        }
        exibirDisplay(char, `orange`, true);
        console.log(`char: ${char} | expressao: ${expressao}`)
        console.log(`- - - - - Saindo do salvarExpressao - - - - -`)
    }
}
function separarExpressao() {
    // Pegar expressão
    pDisplay = document.getElementById(`pDisplay`);
    expressao = pDisplay.value;
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
            n1 += Number(expressao[i]);
        } else if (i > expressao.indexOf(operador, 1)) {
            n2 += Number(expressao[i]);
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
        exibirDisplay(`Erro!`, `white`, false);

        // Volta ao valor original do display
        setTimeout(() => {
            exibirDisplay(expressao, `orange`, false);
        }, 500)
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
    expressao = ``;
    exibirDisplay(``);
    criarPlaceholder(`0`);
    operador = ``;
    resultado = ``;
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
    console.log(`Resultado: ${resultado}`)
    // Formatar saída de nº decimais
    resultado = resultado.toString();
    expressao = resultado;
    if (resultado.indexOf(`.`) != -1) {
        resultado = resultado.replace(`.`, `,`);
    }
    // Parte de exibição
    if (resultado == 'NaN') {
        exibirDisplay(`Erro!`, `white`, false);
        setTimeout(() => {
            //limpar();
        }, 500);
    } else {
        console.log(`Expressao: ${expressao}`)
        criarPlaceholder(expressao);
        exibirDisplay(`${expressao}`, `white`, false);
    }

    // Zerar variaveis para a próxima expressao
    n1 = ``;
    operador = ``;
    n2 = ``;
    console.log(`ResultadoOOO: ${resultado}`);
    console.log(`-------------`)
}