const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;

var blueeyes;
var BlueEyes;
var fruit;
var fruit_options;
var rope;
var ground;
var bubble;
var rope2;
var con;
var con2;
var button;
var button2
var background;
var higherground;
var canH;
var canW;
var bubble;
var bubble_img;
var bg_img;
//var balloon;
var food;
function preload()
{
  
  BlueEyes = loadImage("Blue eyes.png")
  fruit = loadImage("fruit.webp")
  bubble_img = loadImage("bubble.jpg")
 // balloon = loadImage("balloon.png")
  bg_img = loadImage("background.png")
}
function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  
   var fruit_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(290,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.3;
  
 // blueeyes sprite
 // blink.frameDelay = 20;
 // eat.frameDelay = 20;
  blueeyes = createSprite(270,100,100,100);
  blueeyes.addImage(BlueEyes);
  blueeyes.scale = 0.5;
  higherground =new Ground(300,170,100,10);

  /*bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');*/

  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);

  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);

 // button2.Clicked(drop);
  
 // button2.mousePress(drop);
  
  //button2.mouseClick(drop);

  //button2.mouseClicked(drop);

  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  if(collide(fruit,blueeyes,80)==true)
  {
   remove_rope();
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    //bunny.change('eating');

    //bunny.changeAnimation('eating');

    //bunny.changeAnimation();

    //bunny.Animation('eating');
  }
  
  if(collide(fruit,bubble,40) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
    }

  drawSprites();

}

/*function drop()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}*/

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}