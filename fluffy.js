status = "";
objects = [];

function preload(){
    img = loadImage("IMG_0414.jpg");
}

function setup(){
    canvas = createCanvas(700, 600);
    canvas.position(600, 300);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded(){
    console.log("cocossd is intialized");
    status = true;
    objectDetector.detect(img, gotResults);
}

function draw(){
    image(img, 0, 0, 700, 600);

    if(status =! ""){
        for(i=0;i<objects.length;i++){
            console.log("YEAH");
            stroke("red");
            fill("coral");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            fill("black");
            stroke("black");
            textSize(20);
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label +"  "+ percent+"%", objects[i].x + 18, objects[i].y + 18);
            document.getElementById("status").innerHTML = "Status: Objects detected";
            document.getElementById("objects").innerHTML = objects.length+" object/s detected";
        }
    }
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}