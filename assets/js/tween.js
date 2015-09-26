function startTweenDeferred() {
    var tweens = Array.prototype.slice.call(arguments);

    function promise(tween) {
        var deferred = new $.Deferred();
        tween.onComplete.add(function(){
            console.log('--- completed tween: ' + tween.name);
            deferred.resolve();
        });
        return deferred.promise();
    }

    return function(){
        var res;
        if (tweens.length == 1) {
            res = promise(tweens[0]);
        } else {
            res = $.when.apply(null, _(tweens).map(promise));
        }
        _(tweens).each(function(tween){
            console.log('+++ started tween: ' + tween.name);
            tween.start();
        });
        return res;
    };
}

function startTweenImmediately() {
    return startTweenDeferred.apply(this, arguments)();
}

function delay(time) {
    return function(){
        console.log('+++ started delay ' + time + 'ms');
        var deferred = new $.Deferred();
        setTimeout(function(){
            console.log('--- completed delay ' + time + 'ms');
            deferred.resolve();
        }, time);
        return deferred.promise();
    }
}

function playSoundDeferred() {
    var sounds = Array.prototype.slice.call(arguments);

    function promise(sound) {
        var deferred = new $.Deferred();
        sound.onStop.add(function(){
            console.log('--- completed sound: ' + sound.name);
            deferred.resolve();
        });
        return deferred.promise();
    }

    return function(){
        var res;
        if (sounds.length == 1) {
            res = promise(sounds[0]);
        } else {
            res = $.when.apply(null, _(sounds).map(promise));
        }
        _(sounds).each(function(sound){
            console.log('+++ started sound: ' + sound.name);
            sound.play();
        });
        return res;
    };
}

function playSoundImmediately() {
    return playSoundDeferred.apply(this, arguments)();
}

function join() {
    return $.when.apply(this, _(arguments).map(function(param){
        if (_.isFunction(param)) {
            return param();
        } else {
            return param;
        }
    }));
}