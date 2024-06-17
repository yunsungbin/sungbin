var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World  = Matter.World;

//엔진 선언
const engine  = Engine.create();

//렌더 선언
const render = Render.create({
    engine,
    element : document.body,
    options : {
        wireframes : false,
        background : '#fef3c7', //#F7F4C8
        width : 620,
        height : 850,
    },
});

const world = engine.world;

const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic : true,
    // 고정시켜주는 옵션
    render : {fillStyle: '#ca8a04'} //#E6B143
});

const rightWall = Bodies.rectangle(310, 820, 620, 60, {
    isStatic : true,
    // 고정시켜주는 옵션
    render : {fillStyle: '#ca8a04'} //#E6B143
});

const ground = Bodies.rectangle(605, 395, 30, 790, {
    isStatic : true,
    // 고정시켜주는 옵션
    render : {fillStyle: '#ca8a04'} //#E6B143
});

const topLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic : true,
    // 고정시켜주는 옵션
    render : {fillStyle: '#ca8a04'} //#E6B143
});

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(engine);