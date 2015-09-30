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
        scene.counter.set(0, 5, 500),
        scene.counter.set(10, 5, 500),
        scene.counter.set(10, 15, 500),
        scene.counter.set(20, 15, 500),
        scene.counter.set(20, 65, 500),
        scene.counter.set(70, 65, 500),
        scene.counter.set(70, 85, 500),
        scene.counter.set(120, 85, 500),
        scene.counter.set(200, 85, 500),
        scene.counter.set(300, 85, 500),
        scene.counter.set(300, 350, 500),
        scene.counter.set(300, 50, 500),
        scene.counter.set(300, 150, 500),
        scene.counter.set(300, 250, 500),
        scene.counter.set(300, 350, 500),
        scene.counter.set(300, 300, 500),
        scene.counter.set(300, 400, 500),
        scene.counter.set(400, 400, 500),
        scene.counter.set(400, 500, 500),
        scene.counter.set(300, 400, 500),
        scene.changeLeftAvatar(
            scene.like.showLeft(128, 500)
        ),
        scene.counter.set(300, 450, 500),
        scene.counter.set(300, 550, 500),
        scene.counter.set(300, 650, 500),
        scene.counter.set(300, 800, 500),
        scene.counter.set(300, 750, 500),
        scene.counter.set(750, 750, 500),
        scene.counter.set(750, 800, 500),
        scene.counter.set(750, 900, 500),
        scene.counter.set(750, 890, 500),
        scene.counter.set(775, 890, 500),
        scene.counter.set(800, 890, 500),
        scene.counter.set(900, 890, 500),
        scene.counter.set(950, 890, 500),
        scene.finishHim(),
        scene.counter.set(975, 890, 500),
        scene.counter.set(998, 890, 500),
        scene.counter.startAuto(0, -5, 1000),
        scene.counter.updateAuto(0, -10, 800),
        scene.counter.updateAuto(0, -15, 500),
        scene.counter.updateAuto(0, -15, 300),
        scene.counter.set(998, 75, 10),
        scene.counter.set(998, 100, 500),
        scene.counter.set(998, 200, 500),
        scene.counter.set(998, 999, 500),
        scene.counter.set(998, 7777, 3000),
        scene.counter.set(999, 7777, 500),
        titles.play
    ]
};