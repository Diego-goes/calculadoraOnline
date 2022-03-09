class CalcController {
    constructor() {
        this._audioFx = new Audio('click.mp3');
        this._expressao = '0';
        this._resultado = '';
        this._historicoEl = document.querySelector('#pHistorico');
        this._displayEl = document.querySelector('#inputDisplay');
        this._operadoresPossiveis = [`÷`, `×`, `-`, `+`, `%`];
        this._numerosPossiveis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        this.inicializar()
    }
    inicializar() {
        this.addEventosBtns();
        this.inicializarKeyboard();
    }
    efeitoAudio() {
        this._audioFx.currentTime = 0;
        this._audioFx.play();
    }
    addEventosBtns() {
        document.querySelectorAll('.inputBtn').forEach((btn) => {
            // Adicionando efeito de audio ao clicar
            btn.addEventListener('click', () => {
                this.efeitoAudio();
            })
            // Demais eventos
            switch (btn.id) {
                case 'limparBtn':
                    btn.addEventListener('click', () => {
                        this.limparExpressao();
                    });
                    break;
                case 'maisMenosBtn':
                    btn.addEventListener('click', () => {
                        this.mudarSinal();
                    });
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
    inicializarKeyboard() {
        document.addEventListener('keydown', (e) => {
            this.efeitoAudio();
            if (this.temNumero(e.key) || this.temOperador(e.key) || e.key == '*' || e.key == '/') {
                this.salvarExpressao(e.key);
            } else if (e.key == 'Enter') {
                this.mostrarResultado();
            } else if (e.key == 'Delete' || e.key == 'Backspace') {
                this.backspaceOrDelete();
            } else {
                try{
                    this._audioFx.pause();
                } catch(e){
                    console.log(e);
                }
            }
        })
    }
    limparExpressao() {
        console.clear();
        this._expressao = '0';
        this._resultado = ''
        this.atualizarDisplay(this._expressao);
    }
    backspaceOrDelete() {
        this._expressao = this._expressao.slice(0, -1);
        this.atualizarDisplay(this._expressao);
    }
    atualizarDisplay(msg) {
        this.display = msg;
    }
    removerPernultimoChar() {
        let novoChar = this._expressao.split(``).pop();
        let novaExpressao = this._expressao.slice(0, -2);
        this._expressao = novaExpressao + novoChar;
    }
    removerUltimoChar() {
        this._expressao = this._expressao.slice(0, -1);
    }
    corrigirVirgulasSeguidas(char) {
        if (char == ',') {
            for (let i in this._expressao) {
                if (this._expressao[i] == ',' && this._expressao[Number(i) + 1] == ',') {
                    this.removerUltimoChar();
                }
            }
        }
    }
    corrigirOperadoresSeguidos(char) {
        if (this.temOperador(char)) {
            for (let i in this._expressao) {
                // Se o char digitado for um operador, verifica se existe dois operadores seguidos, e faz uma correção.
                let penultimoChar = this._expressao[Number(i) - 1];
                let antiPenultimoChar = this._expressao[Number(i) - 2];
                if (this._expressao[i] == char && this.temOperador(penultimoChar)) {
                    if (penultimoChar == '-' && this.temOperador(antiPenultimoChar) == true) {
                        let novaExpressao = this._expressao.slice(0, -1);
                        this._expressao = novaExpressao;
                    } else if (penultimoChar == '+' || penultimoChar == '-') {
                        this.removerPernultimoChar();
                    } else if (char != '-' && penultimoChar != '%') {
                        this.removerPernultimoChar();
                    }
                }
            }
        }
    }
    corrigirVirgulaAntesOperador(char) {
        if (this.temOperador(char)) {
            for (let i in this._expressao) {
                // Se antes do operador, tiver uma virgula, remover a virgula
                let charAnterior = this._expressao[Number(i) - 1];
                if (this._expressao[i] == char && charAnterior == ',') {
                    this.removerPernultimoChar();
                }
            }
        }
    }
    tornarInterativo(char) {
        // this._expressao.toString().startsWith('0') ? this._expressao = char : this._expressao += char;
        this.corrigirVirgulasSeguidas(char);
        this.corrigirOperadoresSeguidos(char);
        this.corrigirVirgulaAntesOperador(char);



        // Se ao final de um calculo, um novo numero for digitado, substituir a expressão pelo numero.
        if (this.temOperador(this._expressao) == false && this._resultado != '') {
            this._expressao = char;
            this._resultado = '';
        }
    }
    temNumero(string) {
        for (let i in string) {
            if (this._numerosPossiveis.includes(string[i])) {
                return true;
            }
        }
        return false;
    }
    temOperador(string) {
        for (let i in string) {
            if (this._operadoresPossiveis.includes(string[i])) {
                return true;
            }
        }
        return false;
    }
    formatarKey(char) {
        switch (char) {
            case "*":
                console.log(`this._expressao: ${this._expressao} | this.display: ${this.display}`);
                this._expressao = this._expressao.replace("*", "×");
                console.log(`this._expressao: ${this._expressao} | this.display: ${this.display}`);
                break;
            case "/":
                this._expressao = this._expressao.replace("/", "÷");
                break;
        }
    }
    salvarExpressao(char) {
        // Se a expressão começar com 0, substituir o 0 pelo digito 
        if (this._expressao.toString().startsWith(`0`) &&
            char != ',' &&
            this.temNumero(char) == true &&
            this._expressao.toString().length < 2) {
            this._expressao = char;
        } else {
            this._expressao += char;
        }
        this.formatarKey(char);
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
        for (let i = 0; i < this._expressao.length; i++) {
            switch (this._expressao[i]) {
                case "×":
                    this._expressao = this._expressao.replace("×", "*");
                    break;
                case "÷":
                    this._expressao = this._expressao.replace("÷", "/");
                    break;
                case "%":
                    if (this.temNumero(this._expressao[Number(i) + 1]) == true) {
                        this._expressao = this._expressao.replace("%", "*(1/100)*");
                    } else {
                        this._expressao = this._expressao.replace("%", "*(1/100)");
                    }
                    break;
            }
        }
    }
    arredondar(num) {
        return parseFloat(num.toPrecision(12));
    }
    mudarSinal() {
        if (this._expressao.startsWith('-')) {
            this._expressao = this._expressao.substring(1)
        } else {
            this._expressao = `-${this._expressao}`;
        }
        this.atualizarDisplay(this._expressao);
    }
    exibirErro() {
        this.atualizarDisplay(`ERRO!`);
        setTimeout(() => {
            this._expressao = `0`;
            this.atualizarDisplay(`${this._expressao}`);
        }, 1250);
    }
    calcular() {
        this.corrigirOperadores();
        this._expressao = this.corrigirSeparadores('.', this._expressao.toString());
        try {
            this._resultado = eval(this._expressao);
        } catch (error) {
            this.exibirErro();
        }
        this._resultado = this.arredondar(this._resultado);
        this._resultado = this.corrigirSeparadores(',', this._resultado.toString());
        this._expressao = this._resultado;
    }
    get display() {
        return this._displayEl.value;
    }
    get displayEl() {
        return this._displayEl;
    }
    set display(vl) {
        return this._displayEl.value = vl;
    }
}