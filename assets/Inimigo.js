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
        _alvo: cc.Node,
        velocidade: 50,
        tempoAtaque: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._alvo = cc.find('hero');
        console.log('ALVO', this._alvo.getComponent('Jogador'));
        this.schedule(this.atirar, this.tempoAtaque);

    },

    mudarDirecao: function() {
        this._direcao = this.calcularDirecao(this._alvo.position);

        this.node.angle = this.olharPara(this._direcao);
    },

    tomarDano: function() {
        let jogador = this._alvo.getComponent('Jogador');
        jogador.adicionarPontos(10);
        this.node.destroy();
    },

    start () {

    },

    update (dt) {
        this.mudarDirecao();
        let deslocamento = this._direcao.mul(this.velocidade * dt);
        this.node.position = this.node.position.add(deslocamento);
    },
});
