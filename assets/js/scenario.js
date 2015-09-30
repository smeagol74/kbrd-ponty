var scenario = {
    current: 0,
    init: function () {
        scene.render();
    },
    play: function () {
        if (scenario.current < scenario.stages.length) {
            if (scenario.stages[scenario.current].apply(this)) {
                scenario.current = scenario.current + 1;
            }
        }
    },
    stages: [
        //intro.play,
        scene.counter.set(0, 5, 1000),
        scene.counter.set(10, 5, 1000),
        scene.counter.set(10, 15, 1000),
        scene.changeLeftAvatar(),
        scene.like.showLeft(1),
        scene.like.set(5, 0, 3000),
        scene.like.set(234, 0, 5000),
        scene.like.set(998, 0, 2000),
        scene.counter.set(10, 10, 1000),
        scene.counter.set(451, 555, 1000),
        scene.counter.startAuto(0, -1, 1000),
        scene.counter.updateAuto(0, -2, 500),
        //scene.counter.set(20, 15, 1000),
        //scene.counter.set(20, 65, 2000),
        //scene.counter.set(70, 65, 1000),
        //scene.counter.set(70, 85, 1000),
        //scene.counter.set(120, 85, 2000),
        //scene.counter.set(120, 90, 2000),
        //scene.counter.set(120, 85, 2000),
        //scene.counter.set(120, 95, 2000),
        //scene.counter.set(120, 100, 2000),
        //scene.counter.set(225, 100, 2000),
        //scene.counter.set(240, 100, 2000),
        //scene.counter.set(240, 145, 2000),
        //scene.counter.set(240, 195, 2000),
        //scene.counter.set(240, 250, 2000),
        //scene.counter.set(240, 295, 2000),
        //scene.counter.set(240, 305, 2000),
        //scene.counter.set(340, 305, 2000),
        //scene.counter.set(340, 350, 2000),
        //scene.counter.set(340, 370, 2000),
        //scene.counter.set(340, 325, 2000),
        //scene.counter.set(390, 325, 2000),
        //scene.counter.set(400, 325, 2000),
        //scene.counter.set(450, 325, 2000),
        //scene.counter.auto(0, -1, 1000),
        //scene.counter.auto(0, -2, 1000),
        scene.finishHim(),
        //scene.counter.auto(0, -3, 1000),
        //scene.counter.win(34, 1000),
        scene.counter.set(451, 7777, 10000),
        titles.play
    ]
};