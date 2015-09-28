/**
 * Заставка
 */
var intro = {
    img: {},
    play: function () {
        console.group('intro.play');
        return intro.championship()
            .then(delay(1000))
            .then(intro.doudaVsEfimovitch)
            .then(delay(1000))
            .then(intro.opytVsMolodost)
            .then(delay(1000))
            .then(intro.grelka)
            .then(delay(1000))
            .then(intro.scene)
            .then(intro.destroyIntro)
            .then(function () {
                console.groupEnd();
                return $.when();
            });
    },
    championship: function () {
        var sprite = mkSprite(0, 0, res.img.intro0, layer.intro);
        intro.img.championship = {
            intro: sprite
        };
        sprite.scale.x = 0;
        sprite.scale.y = 0;
        var tween = mkTween('intro.championship.in', sprite.scale).to({x: 1, y: 1}, 5000, Phaser.Easing.Elastic.Out);
        return startTweenImmediately(tween);
    },
    doudaVsEfimovitch: function () {
        var left = mkSprite(-1280, 0, res.img.intro1.left, layer.intro);
        var right = mkSprite(1280, 0, res.img.intro1.right, layer.intro);
        var vs = intro.mkVs();
        intro.img.doudaVsEfimovitch = {
            left: left,
            right: right,
            vs: vs
        };
        var tween = {
            left: mkTween('intro.doudaVsEfimovitch.left.in', left).to({x: -320}, 2000, Phaser.Easing.Bounce.Out),
            right: mkTween('intro.doudaVsEfimovitch.right.in', right).to({x: 320}, 2000, Phaser.Easing.Bounce.Out),
            vs: mkTween('intro.doudaVsEfimovitch.vs.in', vs).to({alpha: 1}, 3000, Phaser.Easing.Linear.None)
        };
        return startTweenImmediately(tween.left, tween.right)
            .then(startTweenDeferred(tween.vs));
    },
    opytVsMolodost: function () {
        var left = mkSprite(-1280, 0, res.img.intro2.left, layer.intro);
        var right = mkSprite(1280, 0, res.img.intro2.right, layer.intro);
        var vs = intro.mkVs();
        intro.img.opytVsMolodost = {
            left: left,
            right: right,
            vs: vs
        };
        var tween = {
            left: mkTween('intro.opytVsMolodost.left.in', left).to({x: -320}, 2000, Phaser.Easing.Bounce.Out),
            right: mkTween('intro.opytVsMolodost.right.in', right).to({x: 320}, 2000, Phaser.Easing.Bounce.Out),
            vs: mkTween('intro.opytVsMolodost.vs.in', vs).to({alpha: 1}, 3000, Phaser.Easing.Linear.None)
        };
        return startTweenImmediately(tween.left, tween.right)
            .then(startTweenDeferred(tween.vs));
    },
    grelka: function () {
        var left = mkSprite(-1280, 0, res.img.intro3.left, layer.intro);
        var right = mkSprite(1280, 0, res.img.intro3.right, layer.intro);
        var grelka = {
            left: mkSprite(0, 0, res.img.intro3Grelka.left, layer.intro, {alpha: 0}),
            right: mkSprite(0, 0, res.img.intro3Grelka.right, layer.intro, {alpha: 0})
        };
        var vs = intro.mkVs();
        intro.img.grelka = {
            left: left,
            right: right,
            vs: vs,
            grelka: grelka
        };
        var tween = {
            left: mkTween('intro.grelka.left.in', left).to({x: -320}, 2000, Phaser.Easing.Bounce.Out),
            right: mkTween('intro.grelka.right.in', right).to({x: 320}, 2000, Phaser.Easing.Bounce.Out),
            vs: mkTween('intro.grelka.vs', vs).to({alpha: 1}, 3000, Phaser.Easing.Linear.None),
            grelkaLeft: mkTween('intro.grelka.grelka-left.in', grelka.left).to({alpha: 1}, 3000, Phaser.Easing.Linear.None),
            grelkaRight: mkTween('intro.grelka.grelka-right.in', grelka.right).to({alpha: 1}, 3000, Phaser.Easing.Linear.None)
        };
        return startTweenImmediately(tween.left, tween.right)
            .then(startTweenDeferred(tween.vs, tween.grelkaLeft, tween.grelkaRight));
    },
    mkVs: function () {
        return mkSprite(0, 200, res.img.vs, layer.intro, {alpha: 0, scale: {x: 0.3, y: 0.3}});
    },
    scene: function () {
        scene.render();

        intro.img.grelka.vs.destroy();
        intro.img.championship.intro.destroy();
        intro.img.doudaVsEfimovitch.left.destroy();
        intro.img.doudaVsEfimovitch.right.destroy();
        intro.img.doudaVsEfimovitch.vs.destroy();
        intro.img.opytVsMolodost.left.destroy();
        intro.img.opytVsMolodost.right.destroy();
        intro.img.opytVsMolodost.vs.destroy();

        var tween = {
            left: mkTween('intro.grelka.left.out', intro.img.grelka.left).to({x: -1280}, 4000, Phaser.Easing.Exponential.In),
            right: mkTween('intro.grelka.right.out', intro.img.grelka.right).to({x: 1280}, 4000, Phaser.Easing.Exponential.In),
            grelkaLeft: mkTween('intro.grelka.grelka-left.out', intro.img.grelka.grelka.left).to({x: -1280}, 4000, Phaser.Easing.Exponential.In),
            grelkaRight: mkTween('intro.grelka.grelka-right.out', intro.img.grelka.grelka.right).to({x: 1280}, 4000, Phaser.Easing.Exponential.In)
        };

        return startTweenImmediately(tween.left, tween.right, tween.grelkaLeft, tween.grelkaRight);
    },
    destroyIntro: function(){
        intro.img.grelka.left.destroy();
        intro.img.grelka.right.destroy();
        intro.img.grelka.grelka.left.destroy();
        intro.img.grelka.grelka.right.destroy();
    }
};