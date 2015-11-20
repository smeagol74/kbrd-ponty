var app = new Phaser.Game("100", "100", Phaser.AUTO, '', {preload: preload, create: create});

//WebFontConfig = {
//    active: function () {
//        app.time.events.add(Phaser.Timer.Second, createText, this);
//    },
//    custom: {
//        families: ['Eagle Lake', 'Creepster', 'Trade Winds', 'Nosifer'],
//        urls: ['assets/font/fonts.css']
//    }
//};

var snd = {};
var key = {};
var layer = {};

function preload() {
    //app.load.script('webfont', 'assets/lib/webfont.js');

    _(res.img._all()).each(function (name) {
        app.load.image(name, 'assets/img/1280x720/' + name + '.png');
    });

    _(res.img.leftRight()).each(function(name) {
        app.load.spritesheet(name, 'assets/img/1280x720/' + name + '.png', 640, 720);
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
        intro1: app.add.sound(res.snd.intro1),
        intro2: app.add.sound(res.snd.intro2),
        intro3: app.add.sound(res.snd.intro3),
        finishHim: app.add.sound(res.snd.finishHim),
        hitmarker: app.add.sound(res.snd.hitmarker),
        like: app.add.sound(res.snd.like),
        punch: app.add.sound(res.snd.punch),
        roll: app.add.sound(res.snd.roll),
        sechin: app.add.sound(res.snd.sechin),
        siri: app.add.sound(res.snd.siri),
        tickDown: app.add.sound(res.snd.tickDown),
        tickUp: app.add.sound(res.snd.tickUp),
        triumph: app.add.sound(res.snd.triumph),
        win: app.add.sound(res.snd.win)
    };

    key = app.input.keyboard.addKeys({
        play: res.key.play
    });

    key.play.onDown.add(scenario.play, this);

    scenario.init();
}
