var app = new Phaser.Game("100", "100", Phaser.AUTO, '', {preload: preload, create: create});

var snd = {};
var key = {};
var layer = {};

function preload() {
    _(res.img._all()).each(function (name) {
        app.load.image(name, 'assets/img/1280x720/' + name + '.png');
    });

    _(res.snd._all()).each(function (name) {
        app.load.audio(name, 'assets/snd/' + name + '.ogg');
    });

}

function create() {
    app.stage.disableVisibilityChange = true;

    app.input.onDown.add(scenario.play, this);

    layer = {
        scene: mkLayer('scene', {z: 0}),
        counters: mkLayer('counters', {z: 1}),
        like: mkLayer('like', {z: 2}),
        fireworks: mkLayer('fireworks', {z: 3}),
        intro: mkLayer('intro', {z: 4})
    };

    snd = {
        finishHim: app.add.sound(res.snd.finishHim),
        hitmarker: app.add.sound(res.snd.hitmarker),
        like: app.add.sound(res.snd.like),
        punch: app.add.sound(res.snd.punch),
        tickDown: app.add.sound(res.snd.tickDown),
        tickUp: app.add.sound(res.snd.tickUp),
        win: app.add.sound(res.snd.win)
    };

    key = app.input.keyboard.addKeys({
        play: res.key.play
    });

    key.play.onDown.add(scenario.play, this);

    scenario.init();
}