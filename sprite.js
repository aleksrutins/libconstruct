export function isOutsideLayout(sprite) {
    return (sprite.x < 0 || sprite.y < 0 || sprite.x > sprite.layout.width || sprite.y > sprite.layout.height);
}
export function destroyAll(...sprites) {
    return Promise.allSettled(sprites.map(sprite => sprite.destroy()));
}
export function* respawnAll(layer, respawnPoint, ...sprites) {
    for (let sprite of sprites) {
        yield sprite.createInstance(layer, ...Object.values(respawnPoint), false);
    }
}