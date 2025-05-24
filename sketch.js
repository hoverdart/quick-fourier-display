let time = 0;
let n = 2;
let speedSlider;
let wave=[];

function setup() {
  let cnv = createCanvas(1500, 800);
  cnv.parent("canvas-container");

  const nSlider = document.getElementById("nValue");
  n = parseInt(nSlider.value);
  nSlider.addEventListener("input", () => {
    n = parseInt(nSlider.value);
    console.log("Current n:", n);
  });
  speedSlider = document.getElementById("setSpeed");
}

function draw() {
  background(0);
  translate(400, 400);
  let x=0; 
  let y=0;
  //Current N Displayer
  noStroke();
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text(`N (Number of Circles): ${n}`, -380, -360); 
  for(let numOfCircs = 0; numOfCircs < n; numOfCircs++){
    let prevX = x;
    let prevY = y
    let i=numOfCircs*2+1

    let radius = 150 * (4/(i*PI));  
    x += radius * cos(i*time);
    y += radius * sin(i*time);

    stroke(255);
    strokeWeight(1);
    noFill();
    ellipse(prevX, prevY, radius * 2);

    fill(255-10*numOfCircs);
    line(prevX,prevY,x,y);
    ellipse(x, y, 2);
  }
  //Tracing and Making the Wave Pattern
  line(x,y,500,y)

  stroke(255, 0, 0)
  strokeWeight(5);
  noFill();
  wave.unshift(y);  // Add to front
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    vertex(500 + i, wave[i]);
  }
  endShape();
  if (wave.length > 1000) wave.pop();  // Cap the array length
  if (speedSlider) {
    speed = parseFloat(speedSlider.value);
    time -= speed;
  }
}

