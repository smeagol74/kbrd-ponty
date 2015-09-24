var res = {
    img: {
        bg: 'bg',
        bar: 'bar',
        colon: 'colon',
        zero: '0',
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
        _all: function(){
            return [res.img.bg, res.img.bar, res.img.colon, res.img.zero, res.img.one, res.img.two, res.img.three,
                res.img.four, res.img.five, res.img.six, res.img.seven, res.img.eight, res.img.nine];
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