var layout = {
    intro: {
        grelka: {
            x: 0,
            y: 0
        },
        vs: {
            x: 0,
            y: 0
        }
    },
    colon: {
        x: 0,
        y: -38
    },
    counter: {
        left: {
            a: {
                x: -470,
                y: -136,
                w: 120,
                h: 200
            },
            b: {
                x: -350,
                y: -136,
                w: 120,
                h: 200
            },
            c: {
                x: -230,
                y: -136,
                w: 120,
                h: 200
            }
        },
        right: {
            a: {
                x: 110,
                y: -136,
                w: 120,
                h: 200
            },
            b: {
                x: 230,
                y: -136,
                w: 120,
                h: 200
            },
            c: {
                x: 350,
                y: -136,
                w: 120,
                h: 200
            }
        }
    },
    init: function(x, y){
        function apply(src, tgt) {
            _(src).each(function(val, key){
                switch(key) {
                    case 'x':
                        tgt.x = src.x + x;
                        break;
                    case 'y':
                        tgt.y = src.y + y;
                        break;
                    default:
                        if (_.isObject(val)) {
                            apply(val, tgt[key]);
                        }
                }
            });
        }
        apply(_layout, layout, x, y);
    }
};

var _layout = JSON.parse(JSON.stringify(layout));
