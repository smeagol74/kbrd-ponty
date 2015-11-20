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
        intro01: 'intro-0.1',
        intro02: 'intro-0.2',
        intro03: 'intro-0.3',
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
            return [res.img.avatar.left0, res.img.avatar.left1, res.img.avatar.leftAlert, res.img.avatar.right0, res.img.colon, res.img.finishHim, res.img.intro01, res.img.intro02, res.img.intro03, res.img.intro3.grelka.left, res.img.intro3.grelka.right, res.img.intro3.grelka.whole, res.img.intro3.fireball, res.img.like.left, res.img.like.right, res.img.numbers, res.img.numbers7, res.img.scene, res.img.placeholder, res.img.vs];
        },
        leftRight: function(){
            return [res.img.intro1, res.img.intro2, res.img.intro3.bg];
        }
    },
    snd: {
        intro1: 'intro-1',
        intro2: 'intro-2',
        intro3: 'intro-3',
        finishHim: 'finish-him',
        hitmarker: 'hitmarker',
        like: 'like',
        punch: 'punch',
        roll: 'roll',
        sechin: 'sechin',
        siri: 'siri',
        tickDown: 'tick-down',
        tickUp: 'tick-up',
        triumph: 'triumph',
        win: 'win',
        _all: function(){
            return [
                res.snd.intro1,
                res.snd.intro2,
                res.snd.intro3,
                res.snd.finishHim,
                res.snd.hitmarker,
                res.snd.like,
                res.snd.punch,
                res.snd.roll,
                res.snd.sechin,
                res.snd.siri,
                res.snd.tickUp,
                res.snd.tickDown,
                res.snd.triumph,
                res.snd.win
            ];
        }
    },
    key: {
        play: Phaser.Keyboard.SPACEBAR
    }
};
