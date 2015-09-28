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
        var tween = mkTween('intro.championship.in', sprite.scale).to({x: 1, y: 1}, 2500, Phaser.Easing.Elastic.Out);
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
            left: mkTween('intro.doudaVsEfimovitch.left.in', left).to({x: -320}, 1000, Phaser.Easing.Bounce.Out),
            right: mkTween('intro.doudaVsEfimovitch.right.in', right).to({x: 320}, 1000, Phaser.Easing.Bounce.Out),
            vs: mkTween('intro.doudaVsEfimovitch.vs.in', vs).to({alpha: 1}, 1000, Phaser.Easing.Linear.None)
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
            left: mkTween('intro.opytVsMolodost.left.in', left).to({x: -320}, 1000, Phaser.Easing.Bounce.Out),
            right: mkTween('intro.opytVsMolodost.right.in', right).to({x: 320}, 1000, Phaser.Easing.Bounce.Out),
            vs: mkTween('intro.opytVsMolodost.vs.in', vs).to({alpha: 1}, 1000, Phaser.Easing.Linear.None)
        };
        return startTweenImmediately(tween.left, tween.right)
            .then(startTweenDeferred(tween.vs));
    },
    grelka: function () {
        var left = mkSprite(-1280, 0, res.img.intro3.left, layer.intro);
        var right = mkSprite(1280, 0, res.img.intro3.right, layer.intro);
        var grelka = {
            left: mkSprite(0, 0, res.img.intro3Grelka.left, layer.intro, {alpha: 0, scale: {x: 5, y: 5}}),
            right: mkSprite(0, 0, res.img.intro3Grelka.right, layer.intro, {alpha: 0, scale: {x: 5, y: 5}})
        };
        intro.img.grelka = {
            left: left,
            right: right,
            grelka: grelka
        };
        var tween = {
            left: mkTween('intro.grelka.left.in', left).to({x: -320}, 1000, Phaser.Easing.Bounce.Out),
            right: mkTween('intro.grelka.right.in', right).to({x: 320}, 1000, Phaser.Easing.Bounce.Out),
            grelkaLeftScale: mkTween('intro.grelka.grelka-left.scale.in', grelka.left.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Elastic.Out),
            grelkaRightScale: mkTween('intro.grelka.grelka-right.scale.in', grelka.right.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Elastic.Out),
            grelkaLeftAlpha: mkTween('intro.grelka.grelka-left.alpha.in', grelka.left).to({alpha: 1}, 1000, Phaser.Easing.Linear.None),
            grelkaRightAlpha: mkTween('intro.grelka.grelka-right.alpha.in', grelka.right).to({alpha: 1}, 1000, Phaser.Easing.Linear.None)
        };
        return startTweenImmediately(tween.left, tween.right)
            .then(startTweenDeferred(tween.grelkaLeftScale, tween.grelkaRightScale, tween.grelkaLeftAlpha, tween.grelkaRightAlpha));
    },
    mkVs: function () {
        return mkSprite(0, 200, res.img.vs, layer.intro, {alpha: 0, scale: {x: 0.3, y: 0.3}});
    },
    scene: function () {
        scene.render();

        intro.img.championship.intro.destroy();
        intro.img.doudaVsEfimovitch.left.destroy();
        intro.img.doudaVsEfimovitch.right.destroy();
        intro.img.doudaVsEfimovitch.vs.destroy();
        intro.img.opytVsMolodost.left.destroy();
        intro.img.opytVsMolodost.right.destroy();
        intro.img.opytVsMolodost.vs.destroy();

        var tween = {
            left: mkTween('intro.grelka.left.out', intro.img.grelka.left)
                .to({x: -370}, 500, Phaser.Easing.Bounce.Out)
                .to({x: -1280}, 1000, Phaser.Easing.Exponential.Out),
            right: mkTween('intro.grelka.right.out', intro.img.grelka.right)
                .to({x: 370}, 500, Phaser.Easing.Bounce.Out)
                .to({x: 1280}, 1000, Phaser.Easing.Exponential.Out),
            grelkaLeft: mkTween('intro.grelka.grelka-left.out', intro.img.grelka.grelka.left)
                .to({x: -50}, 500, Phaser.Easing.Bounce.Out)
                .to({x: -1280}, 1000, Phaser.Easing.Exponential.Out),
            grelkaRight: mkTween('intro.grelka.grelka-right.out', intro.img.grelka.grelka.right)
                .to({x: 50}, 500, Phaser.Easing.Bounce.Out)
                .to({x: 1280}, 1000, Phaser.Easing.Exponential.Out)
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
