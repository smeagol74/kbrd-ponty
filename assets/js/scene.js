var scene = {
    sprite: {},
    tween: {},
    mkTiledNumbers: function (_layout, alternate) {
        var img = (alternate) ? res.img.numbers7 : res.img.numbers;
        return mkTileSprite(_layout.x, _layout.y, layout.counter.size.w, layout.counter.size.h, img, layer.counters, {
            tilePosition: {
                y: scene.model.counter.tilePosition(0)
            }
        });
    },
    render: function () {
        scene.sprite.bg = mkSprite(0, 0, res.img.scene, layer.scene);
        scene.sprite.counter = {
            left: {
                a: scene.mkTiledNumbers(layout.counter.left.a),
                b: scene.mkTiledNumbers(layout.counter.left.b),
                c: scene.mkTiledNumbers(layout.counter.left.c)
            },
            right: {
                a0: scene.mkTiledNumbers(layout.counter.right.a0, true),
                a: scene.mkTiledNumbers(layout.counter.right.a),
                b: scene.mkTiledNumbers(layout.counter.right.b),
                c: scene.mkTiledNumbers(layout.counter.right.c)
            }
        };
        _.assignValues(scene.sprite.counter.right.a0, {
            y: -1 * app.world.height
        });
        scene.sprite.colon = mkSprite(layout.colon.normal.x, layout.colon.normal.y, res.img.colon, layer.counters, {alpha: 0});
        scene.tween.colon = mkTween('scene.colon', scene.sprite.colon).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        scene.sprite.like = {
            left: mkSprite(layout.like.left.hidden.x, layout.like.left.hidden.y, res.img.like, layer.like, layout.like.left.hidden),
            right: mkSprite(layout.like.right.hidden.x, layout.like.right.hidden.y, res.img.like, layer.like, layout.like.right.hidden)
        };

        scene.isRendered = true;
    },
    isRendered: false,
    model: {
        counter: {
            left: 0,
            right: 0,
            auto: {
                left: 0,
                right: 0,
                time: 0,
                isActive: false
            },
            tilePosition: function (value) {
                return layout.counter.size.h * (11 + value);
            },
            digits: function(value) {
                var result = {
                    a0: 0,
                    a: 0,
                    b: 0,
                    c: 0
                };
                var digits = [];
                while (value > 0) {
                    digits.push(value % 10);
                    value = Math.floor(value / 10);
                }
                if (digits.length > 0) {
                    result.c = digits[0];
                }
                if (digits.length > 1) {
                    result.b = digits[1];
                }
                if (digits.length > 2) {
                    result.a = digits[2];
                }
                if (digits.length > 3) {
                    result.a0 = digits[3];
                }
                return result;
            },
            turns: function(value) {
                return {
                    a0: Math.floor(value / 1000),
                    a: Math.floor(value / 100),
                    b: Math.floor(value / 10),
                    c: value
                };
            }
        },
        like: {
            left: 0,
            right: 0
        }
    },
    execRendered: function (func) {
        return function () {
            if (scene.isRendered) {
                return func();
            } else {
                console.warn('Scene is not rendered yet, so just ignoring this request.');
                return false;
            }
        }
    },
    counter: {
        /**
         * Установить значения счётчиков в `left`:`right` за время `time`
         * @param {number} left значение левого счётчика
         * @param {number} right значение правого счётчика
         * @param {number} time полное время в миллисекундах на установку значений
         */
        set: function (left, right, time) {

            function mkChain(animations, count, digit, time, sprite){
                if (count != 0) {
                    var duration = time / Math.abs(count);
                    var res = _(_.range(0, Math.abs(count))).map(function(){
                        if (count > 0) {
                            return scene.animate.incCounter(sprite, duration);
                        } else {
                            return scene.animate.decCounter(sprite, duration);
                        }
                    });
                    res.push(function(){
                        var res = new $.Deferred();
                        sprite.tilePosition.y = scene.model.counter.tilePosition(digit);
                        res.resolve();
                        return res.promise();
                    });
                    animations.push(chainDeferred.apply(this, res));
                }
            }

            return scene.execRendered(function () {
                console.group('scene.counter.set', left, ':', right, 'in', time, 'ms');
                var turns = {
                    left: scene.model.counter.turns(left - scene.model.counter.left),
                    right: scene.model.counter.turns(right - scene.model.counter.right)
                };
                var digits = {
                    left: scene.model.counter.digits(left),
                    right: scene.model.counter.digits(right)
                };
                scene.model.counter.left = left;
                scene.model.counter.right = right;
                var animations = [];
                mkChain(animations, turns.left.a, digits.left.a, time, scene.sprite.counter.left.a);
                mkChain(animations, turns.left.b, digits.left.b, time, scene.sprite.counter.left.b);
                mkChain(animations, turns.left.c, digits.left.c, time, scene.sprite.counter.left.c);
                mkChain(animations, turns.right.a0, digits.right.a0, time, scene.sprite.counter.right.a0);
                mkChain(animations, turns.right.a, digits.right.a, time, scene.sprite.counter.right.a);
                mkChain(animations, turns.right.b, digits.right.b, time, scene.sprite.counter.right.b);
                mkChain(animations, turns.right.c, digits.right.c, time, scene.sprite.counter.right.c);
                if (animations.length > 0) {
                    chainImmediately(joinDeferred.apply(this, animations), function(){
                        console.groupEnd();
                    })
                } else {
                    console.groupEnd();
                }
                return true;
            });
        },
        /**
         * Включает автоматическое изменение счётчиков с заданными скоростями для левого и правого счётчиков соответственно.
         * Скорость задаётся в количестве переключений в заданное время `time`
         * @param left скорость изменения левого счётчика за время `time`
         * @param right скорость изменения правого счётчика за время `time`
         * @param time масштаб времени в миллисекундах для скорости изменения счётчиков
         */
        auto: function (left, right, time) {
            return scene.execRendered(function () {
                console.group('scene.counter.auto', left, ':', right, 'per', time, 'ms');
                var model = scene.model.counter;
                model.auto.left = left;
                model.auto.right = right;
                model.auto.time = time;
                if (!model.auto.isActive) {
                    console.log('todo');
                }
                console.groupEnd();
                return true;
            });
        },
        /**
         * Запускает процедуру выигрыша правого участника со скоростью `speed` за время `time`
         * @param speed скорость изменения правого счётчика за время `time`
         * @param time масштаб времени в миллисекундах для скорости изменения счётчиков
         */
        win: function (speed, time) {
            return scene.execRendered(function () {
                console.group('scene.counter.win', speed, 'per', time, 'ms');
                console.log('todo');
                console.groupEnd();
                return true;
            });
        }
    },
    like: {
        set: function (left, right, time) {
            return scene.execRendered(function () {
                console.group('scene.like.set', left, right, 'in', time, 'ms');
                scene.animate.showLike(5, scene.sprite.like.left, layout.like.left)();
                console.groupEnd();
                return true;
            });
        }
    },
    finishHim: function () {
        return scene.execRendered(function () {
            console.group('scene.finishHim');
            console.log('todo');
            console.groupEnd();
            return true;
        });
    },
    animate: {
        dropFourthRightCounter: function () {
            var tween = {
                dropCounter: mkTween('scene.fourthRightCounter.dropCounter', scene.sprite.counter.right.a0)
                    .to({y: layout.counter.right.a0.y}, 2000, Phaser.Easing.Bounce.Out),
                breakColon: mkTween('scene.fourthRightCounter.breakColon', scene.sprite.colon)
                    .to(layout.colon.broken, 1700, Phaser.Easing.Elastic.Out)
            };
            scene.tween.fourthRightCounter = tween;
            return joinDeferred(
                startTweenDeferred(tween.dropCounter),
                chainDeferred(delay(300), startTweenDeferred(tween.breakColon))
            );
        },
        incCounter: function (sprite, duration) {
            return function () {
                var tween = mkTween('scene.incCounter', sprite.tilePosition)
                    .to({y: sprite.tilePosition.y + layout.counter.size.h}, duration, Phaser.Easing.Sinusoidal.InOut);
                //playSoundImmediately(snd.tickUp);
                return startTweenImmediately(tween);
            };
        },
        decCounter: function (sprite, duration) {
            return function () {
                var tween = mkTween('scene.decCounter', sprite.tilePosition)
                    .to({y: sprite.tilePosition.y - layout.counter.size.h}, duration, Phaser.Easing.Sinusoidal.InOut);
                //playSoundImmediately(snd.tickDown);
                return startTweenImmediately(tween);
            };
        },
        showLike: function(value, sprite, _layout){
            var duration = 1500;
            return function () {
                sprite.alpha = 0.5;
                var tween = {
                    move: mkTween('scene.showLike.move', sprite)
                        .to(_layout.visible.position, duration, Phaser.Easing.Sinusoidal.Out),
                    show: mkTween('scene.showLike.show', sprite)
                        .to({alpha: _layout.visible.alpha}, duration, Phaser.Easing.Linear.None),
                    scale: mkTween('scene.showLike.scale', sprite.scale)
                        .to(_layout.visible.scale, duration, Phaser.Easing.Elastic.Out)
                };
                playSoundImmediately(snd.like);
                return startTweenImmediately(tween.move, tween.show, tween.scale);
            }
        }
    }
};