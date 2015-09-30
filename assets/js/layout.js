/**
 * Расположение и размеры параметризованных объектов
 */
var layout = {
    colon: {
        normal: {
            x: 0,
            y: 0
        },
        broken: {
            x: 60,
            y: 195,
            angle: 60
        }
    },
    counter: {
        size: {
            w: 150,
            h: 300
        },
        left: {
            a: {
                x: -540,
                y: 134
            },
            b: {
                x: -375,
                y: 134
            },
            c: {
                x: -210,
                y: 134
            }
        },
        right: {
            a0: {
                x: 45,
                y: 134
            },
            a: {
                x: 210,
                y: 134
            },
            b: {
                x: 375,
                y: 134
            },
            c: {
                x: 540,
                y: 134
            }
        }
    },
    like: {
        left: {
            hidden: {
                x: 0,
                y: 0,
                alpha: 0,
                scale: {
                    x: 5,
                    y: 5
                }
            },
            visible: {
                position: {
                    x: 0,
                    y: 0
                },
                alpha: 1,
                scale: {
                    x: 1,
                    y: 1
                }
            },
            text: {
                x: -125,
                y: -214,
                style: {
                    font: "bold 60px Arial",
                    fill: "#ffffff",
                    align: "center"
                }
            }
        },
        right: {
            hidden: {
                x: 75,
                y: -285,
                alpha: 0,
                scale: {
                    x: 5,
                    y: 5
                }
            },
            visible: {
                position: {
                    x: 75,
                    y: -285
                },
                alpha: 1,
                scale: {
                    x: 1,
                    y: 1
                }
            },
            text: {
                x: 75,
                y: -258,
                style: {
                    font: "40px Arial",
                    fill: "#ffffff",
                    align: "center"
                }
            }
        }
    },
    avatar: {
        left: {
            x: -86,
            y: -25
        },
        right: {
            x: 86,
            y: -25
        }
    }
};