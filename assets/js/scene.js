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
        scene.sprite.avatar = {
            left0: mkSprite(0, 0, res.img.avatar.left0, layer.scene),
            left1: mkSprite(0, 0, res.img.avatar.left1, layer.scene, {alpha: 0}),
            right0: mkSprite(0, 0, res.img.avatar.right0, layer.scene)
        };
        scene.sprite.placeholder = mkSprite(0, 0, res.img.placeholder, layer.scene);
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
        scene.tween.colon = mkTween('scene.colon', scene.sprite.colon).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 10000, true);

        scene.sprite.like = {
            left: mkSprite(layout.like.left.hidden.x, layout.like.left.hidden.y, res.img.like.left, layer.like, layout.like.left.hidden),
            right: mkSprite(layout.like.right.hidden.x, layout.like.right.hidden.y, res.img.like, layer.like, layout.like.right.hidden),
            text: {
                left: mkText(layout.like.left.text.x, layout.like.left.text.y, '', layer.like, layout.like.left.text.style),
                right: mkText(layout.like.right.text.x, layout.like.right.text.y, '', layer.like, layout.like.right.text.style)
            }
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
                isActive: false,
                promise: $.when()
            },
            tilePosition: function (value) {
                return layout.counter.size.h * (11 + value);
            },
            digits: function (value) {
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
            turns: function (valueFrom, valueTo) {
                var s = (valueTo - valueFrom < 0) ? -1 : 1;
                var res = {
                    a0: 0,
                    a: 0,
                    b: 0,
                    c: 0
                };

                function switchDigit(val) {
                    if (s > 0) {
                        return val % 10 == 0;
                    } else {
                        return val % 10 == 9;
                    }
                }

                while (valueFrom != valueTo) {
                    var d0 = scene.model.counter.digits(valueFrom);
                    valueFrom += s;
                    var d = scene.model.counter.digits(valueFrom);
                    res.c += s;
                    if (d.c != d0.c && switchDigit(d.c)) {
                        res.b += s;
                        if (d.b != d0.b && switchDigit(d.b)) {
                            res.a += s;
                            if (d.a != d0.a && switchDigit(d.a)) {
                                res.a0 += s;
                            }
                        }
                    }
                }
                return res;
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

            return scene.execRendered(function () {
                console.group('scene.counter.set', left, ':', right, 'in', time, 'ms');
                scene.model.counter.auto.isActive = false;

                var chain = [];
                if (right < 1000 || scene.model.counter.right >= 1000) {
                    chain.push(joinDeferred(
                        scene.animate.updateCounters(scene.sprite.counter.left, scene.model.counter.left, left, time),
                        scene.animate.updateCounters(scene.sprite.counter.right, scene.model.counter.right, right, time)
                    ));
                    var sounds = [];
                    if (left > scene.model.counter.left || right > scene.model.counter.right) {
                        sounds.push(snd.tickUp);
                    }
                    if (left < scene.model.counter.left || right < scene.model.counter.right) {
                        sounds.push(snd.tickDown);
                    }
                    if (sounds.length > 0) {
                        chain.push(joinDeferred.apply(this, _(sounds).map(function (sound) {
                            return playSoundDeferred(sound);
                        })));
                    }
                } else {
                    var time0 = time / (right - scene.model.counter.right) * (999 - scene.model.counter.right);
                    chain.push(joinDeferred(
                        scene.animate.updateCounters(scene.sprite.counter.left, scene.model.counter.left, left, time0),
                        scene.animate.updateCounters(scene.sprite.counter.right, scene.model.counter.right, 999, time0)
                    ));
                    var sounds = [];
                    if (left > scene.model.counter.left) {
                        sounds.push(snd.tickUp);
                    }
                    if (left < scene.model.counter.left) {
                        sounds.push(snd.tickDown);
                    }
                    if (sounds.length > 0) {
                        chain.push(joinDeferred.apply(this, _(sounds).map(function (sound) {
                            return playSoundDeferred(sound);
                        })));
                    }
                    if (right = 7777) {
                        time0 = time / (right - scene.model.counter.right) * (7600 - 999);
                        chain.push(joinDeferred(
                            scene.animate.dropFourthRightCounter(),
                            scene.animate.updateCounters(scene.sprite.counter.right, 999, 7600, time0)
                        ));
                        chain.push(function () {
                            var def = new $.Deferred();
                            scene.sprite.counter.right.a.loadTexture(res.img.numbers7);
                            def.resolve();
                            return def.promise();
                        });
                        time0 = time / (right - scene.model.counter.right) * (7760 - 7600);
                        chain.push(scene.animate.updateCounters(scene.sprite.counter.right, 7600, 7760, time0));
                        chain.push(function () {
                            var def = new $.Deferred();
                            scene.sprite.counter.right.b.loadTexture(res.img.numbers7);
                            def.resolve();
                            return def.promise();
                        });
                        time0 = time / (right - scene.model.counter.right) * (7776 - 7760);
                        chain.push(scene.animate.updateCounters(scene.sprite.counter.right, 7760, 7776, time0));
                        chain.push(function () {
                            var def = new $.Deferred();
                            scene.sprite.counter.right.c.loadTexture(res.img.numbers7);
                            def.resolve();
                            return def.promise();
                        });
                        time0 = time / (right - scene.model.counter.right) * (7777 - 7776);
                        chain.push(scene.animate.updateCounters(scene.sprite.counter.right, 7776, 7777, time0));
                        chain.push(scene.animate.win(scene.sprite.counter.right));
                    } else {
                        time0 = time / (right - scene.model.counter.right) * (right - 999);
                        chain.push(joinDeferred(
                            scene.animate.dropFourthRightCounter(),
                            scene.animate.updateCounters(scene.sprite.counter.right, 999, right, time0)
                        ));
                        var sounds = [];
                        if (right > scene.model.counter.right) {
                            sounds.push(snd.tickUp);
                        }
                        if (right < scene.model.counter.right) {
                            sounds.push(snd.tickDown);
                        }
                        if (sounds.length > 0) {
                            chain.push(joinDeferred.apply(this, _(sounds).map(function (sound) {
                                return playSoundDeferred(sound);
                            })));
                        }
                    }
                }
                chain.push(function () {
                    console.groupEnd();
                });
                if (scene.model.counter.left != left) {
                    scene.animate.tickLeftAvatar();
                }
                if (scene.model.counter.right != right) {
                    scene.animate.tickRightAvatar();
                }
                chainImmediately.apply(this, chain);
                scene.model.counter.left = left;
                scene.model.counter.right = right;
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
        startAuto: function (left, right, time) {
            var model = scene.model.counter;
            return scene.execRendered(function () {
                console.log('scene.counter.startAuto', left, ':', right, 'per', time, 'ms');
                model.auto.left = left;
                model.auto.right = right;
                model.auto.time = time;
                model.auto.isActive = true;
                model.auto.promise.then(scene.animate.startAuto());
                return true;
            });
        },
        updateAuto: function(left, right, time) {
            var model = scene.model.counter;
            return scene.execRendered(function () {
                console.log('scene.counter.updateAuto', left, ':', right, 'per', time, 'ms');
                model.auto.left = left;
                model.auto.right = right;
                model.auto.time = time;
                return true;
            });
        },
        /**
         * Запускает процедуру выигрыша правого участника со скоростью `speed` за время `time`
         * @param speed скорость изменения правого счётчика за время `time`
         * @param time масштаб времени в миллисекундах для скорости изменения счётчиков
         */
        win: function (speed, time) {
            var model = scene.model.counter;
            return scene.execRendered(function () {
                console.group('scene.counter.win', speed, 'per', time, 'ms');
                model.auto.isActive = false;
                model.auto.promise.then(chainDeferred(
                    scene.animate.win(scene.sprite.counter.right),
                    function () {
                        console.groupEnd();
                        return $.when();
                    }
                ));
                return true;
            });
        }
    },
    like: {
        set: function (left, right, time) {
            return scene.execRendered(function () {
                console.group('scene.like.set', left, ':', right, 'in', time, 'ms');
                if (left > 0)
                    scene.sprite.like.text.left.setText(left);
                if (right > 0)
                    scene.sprite.like.text.right.setText(right);
                return true;
            });
        },
        showLeft: function(value, time){
            return scene.execRendered(function () {
                console.group('scene.like.showLeft');
                chainImmediately(
                    scene.animate.showLike(value, time, scene.sprite.like.left, layout.like.left, scene.sprite.like.text.left),
                    function () {
                        console.groupEnd();
                        return $.when();
                    }
                );
                return true;
            });
        },
        showRight: function(value){
            return scene.execRendered(function () {
                console.group('scene.like.showRight');
                chainImmediately(
                    scene.animate.showLike(value, scene.sprite.like.right, layout.like.right, scene.sprite.like.text.right),
                    function () {
                        console.groupEnd();
                        return $.when();
                    }
                );
                return true;
            });
        }
    },
    finishHim: function () {
        return scene.execRendered(function () {
            console.group('scene.finishHim');
            chainImmediately(
                scene.animate.finishHim(),
                function () {
                    console.groupEnd();
                    return $.when();
                }
            );
            return true;
        });
    },
    changeLeftAvatar: function(){
        return scene.execRendered(function () {
            console.group('scene.changeLeftAvatar');
            chainImmediately(
                scene.animate.changeLeftAvatar(),
                function () {
                    console.groupEnd();
                    return $.when();
                }
            );
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
                chainDeferred(startTweenDeferred(tween.dropCounter)),
                chainDeferred(delay(300), startTweenDeferred(tween.breakColon)),
                chainDeferred(delay(300), playSoundDeferred(snd.punch))
            );
        },
        updateCounters: function (sprite, valueFrom, valueTo, duration) {

            function mkChain(animations, count, sprite) {
                if (count != 0) {
                    animations.push(scene.animate.updateCounter(sprite, count, duration));
                }
            }

            var turns = scene.model.counter.turns(valueFrom, valueTo);
            var digits = scene.model.counter.digits(valueTo);

            var animations = [];
            if (sprite.a0) {
                mkChain(animations, turns.a0, sprite.a0);
            }
            mkChain(animations, turns.a, sprite.a);
            mkChain(animations, turns.b, sprite.b);
            mkChain(animations, turns.c, sprite.c);

            return chainDeferred(joinDeferred.apply(this, animations), function () {
                var res = new $.Deferred();
                if (sprite.a0) {
                    sprite.a0.tilePosition.y = scene.model.counter.tilePosition(digits.a0);
                }
                sprite.a.tilePosition.y = scene.model.counter.tilePosition(digits.a);
                sprite.b.tilePosition.y = scene.model.counter.tilePosition(digits.b);
                sprite.c.tilePosition.y = scene.model.counter.tilePosition(digits.c);
                res.resolve();
                return res.promise();
            });
        },
        updateCounter: function (sprite, delta, duration) {
            return function () {
                var tween = mkTween('scene.updateCounter', sprite.tilePosition)
                    .to({y: sprite.tilePosition.y + delta * layout.counter.size.h}, duration, Phaser.Easing.Linear.None);
                return startTweenImmediately(tween);
            };
        },
        incCounter: function (sprite, duration) {
            return function () {
                var tween = mkTween('scene.incCounter', sprite.tilePosition)
                    .to({y: sprite.tilePosition.y + layout.counter.size.h}, duration, Phaser.Easing.Sinusoidal.InOut);
                playSoundImmediately(snd.tickUp);
                return startTweenImmediately(tween);
            };
        },
        decCounter: function (sprite, duration) {
            return function () {
                var tween = mkTween('scene.decCounter', sprite.tilePosition)
                    .to({y: sprite.tilePosition.y - layout.counter.size.h}, duration, Phaser.Easing.Sinusoidal.InOut);
                playSoundImmediately(snd.tickDown);
                return startTweenImmediately(tween);
            };
        },
        showLike: function (value, time, sprite, _layout, text) {

            function setText(v) {
                return function(){
                    text.setText(v);
                    return $.when();
                }
            }

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
                var chain = [startTweenDeferred(tween.move, tween.show, tween.scale)];
                var val = 0;
                while(val < value) {
                    val += Math.ceil(Math.random() * (value - val) / 10);
                    if (val > value)
                        val = value;
                    chain.push(delay(100));
                    chain.push(setText(val));
                }
                return chainImmediately.apply(this, chain);
            }
        },
        win: function (sprite) {
            return function () {
                var tween = [];
                if (sprite.a0) {
                    tween.push(mkTween('scene.animate.win.a0', sprite.a0).to({alpha: 0.4}, 1000, Phaser.Easing.Linear.None, false, 0, 10000, true));
                }
                tween.push(mkTween('scene.animate.win.a', sprite.a).to({alpha: 0.4}, 1000, Phaser.Easing.Linear.None, false, 0, 10000, true));
                tween.push(mkTween('scene.animate.win.b', sprite.b).to({alpha: 0.4}, 1000, Phaser.Easing.Linear.None, false, 0, 10000, true));
                tween.push(mkTween('scene.animate.win.c', sprite.c).to({alpha: 0.4}, 1000, Phaser.Easing.Linear.None, false, 0, 10000, true));
                //tween.push(mkTween('scene.animate.win.avatar', scene.sprite.avatar.right0).to({alpha: 0.4}, 1000, Phaser.Easing.Linear.None, false, 0, 10000, true));
                tween.push(mkTween('scene.animate.win.avatar.scale', scene.sprite.avatar.right0.scale).to({x: 1.05, y: 1.05}, 1000, Phaser.Easing.Linear.None, false, 0, 10000, true));
                playSoundImmediately(snd.win);
                return startTweenImmediately.apply(this, tween);
            }
        },
        finishHim: function () {

            function mkShade() {
                var res = mkGraphics(0, 0, layer.fireworks);
                res.beginFill(0x000000, 0.5);
                res.drawRect(-app.world.centerX, -app.world.centerY, app.world.width, app.world.height);
                res.endFill();
                res.alpha = 0;
                return res;
            }

            return function () {
                var sprite = {
                    shade: mkShade(),
                    text: mkSprite(0, 0, res.img.finishHim, layer.fireworks, {alpha: 0})
                };
                var tween = {
                    shade: mkTween('scene.animate.finishHim.shade', sprite.shade)
                        .to({alpha: 1}, 2000, Phaser.Easing.Linear.None, false, 0, 0, true),
                    text: mkTween('scene.animate.finishHim.text', sprite.text)
                        .to({alpha: 1}, 2000, Phaser.Easing.Linear.None, false, 0, 0, true)
                };
                playSoundImmediately(snd.finishHim);
                return chainImmediately(startTweenDeferred(tween.shade, tween.text), function () {
                    sprite.shade.destroy();
                    sprite.text.destroy();
                    return $.when();
                });
            }
        },
        startAuto: function () {
            var model = scene.model.counter;
            if (model.auto.isActive) {
                var prev = {
                    left: model.left,
                    right: model.right
                };
                model.left += model.auto.left;
                model.right += model.auto.right;
                return joinImmediately(
                    scene.animate.updateCounters(scene.sprite.counter.left, prev.left, model.left, model.auto.time),
                    scene.animate.updateCounters(scene.sprite.counter.right, prev.right, model.right, model.auto.time),
                    function(){
                        //if (model.auto.left > 0 || model.auto.right > 0) {
                        //    playSoundImmediately(snd.tickUp);
                        //}
                        //if (model.auto.left < 0 || model.auto.right < 0) {
                        //    playSoundImmediately(snd.tickDown);
                        //}
                        playSoundImmediately(snd.hitmarker);
                        return $.when();
                    }
                ).then(scene.animate.startAuto);
            } else {
                return $.when();
            }
        },
        changeLeftAvatar: function(){
            var sprite = {
                alert: mkSprite(0, 0, res.img.avatar.leftAlert, layer.fireworks, {alpha: 0})
            };
            var tween = {
                showAlert: mkTween('scene.animation.changeLeftAvatar.showAlert', sprite.alert)
                    .to({alpha: 1}, 1000, Phaser.Easing.Linear.None),
                hideOld: mkTween('scene.animation.changeLeftAvatar.hideOld', scene.sprite.avatar.left0)
                    .to({alpha: 0}, 1000, Phaser.Easing.Linear.None),
                showNew: mkTween('scene.animation.changeLeftAvatar.showNew', scene.sprite.avatar.left1)
                    .to({alpha: 1}, 1000, Phaser.Easing.Linear.None),
                hideAlert: mkTween('scene.animation.changeLeftAvatar.hideAlert', sprite.alert)
                    .to({alpha: 0}, 1000, Phaser.Easing.Linear.None)
            };
            return chainDeferred(
                startTweenDeferred(tween.showAlert),
                startTweenDeferred(tween.hideOld, tween.showNew),
                delay(1000),
                startTweenDeferred(tween.hideAlert)
            );
        },
        tickLeftAvatar: function(){
            var sprite = (scene.sprite.avatar.left0.alpha > 0)?scene.sprite.avatar.left0:scene.sprite.avatar.left1;
            var tween = mkTween('scene.animation.tickLeftAvatar', sprite.scale)
                .to({x: 1.05, y: 1.05}, 500, Phaser.Easing.Linear.None)
                .to({x: 1, y: 1}, 500, Phaser.Easing.Bounce.Out);
            startTweenImmediately(tween);
        },
        tickRightAvatar: function(){
            var tween = mkTween('scene.animation.tickRightAvatar', scene.sprite.avatar.right0.scale)
                .to({x: 1.05, y: 1.05}, 500, Phaser.Easing.Linear.None)
                .to({x: 1, y: 1}, 500, Phaser.Easing.Bounce.Out);
            startTweenImmediately(tween);
        }
    }
};