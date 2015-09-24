var app = new Phaser.Game("100", "100", Phaser.AUTO, '', {preload: preload, create: create, update: update});

var img = {};
var snd = {};
var tween = {};
var key = {};
var counter = {};

function preload() {
    _(res.img._all()).each(function (name) {
        app.load.image(name, 'assets/img/' + name + '.png');
    });

    _(res.snd._all()).each(function(name){
        app.load.audio(name, 'assets/snd/' + name + '.ogg');
    });

}

function create() {
    layout.init(app.world.centerX, app.world.centerY);

    img.bg = app.add.sprite(app.world.centerX, app.world.centerY, res.img.bg);
    img.bg.anchor.setTo(0.5, 0.5);

    img.colon = app.add.sprite(layout.colon.x, layout.colon.y, res.img.colon);
    img.colon.anchor.setTo(0.5, 0.5);
    img.colon.alpha = 0;

    tween.colon = app.add.tween(img.colon);
    tween.colon.to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    snd.money = app.add.audio(res.snd.money);
    snd.tickDown = app.add.audio(res.snd.tickDown);
    snd.tickUp = app.add.audio(res.snd.tickUp);
    snd.win = app.add.audio(res.snd.win);

    key = app.input.keyboard.addKeys({
        money: res.key.money,
        tickDown: res.key.tickDown,
        tickUp: res.key.tickUp,
        win: res.key.win,
        play: res.key.play
    });

    key.money.onDown.add(playFx, this);
    key.tickDown.onDown.add(playFx, this);
    key.tickUp.onDown.add(playFx, this);
    key.win.onDown.add(playFx, this);
    key.play.onDown.add(scenario.play, this);

    counter = {
        left: {
            a: mkMaskedGroup(100, 100, 100, 100),
            b: mkMaskedGroup(100, 100, 100, 100),
            c: mkMaskedGroup(100, 100, 100, 100),
            removeAll: function () {
                counter.left.a.removeAll();
                counter.left.b.removeAll();
                counter.left.c.removeAll();
            }
        },
        right: {
            a: mkMaskedGroup(100, 100, 100, 100),
            b: mkMaskedGroup(100, 100, 100, 100),
            c: mkMaskedGroup(100, 100, 100, 100),
            removeAll: function () {
                counter.right.a.removeAll();
                counter.right.b.removeAll();
                counter.right.c.removeAll();
            }
        },
        removeAll: function () {
            counter.left.removeAll();
            counter.right.removeAll();
        }
    };

    scenario.init();
}

function mkMaskedGroup(x, y, w, h) {
    var result = app.add.group();
    var mask = app.add.graphics(0, 0);
    mask.beginFill(0xffffff);
    mask.drawRect(w, y, w, h);
    result.mask = mask;
    return result;
}

function update() {
    scenario.update();
}

function playFx(key) {
    switch (key.keyCode) {
        case res.key.money:
            snd.money.play();
            break;
        case res.key.tickDown:
            snd.tickDown.play();
            break;
        case res.key.tickUp:
            snd.tickUp.play();
            break;
        case res.key.win:
            snd.win.play();
            break;
    }
}
