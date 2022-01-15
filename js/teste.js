function strip(number) {
    return (parseFloat(number.toPrecision(12)));
}
let n1 = -0.1;
let n2 = -0.2;
let resultado = (n1 + n2);
resultado = parseFloat(resultado.toPrecision(12)).toString();
console.log(`resultado: ${resultado}`);
