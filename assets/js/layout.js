/**
 * Расположение и размеры параметризованных объектов
 */
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
        normal: {
            x: 0,
            y: 50
        },
        broken: {
            x: -50,
            y: 130,
            angle: -15
        }
    },
    counter: {
        size: {
            w: 120,
            h: 200
        },
        left: {
            a: {
                x: -380,
                y: 50
            },
            b: {
                x: -260,
                y: 50
            },
            c: {
                x: -140,
                y: 50
            }
        },
        right: {
            a0: {
                x: 20,
                y: 50
            },
            a: {
                x: 140,
                y: 50
            },
            b: {
                x: 260,
                y: 50
            },
            c: {
                x: 380,
                y: 50
            }
        }
    },
    like: {
        left: {
            hidden: {
                x: -75,
                y: 285,
                alpha: 0,
                scale: {
                    x: 5,
                    y: 5
                }
            },
            visible: {
                position: {
                    x: -75,
                    y: 285
                },
                alpha: 1,
                scale: {
                    x: 1,
                    y: 1
                }
            }
        },
        right: {
            hidden: {
                x: 75,
                y: 285,
                alpha: 0,
                scale: {
                    x: 5,
                    y: 5
                }
            },
            visible: {
                position: {
                    x: 75,
                    y: 285
                },
                alpha: 1,
                scale: {
                    x: 1,
                    y: 1
                }
            }
        }
    }
};