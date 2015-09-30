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
        var left = mkSprite(-1280, 0, res.img.intro1, layer.intro, 0);
        var right = mkSprite(1280, 0, res.img.intro1, layer.intro, 1);
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
        var left = mkSprite(-1280, 0, res.img.intro2, layer.intro, 0);
        var right = mkSprite(1280, 0, res.img.intro2, layer.intro, 1);
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
        var left = mkSprite(-1280, 0, res.img.intro3.bg, layer.intro, 0);
        var right = mkSprite(1280, 0, res.img.intro3.bg, layer.intro, 1);
        var fireball = mkSprite(0, 0, res.img.intro3.fireball, layer.intro, {alpha: 0});
        var grelka = {
            left: mkSprite(0, 0, res.img.intro3.grelka.left, layer.intro, {alpha: 0}),
            right: mkSprite(0, 0, res.img.intro3.grelka.right, layer.intro, {alpha: 0}),
            whole: mkSprite(0, 0, res.img.intro3.grelka.whole, layer.intro, {alpha: 0, scale: {x: 5, y: 5}})
        };
        intro.img.grelka = {
            left: left,
            right: right,
            grelka: grelka,
            fireball: fireball
        };
        var tween = {
            left: mkTween('intro.grelka.left.in', left).to({x: -320}, 1000, Phaser.Easing.Bounce.Out),
            right: mkTween('intro.grelka.right.in', right).to({x: 320}, 1000, Phaser.Easing.Bounce.Out),
            fireball: mkTween('intro.grelka.fireball.in', fireball).to({alpha: 1}, 1000, Phaser.Easing.Linear.None),
            grelkaScale: mkTween('intro.grelka.grelka.scale.in', grelka.whole.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Elastic.Out),
            grelkaAlpha: mkTween('intro.grelka.grelka.alpha.in', grelka.whole).to({alpha: 1}, 1000, Phaser.Easing.Linear.None)
        };
        return startTweenImmediately(tween.left, tween.right)
            .then(startTweenDeferred(tween.fireball, tween.grelkaScale, tween.grelkaAlpha));
    },
    mkVs: function () {
        return mkSprite(0, 0, res.img.vs, layer.intro, {alpha: 0});
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
        intro.img.grelka.grelka.whole.destroy();

        var tweenSwitch = {
           left: mkTween('intro.grelka.grelka-left.show', intro.img.grelka.grelka.left)
               .to({alpha: 1}, 10, Phaser.Easing.Linear.None),
           right: mkTween('intro.grelka.grelka-right.show', intro.img.grelka.grelka.right)
               .to({alpha: 1}, 10, Phaser.Easing.Linear.None),
           whole: mkTween('intro.grelka.grelka-whole.show', intro.img.grelka.grelka.whole)
               .to({alpha: 0}, 10, Phaser.Easing.Linear.None)
        };

        var tween = {
            left: mkTween('intro.grelka.left.out', intro.img.grelka.left)
                .to({x: -1280}, 500, Phaser.Easing.Exponential.Out, false, 1000),
            right: mkTween('intro.grelka.right.out', intro.img.grelka.right)
                .to({x: 1280}, 500, Phaser.Easing.Exponential.Out, false, 1000),
            fireball: mkTween('intro.grelka.fireball.out', intro.img.grelka.fireball)
                .to({alpha: 0}, 100, Phaser.Easing.Linear.None, false, 1000),
            grelkaLeft: mkTween('intro.grelka.grelka-left.out', intro.img.grelka.grelka.left)
                .to({x: -50}, 1000, Phaser.Easing.Bounce.Out)
                .to({x: -1280}, 500, Phaser.Easing.Exponential.Out),
            grelkaRight: mkTween('intro.grelka.grelka-right.out', intro.img.grelka.grelka.right)
                .to({x: 50}, 1000, Phaser.Easing.Bounce.Out)
                .to({x: 1280}, 500, Phaser.Easing.Exponential.Out)
        };

        return startTweenImmediately(tweenSwitch.left, tweenSwitch.right, tweenSwitch.whole).then(
            startTweenDeferred(tween.left, tween.right, tween.fireball, tween.grelkaLeft, tween.grelkaRight)
        );
    },
    destroyIntro: function(){
        intro.img.grelka.left.destroy();
        intro.img.grelka.right.destroy();
        intro.img.grelka.grelka.left.destroy();
        intro.img.grelka.grelka.right.destroy();
        intro.img.grelka.fireball.destroy();
    }
};
