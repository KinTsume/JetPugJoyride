
//---------------Game main functions-------------------------
let gameDiv = document.getElementById("game");
let loop;

let start = () => {
    loop = setInterval(() => {
        gameLoop();
    }, 10);

    console.log("Startado");
}

let gameLoop = () => {
    movePlayer();
    
    gravity();
}

let verifyCollision = (obj1, obj2) => {

    let centerPos1 = getCenterPos(obj1);

    let centerPos2 = getCenterPos(obj2);

    let distanceVector = [Math.abs(centerPos1[0] - centerPos2[0]), Math.abs(centerPos1[1] - centerPos2[1])];

    let limitVector = [(size1[0] + size2[0]) / 2, (size1[1] + size2[1]) / 2];

    if(distanceVector[0] < limitVector[0] && distanceVector[1] < limitVector[1]){
        return true;
    }

    return false;

}

let applyGravity = true;
let gravity = () => {
    if(applyGravity){
        player.velocity[1] += .01;
    }
    
}

//IMPORTANT: The object top and left css property must be defined relative to the limiter or it won't work
let checkLimit = (limiter, object) => {
    let pos1 = getCenterPos(object);
    console.log("Pos: "+pos1[0]+" || "+pos1[1]);
    
    let limiterSize = [
        parseInt(getComputedStyle(limiter).width),
        parseInt(getComputedStyle(limiter).height)
    ];

    let objectSize = [
        parseInt(getComputedStyle(object).width),
        parseInt(getComputedStyle(object).height)
    ];

    let collisionInfo = [0, 0];

    if((pos1[0] - objectSize[0] / 2) < 0){
        return "left";
    }

    if((pos1[0] + objectSize[0] / 2) > limiterSize[0]){
        return "right";
    }

    if((pos1[1] - objectSize[1] / 2) < 0){
        return "top";
    }

    if((pos1[1] + objectSize[1] / 2) > limiterSize[1]){
        return "bottom";
    }

    return false;

}

let checkLimitProj = (limiter, objPos, objectSize) => {

    let pos1 = objPos;
    
    let limiterSize = [
        parseInt(getComputedStyle(limiter).width),
        parseInt(getComputedStyle(limiter).height)
    ];

    if((pos1[0] - objectSize[0] / 2) < 0){
        return "left";
    }

    if((pos1[0] + objectSize[0] / 2) > limiterSize[0]){
        return "right";
    }

    if((pos1[1] - objectSize[1] / 2) < 0){
        return "top";
    }

    if((pos1[1] + objectSize[1] / 2) > limiterSize[1]){
        return "bottom";
    }

    return false;

}

let getCenterPos = (element) => {
    let size = [
        parseInt(getComputedStyle(element).width),
        parseInt(getComputedStyle(element).height)
    ];

    let position = [
        parseInt(getComputedStyle(element).left),
        parseInt(getComputedStyle(element).top)
    ];

    let centerPos = [
        position[0] + size[0] / 2,
        position[1] + size[1] / 2
    ];

    return centerPos;
}

//------------Player functions---------------

let player = {
    reference: document.getElementById("player"),
    position: [0, 500],
    velocity: [0, 0],
    HSpeed: 10,
    VAccel: .1
};


let movePlayer = () => {
    position = player.position;
    velocity = player.velocity;

    position[1] += velocity[1];

    //---------This section is used to calculate the collision before the player is moved------------
    //Just to prevent the player from bouncing on the edge
    let size = [
        parseInt(getComputedStyle(player.reference).width),
        parseInt(getComputedStyle(player.reference).height)
    ];

    let centerPos = [
        position[0] + size[0] / 2,
        position[1] + size[1] / 2
    ];

    let collision = checkLimitProj(gameDiv, centerPos, size);
    //------------------------------------------------------------------------------------------------

    
    switch(collision){

        case "left":
            position[0] = 0;
            player.reference.style.left = position[0] + "px";
            break;
        
        case "right":
            position[0] = 600 - size[0];
            player.reference.style.left = position[0] + "px";
            break;
        
        case "top":
            position[1] = 0;
            player.reference.style.top = position[1] + "px";
            player.velocity[1] = 0;
            break;

        case "bottom":
            position[1] = 600 - size[1];
            player.reference.style.top = position[1] + "px";
            player.velocity[1] = 0;
            break;

        default:            
            break;
    }

    player.reference.style.left = position[0] + "px";
    player.reference.style.top = position[1] + "px";
}

let controls = (e) => {

    switch(e.code){
        case "KeyW":
            player.velocity[1] -= player.VAccel;
            break;

        case "KeyA":
            player.position[0] -= player.HSpeed;
            break;

        case "KeyD":
            player.position[0] += player.HSpeed;
            break;

        default:
            break;

            
    }
}

//----------Initiation------------------

window.addEventListener("keydown", controls);

document.getElementById("game-start").addEventListener("click", start);