export function physicsPlatformer(mainSprite, keyboard, controls = ['ArrowLeft', 'ArrowRight', 'ArrowUp'], sideForce = 20, jumpForce = 40) {

    if (keyboard.isKeyDown(controls[0])) { // If moving left
        mainSprite.width = -Math.abs(mainSprite.width); // Mirror it
        mainSprite.behaviors.Physics.applyForce(-sideForce, 0);
    }
    if (keyboard.isKeyDown(controls[1])) { // If moving right
        mainSprite.width = Math.abs(mainSprite.width); // Unmirror it
        mainSprite.behaviors.Physics.applyForce(sideForce, 0);
    }
    if (keyboard.isKeyDown(controls[2])) {
        mainSprite.behaviors.Physics.applyForce(0, -jumpForce);
    }
}

export function isTouching(obj1, obj2) {
    let nObj1Contacts = obj1.behaviors.Physics.getContactCount();
    let nObj2Contacts = obj2.behaviors.Physics.getContactCount();
    for(let i = 0; i < nObj1Contacts; i++) {
        for(let j = 0; j < nObj2Contacts; j++) {
            if (Math.abs(obj2.behaviors.Physics.getContact(j)[0] - obj1.behaviors.Physics.getContact(i)[0]) <= 1 && // If the objects both have contact points
                Math.abs(obj2.behaviors.Physics.getContact(j)[1] - obj1.behaviors.Physics.getContact(i)[1]) <= 1) { // that are within one pixel of each other
                    return true;
                }
        }
    }
    return false;
}