video="";
status="";
objects = [];
var synth = window.speechSynthesis

function preload()
{
    video = createCapture(VIDEO);
    video.hide();

}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    
}

function start()
{
    document.getElementById("status").innerHTML = object_name + "found";
    document.getElementById("object_name").value;
}

function draw()
{ 
    image(video, 0, 0, 480, 380);

    if(status !="")
    {

        for(i=0; i < objects.length; i++)
        {
            document.getElementById("found_or_not").innerHTML = " " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    if(objects.label == object_name)
    {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("found_or_not").innerHTML = "Object Mentioned Found";
    }
    {
        document.getElementById("found_or_not").innerHTML = "Object Mentioned Not Found";
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function SpeechSynthesisUtterance() 
{
    utterThis = object_name;
    speak();
}