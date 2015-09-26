var res = {
    img: {
        colon: 'colon',
        finalCombat: 'final-combat',
        finishHim: 'finish-him',
        intro0: 'intro-0',
        intro1: {
            left: 'intro-1.left',
            right: 'intro-1.right'
        },
        intro2: {
            left: 'intro-2.left',
            right: 'intro-2.right'
        },
        intro3: {
            left: 'intro-3.left',
            right: 'intro-3.right'
        },
        intro3Grelka: {
            left: 'intro-3-grelka.left',
            right: 'intro-3-grelka.right'
        },
        like: 'like',
        numbers: 'numbers',
        numbers7: 'numbers7',
        scene: 'scene',
        seven: 'seven',
        vs: 'vs',
        _all: function(){
            return [res.img.colon, res.img.finalCombat, res.img.finishHim, res.img.intro0, res.img.intro1.left, res.img.intro1.right, res.img.intro2.left, res.img.intro2.right, res.img.intro3.left, res.img.intro3.right, res.img.intro3Grelka.left, res.img.intro3Grelka.right, res.img.like, res.img.numbers, res.img.numbers7, res.img.scene, res.img.vs];
        }
    },
    snd: {
        finishHim: 'finish-him',
        like: 'like',
        tickDown: 'tick-down',
        tickUp: 'tick-up',
        win: 'win',
        _all: function(){
            return [res.snd.finishHim, res.snd.like, res.snd.tickUp, res.snd.tickDown, res.snd.win];
        }
    },
    key: {
        play: Phaser.Keyboard.SPACEBAR
    }
};