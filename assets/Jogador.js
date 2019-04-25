// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let Personagem = require('Personagem');
cc.Class({
    extends: Personagem,

    properties: {
        _acelerando: false,
        velocidade: 10,
        _movimento: cc.Vec2,
        vidaMaxima: 100,
        _vidaAtual: 0,
        barraVida: cc.ProgressBar,
        pontuacao: 0,
        label: cc.Label,
        movimentaX: false,
        movimentaY: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let map = {};
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, () => this.teclaPressionada(event, map), this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, () => this.teclaSolta(event, map), this);
        let canvas = cc.find('Canvas');
        canvas.on('mousemove', this.mudarDirecao, this);
        canvas.on('mousedown', this.atirar, this);

        this._vidaAtual = this.vidaMaxima;
        this.barraVida.progress = 1;

        cc.director.getCollisionManager().enabled = true;
    },

    adicionarPontos: function(pontos) {
        this.pontuacao += pontos;
        this.label.string  = 'Pontos: ' + this.pontuacao
    },

    tomarDano: function(dano) {
        this._vidaAtual -= dano;

        let porcentagemVida = this._vidaAtual / this.vidaMaxima;
        this.barraVida.progress = porcentagemVida;

        if(this._vidaAtual <= 0) {
            cc.director.loadScene('GameOver');
        }
    },

    mudarDirecao: function(event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        this._direcao = this.calcularDirecao(posicaoMouse);

        this.node.angle = this.olharPara(this._direcao);
    },

    teclaPressionada: function(event, map) {
        const macro = cc.macro.KEY;
        const tecla = event.keyCode;
        this._acelerando = true;
        switch(tecla) {
            case macro.w: this.goUp(); break;
            case macro.a: this.goLeft(); break;
            case macro.s: this.goDown(); break;
            case macro.d: this.goRight(); break;
            default: this._acelerando = false;
        }
    },

    goUp: function() {
        this.velocidade = 800
        this.movimentaY = true;
    },

    goLeft: function() {
        this.velocidade = -800;
        this.movimentaX = true;
    },

    goDown: function() {
        this.velocidade = -800;
        this.movimentaY = true;
    },

    goRight: function() {
        this.velocidade = 800;
        this.movimentaX = true;
    },

    teclaSolta: function(event, map) {
        this._acelerando = false;

        const tecla = event.keyCode;
        const macro = cc.macro.KEY;
        switch(tecla) {
            case macro.w:
            case macro.s:
                this.movimentaY = false; break;
            case macro.a:
            case macro.d:
                this.movimentaX = false; break;
        }
    },

    start () {

    },

    update (dt) {
        if(this._acelerando) {
            if(this.movimentaX) {
                this.node.x += this.velocidade * dt;
                console.log('posicao atual', this.node.x);
            } else {
                this.node.y += this.velocidade * dt;
            }
        }


        // let camera = cc.find('Canvas').getChildByName('Main Camera');
        // camera.x = this.node.position.x;
        // camera.y = this.node.position.y;
        
    },
});
