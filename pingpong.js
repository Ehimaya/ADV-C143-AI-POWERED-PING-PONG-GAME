rightWristX = "";
rightWristY = "";
scoreRightWrist = 0;

game_status = "";

function preload() {
	ball_touch = loadSound("ball_touch_paddel.wav");
	missed_ball = loadSound("missed.wav");
}

function setup() {
	canvas = createCanvas(400,400);
	canvas.parent('canvas');

	video = createCapture(VIDEO);
	video.size(400,400);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('Model Loaded!');
  }

function gotPoses(results) {
	if(results.length > 0) {
		rightWristX = results[0].pose.rightWrist.x;
	    rightWristY = results[0].pose.rightWrist.y;
	    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
        
		scoreRightWrist =  results[0].pose.keypoints[10].score;
		console.log("scoreRightWrist = " + scoreRightWrist);
	
	}
}


function draw(){
	if(game_status == "start") // inside the if condition check if the game_status is equal to the value "start".
	{
	  background(0); 
	  image(video, 0, 0, 400, 400);
	
	  fill("black");
	  stroke("black");
	  rect(680,0,20,700);
	
	  fill("black");
	  stroke("black");
	  rect(0,0,20,700);
	
	  if(scoreRightWrist > 0.2)
	  {
		fill("red");
		stroke("red");
		circle(rightWristX, rightWristY, 30);
	  }
	}
}
