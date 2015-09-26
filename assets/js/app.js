var app = new Phaser.Game("100", "100", Phaser.AUTO, '', {preload: preload, create: create, update: update});

var img = {};
var snd = {};
var tween = {};
var key = {};
var counter = {};
var layer = {};

function preload() {
    _(res.img._all()).each(function (name) {
        app.load.image(name, 'assets/img/1280x720/' + name + '.png');
    });

    _(res.snd._all()).each(function(name){
        app.load.audio(name, 'assets/snd/' + name + '.ogg');
    });

}

function create() {
    layout.init(app.world.centerX, app.world.centerY);

    app.input.onDown.add(scenario.play, this);

    layer.scene = app.add.group();
    layer.counters = app.add.group();
    layer.like = app.add.group();
    layer.fireworks = app.add.group();
    layer.intro = app.add.group();

    layer.scene.z = 0;
    layer.counters.z = 1;
    layer.like.z = 2;
    layer.fireworks.z = 3;
    layer.intro.z = 4;

    snd.money = app.add.audio(res.snd.money);
    snd.tickDown = app.add.audio(res.snd.tickDown);
    snd.tickUp = app.add.audio(res.snd.tickUp);
    snd.win = app.add.audio(res.snd.win);

    key = app.input.keyboard.addKeys({
        play: res.key.play
    });

    key.play.onDown.add(scenario.play, this);

    scenario.intro();
}

function update() {
    scenario.update();
}