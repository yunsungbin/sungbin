const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); //2d로 만들겠다는 코드

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;

const background = new Sprite({
    position : {
        x : 0,
        y : 0,
    },
    imageSrc : "/first/img/background.png",
})

const shop = new Sprite({
    position : {
        x : 600,
        y : 128,
    },
    imageSrc : "/first/img/shop.png",
    scale : 2.75,
    framesMax : 6,
})

c.fillRect(0, 0, canvas.width, canvas.height);

const player = new Fighter({
    position : {
        x : 0,
        y : 0,
    },
    velocity : {
        x : 0,
        y : 10,
    },
    offset : {
        x : 0,
        y : 0,
    },
    scale : 2.5,
    offset : {
        x : 215,
        y : 157,
    },
    imageSrc : "/first/img/1p/Idle.png",
    framesMax : 8,
    sprites : {
        idle : {
            imageSrc : "/first/img/1p/Idle.png",
            framesMax : 8,
        },
        run : {
            imageSrc : "/first/img/1p/Run.png",
            framesMax : 8,
        },
        jump : {
            imageSrc : "/first/img/1p/Jump.png",
            framesMax : 2,
        },
        fall : {
            imageSrc : "/first/img/1p/Fall.png",
            framesMax : 2,
        },
        attack1 : {
            imageSrc : "/first/img/1p/Attack1.png",
            framesMax : 6,
        },
        takeHit : {
            imageSrc : "/first/img/1p/Take hit.png",
            framesMax : 4,
        },
        death : {
            imageSrc : "/first/img/1p/Death.png",
            framesMax : 6,
        },
    },
    //어택박스 오프셋 설정
    attackBox : {
        offset : {
            x : 100,
            y : 75,
        },
        width : 160,
        height : 50,
    },
});

const enemy = new Fighter({
    position : {
        x : 400,
        y : 100,
    },
    velocity : {
        x : 0,
        y : 10,
    },
    color : "blue",
    offset : {
        x : -50,
        y : 0,
    },
    imageSrc : "/first/img/2p/Idle.png",
    framesMax : 8,
    scale : 2.5,
    offset : {
        x : 215,
        y : 167,
    },
    sprites : {
        idle : {
            imageSrc : "/first/img/2p/Idle.png",
            framesMax : 4,
        },
        run : {
            imageSrc : "/first/img/2p/Run.png",
            framesMax : 8,
        },
        jump : {
            imageSrc : "/first/img/2p/Jump.png",
            framesMax : 2,
        },
        fall : {
            imageSrc : "/first/img/2p/Fall.png",
            framesMax : 2,
        },
        attack1 : {
            imageSrc : "/first/img/2p/Attack1.png",
            framesMax : 4,
        },
        takeHit : {
            imageSrc : "/first/img/2p/Take hit.png",
            framesMax : 3,
        },
        death : {
            imageSrc : "/first/img/2p/Death.png",
            framesMax : 7,
        },
    },
    attackBox : {
        offset : {
            x : -170,
            y : 75,
        },
        width : 170,
        height : 50,
    },
});

console.log(player);

const keys = {
    a:{
        pressed : false,
    },
    d:{
        pressed : false,
    },
    w:{
        pressed : false,
    },
    ArrowRight:{
        pressed : false,
    },
    ArrowLeft:{
        pressed : false,
    },
    ArrowUp:{
        pressed : false,
    },
}

decreaseTimer();

// player.draw();
// enemy.draw();

// let lastKey;

function animate(){
    window.requestAnimationFrame(animate);

    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    shop.update();
    
    c.fillStyle = 'rgba(255, 255, 255, 0.15)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // if(keys.a.pressed){
    //     player.velocity.x = -1;
    // }
    // else if(keys.d.pressed){
    //     player.velocity.x = +1;
    // }
    //player.image = player.sprites.idle.image;
    
    if(keys.a.pressed && player.lastKey === "a"){
        //player.image = player.sprites.run.image;
        player.velocity.x = -5;
        player.switchSprite('run');
    }
    else if(keys.d.pressed && player.lastKey === "d"){
        //player.image = player.sprites.run.image;
        player.velocity.x = +5;
        player.switchSprite('run');
    }
    else{
        player.switchSprite('idle');
    }

    if(player.velocity.y < 0){
        player.switchSprite('jump');
        // player.image = player.sprites.jump.image;
        // player.framesMax = player.sprites.jump.framesMax;
    }
    else if(player.velocity.y > 0){
        player.switchSprite('fall');
    }

    //enemy.image = enemy.sprites.idle.image;
    if(keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft"){
        enemy.switchSprite('run');
        enemy.velocity.x = -5;
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight"){
        enemy.switchSprite('run');
        enemy.velocity.x = +5;
    }
    else{
        enemy.switchSprite('idle');
    }

    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump');
        // player.image = player.sprites.jump.image;
        // player.framesMax = player.sprites.jump.framesMax;
    }
    else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall');
    }

    if(rectangularColison({rectangle1:player, rectangle2:enemy}) &&
       player.isAttacking && player.framesCurrent === 4)
    {
        console.log("hit");
        player.isAttacking = false;
        enemy.takeHit();
        //enemy.health -= 20;
        //document.querySelector("#enemyHealth").style.width = enemy.health + "%";
        gsap.to("#enemyHealth", {
            width : enemy.health + "%"
        })
    }
    if(rectangularColison({rectangle1:enemy, rectangle2:player}) &&
       enemy.isAttacking && enemy.framesCurrent === 2)
    {
        console.log("hit");
        enemy.isAttacking = false;
        //피격시 함수 실행d
        player.takeHit();
        //player.health -= 10;
        //document.querySelector("#playerHealth").style.width = player.health + "%";
        gsap.to("#playerHealth", {
            width : player.health + "%"
        })
    }

    //공격이 실패했을 때
    if(player.isAttacking && player.framesCurrent === 4){
        player.isAttacking = false;
    }
    if(enemy.isAttacking && enemy.framesCurrent === 2){
        enemy.isAttacking = false;
    }

    if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerID});
    }
}

animate();

window.addEventListener("keydown", (event) => {
    console.log(event.key);

    if(!player.dead){
        switch(event.key){
            case "d":
                keys.d.pressed = true;
                player.lastKey = "d";
                break;
            case "a":
                keys.a.pressed = true;
                player.lastKey = "a";
                break;
            case "w":
                player.velocity.y = -10;
                break;
            case "s":
                player.attack();
                break;
        }
    }
    
    if(!enemy.dead){
        switch(event.key){
            case "ArrowRight":
                keys.ArrowRight.pressed = true;
                enemy.lastKey = "ArrowRight";
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = "ArrowLeft";
                break;
            case "ArrowUp":
                enemy.velocity.y = -10;
                break;
            case "ArrowDown":
                enemy.attack();
                break;
        }
    }
    
})

window.addEventListener("keyup", (event) => {
    console.log(event.key);

    switch(event.key){
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
    }
})