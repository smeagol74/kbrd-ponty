var res = {
    img: {
        bg: 'bg',
        bar: 'bar',
        colon: 'colon',
        numbers: 'numbers',
        _all: function(){
            return [res.img.bg, res.img.bar, res.img.colon, res.img.numbers];
        }
    },
    snd: {
        money: 'money',
        none: 'none',
        tickDown: 'tick-down',
        tickUp: 'tick-up',
        win: 'win',
        _all: function(){
            return [res.snd.money, res.snd.tickUp, res.snd.tickDown, res.snd.win];
        }
    },
    key: {
        money: Phaser.Keyboard.Q,
        tickDown: Phaser.Keyboard.W,
        tickUp: Phaser.Keyboard.E,
        win: Phaser.Keyboard.R,
        play: Phaser.Keyboard.SPACEBAR
    }
};