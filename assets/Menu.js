// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        dificuldade: String,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const btnEasy = cc.find('easy');
        const btnNormal = cc.find('normal');
        const btnHard = cc.find('hard');

        btnEasy.on(cc.Node.EventType.MOUSE_DOWN, () => this.foiClicado('easy'), this);
        btnNormal.on(cc.Node.EventType.MOUSE_DOWN, () => this.foiClicado('normal'), this);
        btnHard.on(cc.Node.EventType.MOUSE_DOWN, () => this.foiClicado('hard'), this);
        cc.ga
    },

    foiClicado: function(level) {
        cc.sys.localStorage.setItem('difficulty', level);
        cc.director.loadScene('Jogo', this.getDificuldade);
    },

    start () {

    },

    // update (dt) {},
});
