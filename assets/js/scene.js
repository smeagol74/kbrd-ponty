var scene = {
    mkTiledNumbers: function (_layout) {
        return mkTileSprite(_layout.x, _layout.y, _layout.w, _layout.h, res.img.numbers, layer.counters, {tilePosition: {y: _layout.h * 11}});
    },
    render: function () {
        var bg = mkSprite(0, 0, res.img.scene, layer.scene);
        var counter = {
            left: {
                a: scene.mkTiledNumbers(layout.counter.left.a),
                b: scene.mkTiledNumbers(layout.counter.left.b),
                c: scene.mkTiledNumbers(layout.counter.left.c)
            },
            right: {
                a0: scene.mkTiledNumbers(layout.counter.right.a0),
                a: scene.mkTiledNumbers(layout.counter.right.a),
                b: scene.mkTiledNumbers(layout.counter.right.b),
                c: scene.mkTiledNumbers(layout.counter.right.c)
            }
        };

        var colon = mkSprite(layout.colon.normal.x, layout.colon.normal.y, res.img.colon, layer.counters, {alpha: 0});
        var tween = mkTween('colon', colon).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        _.assignValues(colon, layout.colon.broken);
        counter.right.a0.loadTexture(res.img.numbers7);
        counter.right.a0.tilePosition.y = layout.counter.right.a0.h * 11 - layout.counter.right.a0.h * 3;
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
                console.log('todo');
                console.groupEnd();
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
                console.group('scene.like.set', speed, 'per', time, 'ms');
                console.log('todo');
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
    }
};