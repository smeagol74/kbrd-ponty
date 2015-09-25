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

    scenario.init = function(){
    };

    scenario.stages = [
        {
            play: function(){
                console.log('Шаг 1');
                var tween = app.add.tween(counter.left.c.tilePosition);
                tween.to({y: counter.left.c.tilePosition.y + layout.counter.left.c.h * 3}, 2500, Phaser.Easing.Elastic.Out, true);
                snd.money.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 1');
                var tween = app.add.tween(counter.left.c.tilePosition);
                tween.to({y: counter.left.c.tilePosition.y + layout.counter.left.c.h}, 2500, Phaser.Easing.Elastic.Out, true);
                snd.money.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 1');
                var tween = app.add.tween(counter.left.c.tilePosition);
                tween.to({y: counter.left.c.tilePosition.y + layout.counter.left.c.h}, 1000, Phaser.Easing.Elastic.Out, true);
                snd.money.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 2');
                var tween = app.add.tween(counter.left.c.tilePosition);
                tween.to({y: counter.left.c.tilePosition.y - layout.counter.left.c.h}, 3000, Phaser.Easing.Elastic.Out, true);
                snd.tickDown.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 1');
                var tween = app.add.tween(counter.left.b.tilePosition);
                tween.to({y: counter.left.b.tilePosition.y + layout.counter.left.b.h}, 5000, Phaser.Easing.Elastic.Out, true);
                snd.money.play();
            },
            update: function(){

            }
        },
        {
            play: function(){
                console.log('Шаг 3');
                snd.win.play();
                scenario.current = -1;
            },
            update: function(){

            }
        }
    ];
}());