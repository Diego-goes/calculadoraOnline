let operacao = [];
let n1;
let operador;
let n2;
let resultado;
function salvarOperacao(char) {
    // Parte que salva a operação
    operacao += char;
    // Parte de exibição
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.style.color = `orange`;
    pDisplay.innerHTML += `${char}`;
}
function calcular() {
    // Parte que calcula
    //n1 = 8;
    //operador = `-`;
    //n2 = 9;
    separarOperacao();
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
    }
    // Parte de exibição
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.style.color = `white`;
    pDisplay.innerHTML = resultado;
    // Zerar operacao
    n1 = null;
    operador = ``;
    n2 = null;
}
function mudarSinal() {

}
function porcentagem() {

}
function separarOperacao() {
    let operadores = [`÷`, `×`, `-`, `+`];
    for (let i in operacao) {
        for (let j in operadores) {
            if (operacao[i] == operadores[j]) {
                console.log(`É operador!`);
                operador = operadores[j];
            } else {
                console.log(`É numero!`);
                if(n1 == null){
                    n1 = 0;
                    n1 += Number(operacao[i]);
                }
                else{
                    n2 = 0;
                    n2 += Number(operacao[i]);
                }
            }
        }
    }
    console.log(`n1: ${n1}`);
    console.log(`operador: ${operador}`);
    console.log(`n2: ${n2}`);
    console.log(operacao)
}
// - - - - - Salvar caractere pressionado - - - - - //
// - - - - - Diferenciar caractere de operação - - - - - //
// - - - - - Juntar caracteres separados - - - - - //
// - - - - - Criar 2 variáveis para os numeros - - - - - //
// - - - - - Criar um 'ans' quando um 2º operador for pressionado - - - - - //

function limpar() {
    let pDisplay = document.getElementById(`pDisplay`);
    pDisplay.innerHTML = ``;
    operacao = ``;
}