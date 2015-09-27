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
        //function(){
        //    scene.render();
        //    return true;
        //},
        //function(){
        //    //joinImmediately(
        //    //    scene.animate.dropFourthRightCounter(),
        //    //    chainDeferred(delay(1000),
        //    //        scene.animate.incCounter(scene.sprite.counter.right.a0, 200),
        //    //        scene.animate.incCounter(scene.sprite.counter.right.a0, 200),
        //    //        scene.animate.incCounter(scene.sprite.counter.right.a0, 200),
        //    //        scene.animate.incCounter(scene.sprite.counter.right.a0, 200),
        //    //        scene.animate.incCounter(scene.sprite.counter.right.a0, 200),
        //    //        delay(2000),
        //    //        scene.animate.decCounter(scene.sprite.counter.right.a0, 200),
        //    //        scene.animate.decCounter(scene.sprite.counter.right.a0, 200),
        //    //        scene.animate.decCounter(scene.sprite.counter.right.a0, 200)
        //    //    )
        //    //);
        //    //chainImmediately(
        //    //    scene.animate.showLike(1, scene.sprite.like.left, layout.like.left),
        //    //    scene.animate.showLike(1, scene.sprite.like.right, layout.like.right)
        //    //);
        //    //joinImmediately(
        //    //    chainDeferred.apply(this, _(_.range(0, 5)).map(function(){ return scene.animate.incCounter(scene.sprite.counter.right.a, 2000); })),
        //    //    chainDeferred.apply(this, _(_.range(0, 50)).map(function(){ return scene.animate.incCounter(scene.sprite.counter.right.b, 200); })),
        //    //    chainDeferred.apply(this, _(_.range(0, 500)).map(function(){ return scene.animate.incCounter(scene.sprite.counter.right.c, 20); }))
        //    //);
        //    return true;
        //},
        scene.counter.set(0, 5, 2000),
        scene.counter.set(10, 5, 2000),
        scene.counter.set(10, 15, 2000),
        scene.counter.set(20, 15, 2000),
        scene.counter.set(20, 65, 2000),
        scene.like.set(5, 5, 5000),
        //scene.counter.set(70, 65, 2000),
        //scene.counter.set(70, 85, 2000),
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
        //scene.finishHim,
        //scene.counter.auto(0, -3, 1000),
        //scene.counter.win(34, 1000),
        scene.counter.set(451, 777, 10000)
    ]
};