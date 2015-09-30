var res = {
    img: {
        colon: 'colon',
        avatar: {
            left0: 'avatar.left.0',
            right0: 'avatar.right.0',
            left1: 'avatar.left.1',
            leftAlert: 'avatar.left.alert'
        },
        finishHim: 'finish-him',
        intro0: 'intro-0',
        intro1: 'intro-1',
        intro2: 'intro-2',
        intro3: {
            bg: 'intro-3',
            grelka: {
                left: 'intro-3.grelka.left',
                right: 'intro-3.grelka.right',
                whole: 'intro-3.grelka'
            },
            fireball: 'intro-3.fireball'
        },
        like: {
            left: 'like.left',
            right: 'like.right'
        },
        numbers: 'numbers',
        numbers7: 'numbers7',
        scene: 'scene',
        placeholder: 'placeholder',
        seven: 'seven',
        vs: 'vs',
        _all: function(){
            return [res.img.avatar.left0, res.img.avatar.left1, res.img.avatar.leftAlert, res.img.avatar.right0, res.img.colon, res.img.finishHim, res.img.intro0, res.img.intro3.grelka.left, res.img.intro3.grelka.right, res.img.intro3.grelka.whole, res.img.intro3.fireball, res.img.like.left, res.img.like.right, res.img.numbers, res.img.numbers7, res.img.scene, res.img.placeholder, res.img.vs];
        },
        leftRight: function(){
            return [res.img.intro1, res.img.intro2, res.img.intro3.bg];
        }
    },
    snd: {
        finishHim: 'finish-him',
        hitmarker: 'hitmarker',
        like: 'like',
        punch: 'punch',
        tickDown: 'tick-down',
        tickUp: 'tick-up',
        win: 'win',
        _all: function(){
            return [res.snd.finishHim, res.snd.hitmarker, res.snd.like, res.snd.punch, res.snd.tickUp, res.snd.tickDown, res.snd.win];
        }
    },
    key: {
        play: Phaser.Keyboard.SPACEBAR
    }
};