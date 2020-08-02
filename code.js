var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","599a2323-6879-4092-bb8c-162dfeb94b6a","b0883e50-fbda-412d-99db-b4ffa33bf981","c3cc5c2d-9def-4912-80cb-349dc47c616a","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","f7ff9547-c440-44a8-aa42-6b35d0dc5e26"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey_for","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":10,"version":"sOmu8APjSYlywqOTxhoM1pcZNLn8sGgF","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":2456},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"599a2323-6879-4092-bb8c-162dfeb94b6a":{"name":"monkey_back","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":12,"version":"RUeFpqlfMDXV9KsZUAliRXiMJVyLdmgb","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":2456},"rootRelativePath":"assets/599a2323-6879-4092-bb8c-162dfeb94b6a.png"},"b0883e50-fbda-412d-99db-b4ffa33bf981":{"name":"monkey_for_stop","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":1,"looping":true,"frameDelay":12,"version":"IgxM.krAf0GfnJV7kyE.R.luu.wTVIUY","loadedFromSource":true,"saved":true,"sourceSize":{"x":560,"y":614},"rootRelativePath":"assets/b0883e50-fbda-412d-99db-b4ffa33bf981.png"},"c3cc5c2d-9def-4912-80cb-349dc47c616a":{"name":"monkey_back_stop","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":1,"looping":true,"frameDelay":12,"version":"kOdaEPvsQR89o0_1lUR611f9jzJXcwL5","loadedFromSource":true,"saved":true,"sourceSize":{"x":560,"y":614},"rootRelativePath":"assets/c3cc5c2d-9def-4912-80cb-349dc47c616a.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"6sYqdR_6aZ4jMtqRrAkpvOGQUtNJXjJi","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":null,"frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":12,"version":"jzPGxVpw6u01aSvJmtCZnawSe5dotC.X","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/33841f90-7a53-4346-b956-e51d1961959b.png"},"f7ff9547-c440-44a8-aa42-6b35d0dc5e26":{"name":"pic","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"oytHOAJYVHTK5fz7FsYkWSAHv0OAqw.n","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/f7ff9547-c440-44a8-aa42-6b35d0dc5e26.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var monkey = createSprite(50,300);
var ground = createSprite(200,350,400,10);
monkey.setAnimation("monkey_for_stop");
var direction = 0;
var R = 0;
var L = 1;
var gameState = 1;
var PLAY = 1;
var END = 2;
var size = 0.1;
monkey.scale = 0.1;
var back = createSprite(200,200,400,400);
back.setAnimation("pic");
back.scale = 4;
var back2 = createSprite(600,200,400,400);
back2.setAnimation("pic");
back2.scale = 4;
monkey.depth = 100;

var bananaGroup = createGroup();
var obstacleGroup = createGroup();
var count = 0;

//function setup() {
//  
//}

function draw() {
  background("white");
  monkey.collide(ground);
  
  if(gameState == PLAY){
  createFood();
  bananaGroup.setVelocityXEach(-5);
  
  monkey.scale = size;
  
  createObstacles();
  obstacleGroup.setVelocityXEach(-7.5);
  
  back.velocityX = -2.5;
  back2.velocityX = -2.5;
  if(back.x <= -200){
    back.x = 600;
  }
  if(back2.x <= -200){
    back2.x = 600;
  }
  
  if(keyDown("w")){
    monkey.velocityY = -10;
  }
  count = count + 0.1;
  monkey.velocityY = monkey.velocityY + 0.25;
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    count = count + 5;
    size = size + 0.005;
  }
  
  if (size > 0.15){
    size = 0.15;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    size = size - 0.01;
    obstacleGroup.destroyEach();
  }
  
  if (size < 0.05){
    gameState = END;
  }
  
  if(keyDown("d")){
    direction = R;
    monkey.velocityX = 2.5;
  }
  
  if(keyDown("a")){
    direction = L;
    monkey.velocityX = -2.5;
  }
  
  if(keyDown("s")){
    monkey.velocityX = 0;
  }
  }
  
  if(gameState == END){
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  
  //  |                                   |
  // \ / This should happen all the time \ /
  //  -                                   -
  if(direction == R && monkey.velocityX != 0){
    monkey.setAnimation("monkey_for");
  }
  
  if(direction == L && monkey.velocityX != 0){
    monkey.setAnimation("monkey_back");
  }
  
  if(direction == R && monkey.velocityX == 0){
    monkey.setAnimation("monkey_for_stop");
  }
  
  if(direction == L && monkey.velocityX == 0){
    monkey.setAnimation("monkey_back_stop");
  }
  text("Score:" + " " + Math.round(count), 175, 100);
  
  
  drawSprites();
}

function createFood(){
  if(World.frameCount % 90 == 0 || World.frameCount == 1){
    var banana = createSprite(450,225);
    banana.setAnimation("Banana");
    banana.scale = 0.05;
    bananaGroup.add(banana);
    banana.lifetime = 125;
  }
}

function createObstacles(){
  if(World.frameCount % 300 == 0 || World.frameCount == 1){
    var obstacle = createSprite(450,320);
    obstacle.setAnimation("Stone");
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 125;
  }
}


  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
