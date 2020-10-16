var dog, happyDog;
var database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;


function preload(){

dog = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);

  var object=createSprite()

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
  
  dog=createSprite(250,250);
  dog.addImage(dog);

  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);

  drawSprites();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :"+ lastFed +" AM",350,30);
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
