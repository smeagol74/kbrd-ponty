var scenario = {
    current: 0,
    init: function () {
        //scene.render();
    },
    play: function () {
        if (scenario.current < scenario.stages.length) {
            if (scenario.stages[scenario.current].apply(this)) {
                scenario.current = scenario.current + 1;
            }
        }
    },
    stages: [
        intro.play,
        scene.counter.set(0, 5, 1000),
        scene.counter.set(10, 5, 1000),
        scene.counter.set(10, 15, 1000),
        scene.counter.set(20, 15, 1000),
        scene.counter.set(20, 65, 1000),
        scene.counter.set(70, 65, 1000),
        scene.counter.set(70, 85, 1000),
        scene.counter.set(120, 85, 1000),
        scene.counter.set(200, 85, 1000),
        scene.counter.set(300, 85, 1000),
        scene.counter.set(300, 350, 1000),
        scene.counter.set(300, 50, 1000),
        scene.counter.set(300, 150, 1000),
        scene.counter.set(300, 250, 1000),
        scene.counter.set(300, 350, 1000),
        scene.counter.set(300, 300, 1000),
        scene.counter.set(300, 400, 1000),
        scene.counter.set(400, 400, 1000),
        scene.counter.set(400, 500, 1000),
        scene.counter.set(300, 400, 1000),
        scene.changeLeftAvatar(),
        scene.like.showLeft(128, 3000),
        scene.counter.set(300, 450, 1000),
        scene.counter.set(300, 550, 1000),
        scene.counter.set(300, 650, 1000),
        scene.counter.set(300, 800, 1000),
        scene.counter.set(300, 750, 1000),
        scene.counter.set(750, 750, 1000),
        scene.counter.set(750, 800, 1000),
        scene.counter.set(750, 900, 1000),
        scene.counter.set(750, 890, 1000),
        scene.counter.set(775, 890, 1000),
        scene.counter.set(800, 890, 1000),
        scene.counter.set(900, 890, 1000),
        scene.counter.set(950, 890, 1000),
        scene.finishHim(),
        scene.counter.set(975, 890, 1000),
        scene.counter.set(998, 890, 1000),
        scene.counter.startAuto(0, -5, 1000),
        scene.counter.updateAuto(0, -10, 500),
        scene.counter.updateAuto(0, -15, 300),
        scene.counter.updateAuto(0, -15, 100),
        scene.counter.set(998, 75, 10),
        scene.counter.set(998, 100, 1000),
        scene.counter.set(998, 200, 1000),
        scene.counter.set(998, 999, 1000),
        scene.counter.set(998, 7777, 5000),
        scene.counter.set(999, 7777, 1000),
        titles.play
    ]
};