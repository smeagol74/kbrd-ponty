var scenario = {
    current: 0,
    stages: [],
    play: function(){
        if (scenario.current < scenario.stages.length) {
            scenario.stages[scenario.current].play();
            scenario.current = scenario.current + 1;
        }
    },
    update: function(){
        if (scenario.current > 0 && scenario.current <= scenario.stages.length) {
            scenario.stages[scenario.current - 1].update();
        }
    }
};

(function(){

    function addNumber(_layout, _image) {
        var result = app.add.sprite(_layout.x + _layout.w / 2, _layout.y + _layout.h / 2, _image);
        result.anchor.setTo(0.5, 0.5);
        return result;
    }

    scenario.init = function(){
        counter.left.a.y = counter.left.a.y - layout.counter.left.a.h * 10;
        counter.left.b.y = counter.left.b.y - layout.counter.left.b.h * 10;
        counter.left.c.y = counter.left.c.y - layout.counter.left.c.h * 10;
        counter.right.a.y = counter.right.a.y - layout.counter.right.a.h * 10;
        counter.right.b.y = counter.right.b.y - layout.counter.right.b.h * 10;
        counter.right.c.y = counter.right.c.y - layout.counter.right.c.h * 10;
    };

    scenario.stages = [
        {
            play: function(){
                console.log('Шаг 1');
                var tween = app.add.tween(counter.left.c);
                tween.to({y: counter.left.c.y + layout.counter.left.c.h * 3}, 2500, Phaser.Easing.Elastic.Out, true);
                snd.money.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 1');
                var tween = app.add.tween(counter.left.c);
                tween.to({y: counter.left.c.y + layout.counter.left.c.h}, 2500, Phaser.Easing.Elastic.Out, true);
                snd.money.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 1');
                var tween = app.add.tween(counter.left.c);
                tween.to({y: counter.left.c.y + layout.counter.left.c.h}, 1000, Phaser.Easing.Elastic.Out, true);
                snd.money.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 1');
                var tween = app.add.tween(counter.left.b);
                tween.to({y: counter.left.b.y + layout.counter.left.b.h}, 5000, Phaser.Easing.Elastic.Out, true);
                snd.money.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 2');
                snd.tickDown.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 3');
                snd.win.play();
            },
            update: function(){

            }
        }
    ];
}());