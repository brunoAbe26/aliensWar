// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let Personagem = cc.Class({
    extends: cc.Component,

    properties: {
        tiroPreFab: cc.Prefab,
        _direcao: cc.Vec2,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    atirar: function() {
        let disparo = cc.instantiate(this.tiroPreFab);
        disparo.parent = this.node.parent;
        disparo.position = this.node.position;
        disparo.group = this.node.group;

        let componenteTiro = disparo.getComponent('Tiro');
        componenteTiro.direcao = this._direcao;
    },

    calcularDirecao: function(destino) {
        let direcao = destino.sub(this.node.position);
        direcao = direcao.normalize();
        return direcao;
    },

    olharPara: function(direcao) {
        let angulo = Math.atan2(direcao.y, direcao.x);
        angulo = angulo * (180 / Math.PI);
        return angulo;
    },

    start () {

    },

    // update (dt) {},
});

module.exports = Personagem;