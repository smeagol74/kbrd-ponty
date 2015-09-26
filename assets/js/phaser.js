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
    _.extend(group.position, {x: app.world.centerX, y: app.world.centerY});
    _.extend(group, props);
    return group;
}

/**
 * Создаёт слой для разделения объектов по слоям
 * @param {object} props
 * @returns {Phaser.Group}
 */
function mkLayer(props) {
    return mkGroup(app.world, null, props);
}

function mkSprite(x, y, image, layer, props) {
    var sprite = app.add.sprite(x, y, image, null, layer);
    sprite.anchor.setTo(0.5, 0.5);
    _.extend(sprite, props);
    return sprite;
}

function mkTileSprite(x, y, w, h, image, layer, props) {
    var sprite = app.add.tileSprite(x, y, w, h, image, null, layer);
    _.extend(sprite, props);
    return sprite;
}

function mkTween(name, target) {
    var tween = app.add.tween(target);
    tween.name = name;
    return tween;
}