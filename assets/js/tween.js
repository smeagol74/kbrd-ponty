function promise(tween) {
    var deferred = $.Deferred();
    tween.onComplete.add(function(){
        console.log(tween.name + ' complete');
        deferred.resolve();
    });
    return deferred.promise();
}

function start() {
    var args = Array.prototype.slice.call(arguments);
    console.log(_(args).map(function(tween){ return tween.name;}).join(', ') + ' start');
    return function(){
        var res;
        if (args.length == 1) {
            res = promise(args[0]);
        } else {
            res = $.when.apply(null, _(args).map(promise));
        }
        _(args).each(function(tween){
            console.log(tween.name + ' started');
            tween.start();
        });
        return res;
    };
}