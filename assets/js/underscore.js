_.assignValues = function(destination, source){
    _(source).each(function(value, key){
        if (destination[key] == undefined) {
            destination[key] = value;
        } else {
            if (_.isObject(value) && _.isObject(destination[key])) {
                _.assignValues(destination[key], value);
            } else if (!_.isObject(value) && !_.isObject(destination[key])) {
                destination[key] = value
            } else {
                // Just ignore
            }
        }
    });
};