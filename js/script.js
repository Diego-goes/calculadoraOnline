let expressao = `0`;
let n1 = ``;
let operador;
let n2 = ``;
let resultado = ``;

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

// Prepara a calculadora para o tipo de dispositivo
function loadCalc() {
    pDisplay = document.getElementById(`pDisplay`);
    if (acessoMobile() == false) {
        pDisplay.focus();
    } else {
        let header = document.getElementById(`header`);
        header.style.display = `none`
        let sectionCalc = document.getElementById(`calculadora`);
        sectionCalc.style.marginTop = `30px`;
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

// Verifíca se uma string tem um operador e qual é.
function temOperador(string) {
    let operadores = [`÷`, `×`, `-`, `+`, `%`];
    let validacao = false;
    let op;

    // Caso o nº seja negativo, tirar o '-' para achar o primeiro operador.
    if (string.startsWith(`-`) && string.length != 1) {
        string = string.split(``);
        string.shift();
        string = string.join(``);
    }

    // Ler caractere por caractere, e verificar se ele é um operador, retorna um boolean e qual o operador.
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

function salvarExpressao(char) {

    // Caso um novo numero seja digitado, e o display exiba 0, o novo numero vai substituir o 0.
    if (expressao == `0` && temOperador(char) == false && char != `,`) {
        exibirDisplay(``, `orange`, false);
        expressao = ``;
    }

    // Parte que salva a operação
    expressao += char;

    // Achar o operador
    operador = temOperador(expressao)[1];

    // Se o resultado não tem operador, e for diferente de ``, substituí-lo pela nova expressao.
    if (temOperador(expressao)[0] == false && resultado != `` && expressao[1] != `,`) {
        expressao = `${char}`;
        resultado = ``;
        exibirDisplay(``);
    }

    // Validar expressão quando o primeiro char for um número.
    if (temOperador(expressao[0])[0] && expressao[0] != `-`) {
        expressao = ``;
    } else {
        // Verificar calculo ANS, que seria o de multiplos operadores em uma unica expressao.
        if (temOperador(char)[0] == false) {
            exibirDisplay(char, `orange`, true);
        } else {
            // Indentifica todos os operadores da expressão matemática e salva em limitadaorAns
            let limitadorAns = ``;
            let operadores = [`÷`, `×`, `-`, `+`, `%`];
            for (let j in operadores) {
                limitadorAns += expressao.split(``).filter((charExpressao) => {
                    if (charExpressao == operadores[j]) {
                        return operadores[j];
                    }
                });
            }

            // Corrigir a vírgula que conta como espaço em length
            limitadorAns = limitadorAns.split(`,`).join(``);

            // Le a quantidade de operadores no limitador, caso tenha mais de 1, ele efetua o calculo Ans.
            // Caso o n1 seja negativo, é nescessário no mínimo 3 operadores para realizar o calculo Ans.
            let limite;
            expressao.startsWith(`-`) ? limite = 3 : limite = 2;
            console.log(`expressao: ${expressao}`);
            if (limitadorAns.length < limite) {
                exibirDisplay(expressao, `orange`, false);
            } else {
                // Limpar o limitador para a próxima expressao
                limitadorAns = ``;

                // Verificar se os 2 operadores são seguidos
                operador = temOperador(expressao)[1];
                if (temOperador(expressao[expressao.indexOf(operador) + 1])[0] == false) {

                    // Efetuar a primeira expressão sem o 2º operador.
                    let operador2 = expressao.split(``).pop();
                    expressao = expressao.substring(0, expressao.length - 1);
                    calcular();

                    // Adicionar a expressão o resultado com o 2º operador.
                    expressao = expressao.concat(operador2);
                }
                else {
                    // Como são operadores seguidos, o ultimo substitui o primeiro.
                    let novoOperador = expressao.split(``).pop();
                    expressao = expressao.split(``);
                    expressao.pop();
                    expressao.pop();
                    expressao = expressao.join(``);
                    expressao = expressao.concat(novoOperador);
                }
                exibirDisplay(expressao, `orange`, false);
            }
        }
    }
}
function separarExpressao() {
    // Pegar operador
    operador = temOperador(expressao)[1];

    // Achar o n1 e n2
    for (let i in expressao) {
        if (i < expressao.indexOf(operador, 1)) {
            n1 += expressao[i];
        } else if (i > expressao.indexOf(operador, 1)) {
            n2 += expressao[i];
        }
    }

    // Corrigir formato de decimais para efetuar as operações.
    n1.toString().indexOf(`,`) != -1 ? n1 = Number(n1.replace(`,`, `.`)) : n1 = Number(n1);
    n2.toString().indexOf(`,`) != -1 ? n2 = Number(n2.replace(`,`, `.`)) : n2 = Number(n2);
}
function mudarSinal() {
    if (expressao.startsWith(`-`)) {
        expressao = expressao.replace(`-`, ``);
        resultado = resultado.replace(`-`, ``);
    } else {
        expressao = `-${expressao}`;
        resultado = `-${resultado}`;
    }
    expressao = expressao.replace(`.`, `,`);
    exibirDisplay(expressao, `orange`, false);
}
function limpar() {
    expressao = `0`;
    resultado = expressao;
    exibirDisplay(expressao);
    loadCalc();
    // console.clear();
}
function calcular() {
    // Parte que calcula
    separarExpressao();
    switch (operador) {
        case `÷`:
            resultado = (n1 / n2);
            break;
        case `×`:
            resultado = (n1 * n2);
            break;
        case `-`:
            resultado = (n1 - n2);
            break;
        case `+`:
            resultado = (n1 + n2);
            break;
        case `%`:
            if (n2 == 0) {
                resultado = (n1 / 100);
            } else {
                resultado = ((n1 / 100) * n2);
            }
    }

    // Formatar saída de nº decimais
    resultado = arredondar(Number(resultado)).toString();
    expressao = resultado;
    if (resultado.indexOf(`.`) != -1) {
        resultado = resultado.replace(`.`, `,`);
        expressao = resultado;
    }
    // Parte de exibição
    if (resultado == 'NaN') {
        exibirErro(`Calculo inválido!`, `32pt`)
    } else {
        exibirDisplay(`${expressao}`, `white`, false);
    }

    // Zerar variaveis para a próxima expressao
    n1 = ``;
    operador = ``;
    n2 = ``;
    console.log(`- - - - - Saindo do calcular - - - - -`);
}