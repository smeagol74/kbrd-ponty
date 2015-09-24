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
        counter.removeAll();
        var la = addNumber(layout.counter.left.a, res.img.zero);
        var lb = addNumber(layout.counter.left.b, res.img.zero);
        var lc = addNumber(layout.counter.left.c, res.img.zero);
        var ra = addNumber(layout.counter.right.a, res.img.zero);
        var rb = addNumber(layout.counter.right.b, res.img.zero);
        var rc = addNumber(layout.counter.right.c, res.img.zero);
    };

    scenario.stages = [
        {
            play: function(){
                console.log('Шаг 1');
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