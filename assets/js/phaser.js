/**
 * Вспомогательные функции для работы с объектами Phaser
 */

/**
 * Создаёт группу объектов
 * @param {Phaser.Group} parent родительская группа
 * @param {string=} name название группы
 * @param {object} props дополнительные свойства
 * @returns {Phaser.Group}
 */
function mkGroup(parent, name, props) {
    var group = app.add.group(parent, name);
    _.assignValues(group.position, {x: app.world.centerX, y: app.world.centerY});
    _.assignValues(group, props);
    return group;
}

/**
 * Создаёт слой для разделения объектов по слоям
 * @param {string} name
 * @param {object} props
 * @returns {Phaser.Group}
 */
function mkLayer(name, props) {
    return mkGroup(app.world, name, props);
}

function mkSprite(x, y, image, layer, props, frame) {
    if (!_.isObject(props)) {
        frame = props;
        props = null;
    }
    var sprite = app.add.sprite(x, y, image, frame, layer);
    sprite.anchor.setTo(0.5, 0.5);
    _.assignValues(sprite, props);
    return sprite;
}

function mkTileSprite(x, y, w, h, image, layer, props) {
    var sprite = app.add.tileSprite(x, y, w, h, image, null, layer);
    sprite.anchor.setTo(0.5, 0.5);
    _.assignValues(sprite, props);
    return sprite;
}

function mkTween(name, target) {
    var tween = app.add.tween(target);
    tween.name = name;
    return tween;
}

function mkGraphics(x, y, layer) {
    var sprite = app.add.graphics(x, y, layer);
    return sprite;
}

function mkText(x, y, txt, layer, style) {
    var text = app.add.text(x, y, txt, style, layer);
    text.anchor.setTo(0.5, 0.5);
    return text;
}