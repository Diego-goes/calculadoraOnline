class CalcController {
    constructor() {
        this._audioFx = new Audio('click.mp3');
        this._expressao = '0';
        this._resultado = '';
        this._historicoEl = document.querySelector('#pHistorico');
        this._displayEl = document.querySelector('#inputDisplay');
        this._operadoresPossiveis = [`÷`, `×`, `-`, `+`, `%`];
        this.inicializar()
    }
    inicializar() {
        this.addEventosBtns();
    }
    addEventosBtns() {
        document.querySelectorAll('.inputBtn').forEach((btn) => {
            // Adicionando efeito de audio ao clicar
            btn.addEventListener('click', () => {
                this._audioFx.currentTime = 0;
                this._audioFx.play();
            })
            // Demais eventos
            switch (btn.id) {
                case 'limparBtn':
                    btn.addEventListener('click', () => {
                        this.limparExpressao();
                    });
                    break;
                case 'maisMenosBtn':
                    //evento alterar sinal;
                    break;
                case 'porcentagemBtn':
                    //evento porcentagem;
                    break;
                case 'igualBtn':
                    btn.addEventListener('click', () => {
                        this.mostrarResultado();
                    });
                    break;
                default:
                    btn.addEventListener('click', () => {
                        this.salvarExpressao(btn.value);
                    });
                    break;
            }
        });
    }
    limparExpressao() {
        console.clear();
        this._expressao = '0';
        this._resultado = ''
        this.atualizarDisplay(this._expressao);
    }
    atualizarDisplay(msg) {
        this.display = msg;
    }
    removerPernultimoChar() {
        let novoOperador = this._expressao.split(``).pop();
        let novaExpressao = this._expressao.slice(0, -2);
        this._expressao = novaExpressao + novoOperador;
    }
    tornarInterativo(char) {
        // Se a expressão começar com 0, substituir o 0 pelo digito 
        this._expressao.toString().startsWith('0') ? this._expressao = char : this._expressao += char;

        // Se antes do operador, tiver uma virgula, remover a virgula
        if (this.temOperador(char)) {
            for (let i in this._expressao) {
                let charAnterior = this._expressao[Number(i) - 1];
                if (this._expressao[i] == char && charAnterior == ',') {
                    this.removerPernultimoChar();
                }
            }
        }
        // Se o char digitado for um operador, verifica se existe dois operadores seguidos, e faz uma correção.
        if (this.temOperador(char)) {
            // ler expressao
            for (let i in this._expressao) {
                // verificar aonde fica o char na expressao
                if (this._expressao[i] == char) {
                    // Verificar se antes do char na expressão, tem um operador
                    let penultimoChar = this._expressao[Number(i) - 1];
                    if (this.temOperador(penultimoChar)) {
                        let antiPenultimoChar = this._expressao[Number(i) - 2];
                        if (penultimoChar == '+') {
                            this.removerPernultimoChar();
                        } else if (penultimoChar == '-' && this.temOperador(antiPenultimoChar) == false) {
                            this.removerPernultimoChar();
                        } else if (penultimoChar == '-' && this.temOperador(antiPenultimoChar) == true) {
                            let novaExpressao = this._expressao.slice(0, -1);
                            this._expressao = novaExpressao;
                        } else if (char != '-') {
                            this.removerPernultimoChar();
                        }
                    }
                }
            }
        }

        // Se ao final de um calculo, um novo numero for digitado, substituir a expressão pelo numero.
        if (this.temOperador(this._expressao) == false && this._resultado != '') {
            this._expressao = char;
            this._resultado = '';
        }
    }
    temOperador(string) {
        for (let i in string) {
            if (this._operadoresPossiveis.indexOf(string[i]) != -1) {
                return true;
            }
        }
        return false;
    }
    salvarExpressao(char) {
        this.tornarInterativo(char);
        this.atualizarDisplay(this._expressao);
    }
    mostrarResultado() {
        this.calcular()
        this.atualizarDisplay(this._expressao);
    }
    corrigirSeparadores(novoSeparador, string) {
        // Função que alterna entre ponto ou virgula em uma variavel.
        let antigoSeparador;
        novoSeparador == '.' ? antigoSeparador = ',' : antigoSeparador = '.';
        string = string.split(`${antigoSeparador}`);
        return string = string.join(`${novoSeparador}`).toString();
    }
    corrigirOperadores() {
        this._expressao = this._expressao.replace("×", "*");
        this._expressao = this._expressao.replace("÷", "/");
    }
    arredondar(num) {
        return parseFloat(num.toPrecision(12));
    }
    calcular() {
        this.corrigirOperadores();
        this._expressao = this.corrigirSeparadores('.', this._expressao.toString());
        this._resultado = eval(this._expressao);
        this._resultado = this.arredondar(this._resultado);
        this._resultado = this.corrigirSeparadores(',', this._resultado.toString());
        this._expressao = this._resultado;
        // this._resultado = '';
    }
    get display() {
        return this._displayEl.value;
    }
    set display(vl) {
        return this._displayEl.value = vl;
    }
}