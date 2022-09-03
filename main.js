song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
RightWristX = 0;
RightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_1 = "";
song_2 = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
  }

function draw(){
    image(video, 0, 0, 600,500);
    fill("#00ff00");
    stroke("#ff0000");

    song_1 = song1.isPlaying();
    console.log(song_1);
    song2.isPlaying();
    console.log(song_2);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        song2.stop();
        if(song_1 == false){
            song1.play();
        }
        else{
            console.log("Song Name: song1");
            document.getElementById("song").innerHTML = "Song Name: song1";
    }
    if(scorerightWrist > 0.2){
      circle(rightWrist_x,rightWrist_y,20);
      song2.stop();
      if(song_2 == false){
          song2.play();
      }
      else{
          console.log("Song Name: song2");
          document.getElementById("song").innerHTML = "Song Name: song2";
      }
  }
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}