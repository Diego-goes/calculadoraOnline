class CalcController {
    constructor() {
        this._audioFx = new Audio('click.mp3');
        this._expressao = '0';
        this._resultado;
        this._historicoEl = document.querySelector('#pHistorico');
        this._displayEl = document.querySelector('#inputDisplay');
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
        this.atualizarDisplay(this._expressao);
    }
    atualizarDisplay(msg) {
        this.display = msg;
    }
    interatividade(char){
        // Se a expressão começar com 0, substituir o 0 pelo digito 
        this._expressao.toString().startsWith('0') ? this._expressao = char : this._expressao += char;
    }
    salvarExpressao(char) {

        this.interatividade(char);
        this.atualizarDisplay(this._expressao);
    }
    mostrarResultado() {
        this.calcular()
        this.atualizarDisplay(this._resultado);
    }
    calcular() {
        this._expressao = this._expressao.replace("×", "*");
        this._expressao = this._expressao.replace("÷", "/");
        this._expressao = this._expressao.replace(",", ".");
        this._resultado = eval(this._expressao);
        this._expressao = this._expressao.replace(".", ",");
        this._expressao = this._resultado;
    }
    get display() {
        return this._displayEl.value;
    }
    set display(vl) {
        return this._displayEl.value = vl;
    }
}