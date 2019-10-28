
let video;
let features;
let knn;
let labelP;
let ready = false;
let x;
let y;

var label = new Array(10);
var index = new Array(10);
var person = new Array(10);
var bImage;
var predict;
var on = false;
var res="";
var numOfLabels = new Array(10);
var l = 0;
var knnText;
var strings=[];
function preload(){
  knnText = loadStrings('assets/knn1.txt')
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  video = createCapture(VIDEO).hide();
  video.size(640, 480);
  features = ml5.featureExtractor('MobileNet', modelReady);
  knn = ml5.KNNClassifier();
bImage = loadImage('assets/button1.png');




  predict = new Button("predict",642,2,240,120,32,bImage);
  for (let i = 0; i< label.length;i++ ){
    person[i] = new Button("class"+i,1+(i*120),482,120,30,20,bImage);
    label[i]="object"+i;
    index[i] = 0;
    numOfLabels[i]= 0;
  }
}

function modelReady(){console.log("model ready!!!")}

function draw(){
background(40,20)

image(video,0,0);
person[0].Draw();person[1].Draw();
person[2].Draw();person[3].Draw();person[4].Draw();
noFill();stroke(125);
for(let i = 0; i< 5; i++){
  rect(0+(i*120),512,120,50);
  rect(0+(i*120),562,120,50);
}
fill(17,179,16);noStroke();textSize(18)
for(let i = 0; i< 5; i++){text("Samp:  "+index[i],55+(i*120),540)}


if(on == true){
  const logit =features.infer(video);
  knn.classify(logit,getResults);
   text(res,720,300);

   for(let i=0; i< 4;i++){
     text(nfc(numOfLabels[i],2),50+(i*120),600);
   }
}
fill(22,100,180);
textSize(16);textAlign(LEFT)
for(let i=0;i< knnText.length;i++){
  text(knnText[i],650,20+(i*30))
}
}


function getResults(error,data){
res = data.label;
 l = Object.keys(data.confidences).length ;

for(let i= 0; i< l ;i++){
numOfLabels[i] = data.confidences[i];
}
}

function mousePressed(){
  on = true;
  const logit =features.infer(video);
//  console.log(logit.dataSync())
if(person[0].MouseIsOver()){knn.addExample(logit,label[0]);index[0]++;}
if(person[1].MouseIsOver()){knn.addExample(logit,label[1]);index[1]++;}
if(person[2].MouseIsOver()){knn.addExample(logit,label[2]);index[2]++;}
if(person[3].MouseIsOver()){knn.addExample(logit,label[3]);index[3]++;}
if(predict.MouseIsOver()){knn.classify(logit,getResults)}
}
