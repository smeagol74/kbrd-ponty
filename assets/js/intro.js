var intro = {
    intro: function () {
        var cx = app.world.centerX;
        var cy = app.world.centerY;
        var intro0 = app.add.sprite(cx, cy, res.img.intro0, null, layer.intro);
        intro0.anchor.setTo(0.5, 0.5);
        intro0.scale.x = 0;
        intro0.scale.y = 0;

        var finalCombat = app.add.sprite(cx, cy, res.img.finalCombat, null, layer.intro);
        finalCombat.anchor.setTo(0.5, 0.5);
        finalCombat.alpha = 0;

        var intro1 = {
            left: app.add.sprite(cx - 1280, cy, res.img.intro1.left, null, layer.intro),
            right: app.add.sprite(cx + 1280, cy, res.img.intro1.right, null, layer.intro)
        };
        intro1.left.anchor.setTo(0.5, 0.5);
        intro1.right.anchor.setTo(0.5, 0.5);

        var intro2 = {
            left: app.add.sprite(cx - 1280, cy, res.img.intro2.left, null, layer.intro),
            right: app.add.sprite(cx + 1280, cy, res.img.intro2.right, null, layer.intro)
        };
        intro2.left.anchor.setTo(0.5, 0.5);
        intro2.right.anchor.setTo(0.5, 0.5);

        var intro3 = {
            left: app.add.sprite(cx - 1280, cy, res.img.intro3.left, null, layer.intro),
            right: app.add.sprite(cx + 1280, cy, res.img.intro3.right, null, layer.intro),
            grelka: {
                left: app.add.sprite(cx, cy, res.img.intro3Grelka.left, null, layer.intro),
                right: app.add.sprite(cx, cy, res.img.intro3Grelka.right, null, layer.intro)
            }
        };
        intro3.left.anchor.setTo(0.5, 0.5);
        intro3.right.anchor.setTo(0.5, 0.5);
        intro3.grelka.left.anchor.setTo(0.5, 0.5);
        intro3.grelka.right.anchor.setTo(0.5, 0.5);
        intro3.grelka.left.alpha = 0;
        intro3.grelka.right.alpha = 0;

        var vs = app.add.sprite(cx, cy + 200, res.img.vs, null, layer.intro);
        vs.anchor.setTo(0.5, 0.5);
        vs.z = 999;
        vs.alpha = 0;
        vs.scale.x = 0.3;
        vs.scale.y = 0.3;

        var tween = app.add.tween(intro0.scale).to({x: 1, y: 1}, 5000, Phaser.Easing.Elastic.Out);
        var tween0 = app.add.tween(finalCombat).to({alpha: 1}, 2000, Phaser.Easing.Linear.None);
        var tween1_1 = app.add.tween(intro1.left).to({x: cx - 320}, 2000, Phaser.Easing.Bounce.Out);
        var tween1_2 = app.add.tween(intro1.right).to({x: cx + 320}, 2000, Phaser.Easing.Bounce.Out);
        var tween1_3 = app.add.tween(vs).to({alpha: 1}, 3000, Phaser.Easing.Linear.None);
        var tween2_1 = app.add.tween(intro2.left).to({x: cx - 320}, 2000, Phaser.Easing.Bounce.Out);
        var tween2_2 = app.add.tween(intro2.right).to({x: cx + 320}, 2000, Phaser.Easing.Bounce.Out);
        var tween2_3 = app.add.tween(vs).to({alpha: 1}, 3000, Phaser.Easing.Linear.None);
        var tween3_1 = app.add.tween(intro3.left).to({x: cx - 320}, 2000, Phaser.Easing.Bounce.Out);
        var tween3_2 = app.add.tween(intro3.right).to({x: cx + 320}, 2000, Phaser.Easing.Bounce.Out);
        var tween3_3 = app.add.tween(vs).to({alpha: 1}, 3000, Phaser.Easing.Linear.None);
        var tween3_4 = app.add.tween(intro3.grelka.left).to({alpha: 1}, 3000, Phaser.Easing.Linear.None);
        var tween3_5 = app.add.tween(intro3.grelka.right).to({alpha: 1}, 3000, Phaser.Easing.Linear.None);
        var tween4_1 = app.add.tween(intro3.left).to({x: cx - 1280}, 2000, Phaser.Easing.Bounce.Out);
        var tween4_2 = app.add.tween(intro3.right).to({x: cx + 1280}, 2000, Phaser.Easing.Bounce.Out);
        var tween4_3 = app.add.tween(intro3.grelka.left).to({x: cx - 1280}, 2000, Phaser.Easing.Bounce.Out);
        var tween4_4 = app.add.tween(intro3.grelka.right).to({x: cx + 1280}, 2000, Phaser.Easing.Bounce.Out);

        tween.name = 'tween';
        tween0.name = 'tween0';
        tween1_1.name = 'tween1_1';
        tween1_2.name = 'tween1_2';
        tween1_3.name = 'tween1_3';
        tween2_1.name = 'tween2_1';
        tween2_2.name = 'tween2_2';
        tween2_3.name = 'tween2_3';

        start(tween)()
            .then(start(tween0))
            .then(function(){
                vs.alpha = 0;
                var res = $.when(promise(tween1_1), promise(tween1_2));
                tween1_1.start();
                tween1_2.start();
                return res;
            })
            .then(function () {
                vs.alpha = 0;
                return start(tween1_3)();
            })
            .then(function(){
                vs.alpha = 0;
                var res = $.when(promise(tween2_1), promise(tween2_2));
                tween2_1.start();
                tween2_2.start();
                return res;
            })
            .then(function () {
                vs.alpha = 0;
                return start(tween2_3)();
            })
            .then(function(){
                vs.alpha = 0;
                var res = $.when(promise(tween3_1), promise(tween3_2));
                tween3_1.start();
                tween3_2.start();
                return res;
            })
            .then(function () {
                vs.alpha = 0;
                var res = $.when(promise(tween3_3), promise(tween3_4), promise(tween3_5));
                tween3_3.start();
                tween3_4.start();
                tween3_5.start();
                return res;
            })
            .then(function(){
                vs.alpha = 0;
                var res = $.when(promise(tween4_1), promise(tween4_2), promise(tween4_3), promise(tween4_4));
                tween4_1.start();
                tween4_2.start();
                tween4_3.start();
                tween4_4.start();
                return res;
            })
            .then(function () {
                console.log('Done');
            });
    },
    scene: function () {
        function mkTiledNumbers(_layout) {
            var result = app.add.tileSprite(_layout.x, _layout.y, _layout.w, _layout.h, res.img.numbers);
            result.tilePosition.y = _layout.h * 11;
            return result;
        }

        counter = {
            left: {
                a: mkTiledNumbers(layout.counter.left.a),
                b: mkTiledNumbers(layout.counter.left.b),
                c: mkTiledNumbers(layout.counter.left.c)
            },
            right: {
                a: mkTiledNumbers(layout.counter.right.a),
                b: mkTiledNumbers(layout.counter.right.b),
                c: mkTiledNumbers(layout.counter.right.c)
            }
        };

        img.colon = app.add.sprite(layout.colon.x, layout.colon.y, res.img.colon);
        img.colon.anchor.setTo(0.5, 0.5);
        img.colon.alpha = 0;

        tween.colon = app.add.tween(img.colon);
        tween.colon.to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    }
};